import {Joueur} from './Joueur.js';


const DIFFERENCE_DE_SCORE_POUR_GAGNER = 2;

/**
 * Classe Quiz
 * Gère la logique du jeu : questions, tours, scores, progression.
 * Ne touche pas au DOM. Notifie via un callback à chaque changement.
 */
export class Quiz {


    // ---------- Champs privés ----------
    #questions;
    #questionsAVenir;
    #joueurs = [];
    #indexJoueurActuel = 0;
    #indexQuestionActuelle;
    #estRepondu = false;
    #reponsesChoisies = [];
    #estDemarre = false;
    #estTermine = false;
    #surChangement;

    /**
     * @param {Question[]} questions - Liste des questions du quiz
     * @param {Function} surChangement - Callback déclenché à chaque mise à jour
     */
    constructor(questions) {
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("Le quiz doit contenir au moins une question.");
        }
        this.#questions = questions;
        this.#questionsAVenir = [...questions]; // une copie des questions nécessaires
        this.#indexQuestionActuelle = this.#trouveNombreAleatoire(0, this.#questionsAVenir.length - 1)();

        this.#reinitialiserReponsesChoisies();
    }

    // ---------- Getters ----------
    get questions() {
        return this.#questions;
    }

    get joueurs() {
        return [...this.#joueurs];
    }

    get joueurActuel() {
        return this.#joueurs[this.#indexJoueurActuel];
    }

    get autreJoueur() {
        return this.#joueurs[1 - this.#indexJoueurActuel];
    }

    get indexJoueurActuel() {
        return this.#indexJoueurActuel;
    }

    get questionActuelle() {
        return this.#questionsAVenir[this.#indexQuestionActuelle];
    }

    get numeroQuestion() {
        return this.#indexQuestionActuelle + 1;
    }

    get totalQuestions() {
        return this.#questions.length;
    }

    get estRepondu() {
        return this.#estRepondu;
    }

    get estDemarre() {
        return this.#estDemarre;
    }

    get estTermine() {
        return this.#estTermine;
    }

    get reponsesChoisies() {
        return [...this.#reponsesChoisies]; // fait une copie des questions
    }

    get reponseChoisie() {
        return this.#reponsesChoisies[this.#indexQuestionActuelle];
    }

    /**
     * Retourne le joueur gagnant, ou null en cas d'égalité.
     * @returns {Joueur|null}
     */
    get gagnant() {
        let retour = null;
        const [p1, p2] = this.#joueurs;
        const cmp = p1.comparerA(p2);
        if (cmp > 0) retour = p1;
        if (cmp < 0) retour = p2;
        return retour;
    }

    set surChangement(surChangement) {
        this.#surChangement = surChangement;
    }

    // ---------- Méthodes publiques ----------
    /**
     * Démarre une nouvelle partie avec deux joueurs.
     */
    demarrer(nomJoueur1, nomJoueur2) {
        this.#joueurs = [new Joueur(nomJoueur1), new Joueur(nomJoueur2)];
        this.#questionsAVenir = [...this.#questions];
        this.#indexJoueurActuel = 0;
        this.#indexQuestionActuelle = this.#trouveNombreAleatoire(0, this.#questionsAVenir.length - 1)();
        this.#estRepondu = false;
        this.#estTermine = false;
        this.#estDemarre = true;
        this.#reinitialiserReponsesChoisies();
        this.#rafraichirAffichage();
    }

    /**
     * Enregistre la réponse du joueur actif pour la question en cours.
     * @param {number} indexSelectionne
     */
    repondre(indexSelectionne) {
        // Ignorer si la partie n'est pas en cours ou si on a déjà répondu
        if (!this.#estDemarre || this.#estTermine || this.#estRepondu) {
            return;
        }
        // Ignorer un index hors limites
        if (!Number.isInteger(indexSelectionne) ||
            indexSelectionne < 0 ||
            indexSelectionne >= this.questionActuelle.options.length) {
            return;
        }

        this.#reponsesChoisies[this.#indexQuestionActuelle] = indexSelectionne;
        this.#estRepondu = true;

        if (this.questionActuelle.estCorrect(indexSelectionne)) {
            this.joueurActuel.ajouterPoint();
        }

        this.#rafraichirAffichage();
    }

    /**
     * Passe à la question suivante et au joueur suivant.
     * Termine le quiz si on était à la dernière question.
     */
    suivant() {
        // On ne peut pas avancer tant que la question n'est pas répondue
        if (!this.#estDemarre || this.#estTermine || !this.#estRepondu) {
            return;
        }

        // La question posée ne revient plus pendant la partie
        this.#questionsAVenir.splice(this.#indexQuestionActuelle, 1);

        const [j1, j2] = this.#joueurs;
        const ecart = Math.abs(j1.score - j2.score);

        if (ecart >= DIFFERENCE_DE_SCORE_POUR_GAGNER || this.#questionsAVenir.length === 0) {
            // Un joueur a pris assez d'avance, ou il ne reste plus de questions
            this.#estTermine = true;
        } else {
            // Joueur suivant + nouvelle question tirée au hasard
            this.#indexJoueurActuel = 1 - this.#indexJoueurActuel;
            this.#indexQuestionActuelle =
                this.#trouveNombreAleatoire(0, this.#questionsAVenir.length - 1)();
            this.#reponsesChoisies[this.#indexQuestionActuelle] = undefined;
            this.#estRepondu = false;
        }

        this.#rafraichirAffichage();
    }

    /**
     * Remet le quiz à zéro (retour à l'écran d'accueil).
     */
    reinitialiser() {
        this.#joueurs = [];
        this.#indexJoueurActuel = 0;
        this.#indexQuestionActuelle = 0;
        this.#estRepondu = false;
        this.#estDemarre = false;
        this.#estTermine = false;
        this.#questionsAVenir = [...this.#questions];
        this.#reinitialiserReponsesChoisies();
        this.#rafraichirAffichage();
    }

    // ---------- Méthodes privées ----------
    #reinitialiserReponsesChoisies() {
        this.#reponsesChoisies = new Array(this.#questions.length).fill(undefined);
    }

    #rafraichirAffichage() {
        if (typeof this.#surChangement === 'function') {
            this.#surChangement(this);
        }
    }

    #trouveNombreAleatoire(bottom, top) {
        return function () {
            return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
        }
    }
}