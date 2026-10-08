// =============================================================================
// Templates HTML (Constantes)
// =============================================================================

import {
    TEMPLATE_BIENVENUE,
    TEMPLATE_OPTION,
    TEMPLATE_BADGE_JOUEUR,
    TEMPLATE_QUIZ,
    TEMPLATE_JOUEUR_RESULTAT,
    TEMPLATE_RESULTAT
} from "../VuesDynamiques.js";
import {
    handleDemarrer,
    handleChoixDeReponse,
    handleQuestionSuivante,
    handleRecommancer
} from "../evenements.js";

/**
 * Classe VueQuiz
 * Responsable de l'affichage dans le DOM.
 * Ne contient aucune logique de jeu.
 */
export class VueQuiz {
    #conteneur;
    #quiz;
    #nomsJoueurs = ['', ''];

    /**
     * @param {HTMLElement} conteneur - Élément racine qui accueille la vue
     * @param {Quiz} quiz - Le modèle Quiz
     */
    constructor(quiz) {
        this.#conteneur = document.getElementById('app');
        this.#quiz = quiz;
        quiz.surChangement = () => {
            this.affiche()
        };

    }

    // ---------- Getters & Setters ----------
    get nomsJoueurs() {
        return [...this.#nomsJoueurs];
    }

    get quiz() {
        return this.#quiz;
    }

    definirNomsJoueurs(p1, p2) {
        this.#nomsJoueurs = [p1, p2];
    }

    // ---------- Point d'entrée du rendu ----------
    affiche() {
        if (!this.#quiz.estDemarre) {
            this.#afficheBienvenue();
        } else if (this.#quiz.estTermine) {
            this.#afficheResultat();
        } else {
            this.#afficheQuiz();
        }
    }

    // ---------- Écran d'accueil ----------
    #afficheBienvenue() {
        this.#conteneur.innerHTML = TEMPLATE_BIENVENUE;
        document.getElementById('startBtn').addEventListener('click', (ev) => {
            handleDemarrer(ev, this)
        });

        const champJoueur1 = this.#conteneur.querySelector('#player1');
        const champJoueur2 = this.#conteneur.querySelector('#player2');

        if (champJoueur1 && this.#nomsJoueurs[0]) {
            champJoueur1.value = this.#nomsJoueurs[0];
        }
        if (champJoueur2 && this.#nomsJoueurs[1]) {
            champJoueur2.value = this.#nomsJoueurs[1];
        }
    }

    // ---------- Écran de quiz ----------
    #afficheQuiz() {
        const quiz = this.#quiz;
        const q = quiz.questionActuelle;
        const estRepondu = quiz.estRepondu;
        const reponseChoisie = quiz.reponseChoisie;

        // Construction des choix de réponse
        let htmlOptions = '';
        for (let i = 0; i < q.options.length; i++) {
            const option = this.#echapperHtml(q.options[i]);
            const classes = this.#determinerClasseAppropriee(i, q, estRepondu, reponseChoisie);
            htmlOptions += '' + TEMPLATE_OPTION(classes, i, q.lettreA(i), option);
        }

        // Construction des Badges joueurs




        // Construction du Quiz avec htmlOptions et les Badges des joueurs





        document.getElementById('nextBtn').addEventListener('click',
            (ev) => {
                handleQuestionSuivante(ev, quiz)
            }
        );
    }

    // ---------- Écran de résultat ----------
    #afficheResultat() {
        const quiz = this.#quiz;
        const gagnant = quiz.gagnant; // null en cas d'égalité

        const message = gagnant
            ? `🏆 ${this.#echapperHtml(gagnant.nom)} remporte la partie !`
            : `🤝 Match nul !`;

        const htmlJoueurs = quiz.joueurs
            .map((joueur) => TEMPLATE_JOUEUR_RESULTAT(
                this.#echapperHtml(joueur.nom),
                joueur.score,
                joueur === gagnant
            ))
            .join('');

        this.#conteneur.innerHTML = TEMPLATE_RESULTAT(htmlJoueurs, message);

        document.getElementById('restartBtn').addEventListener('click', (ev) => {
            handleRecommancer(ev, quiz);
        });
    }

    // ---------- Utilitaires ----------
    /**
     * Échappe les caractères HTML pour afficher du texte tel quel
     * (ex.: l'option "<template>" ne doit pas être interprétée comme une balise).
     * @param {string} texte
     * @returns {string}
     */
    #echapperHtml(texte) {
        return String(texte)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    /**
     * Détermine les classes CSS d'une option en fonction de l'état de la question.
     */
    #determinerClasseAppropriee(index, question, estRepondu, reponseChoisie) {
        const classes = ['option-btn'];
        let retClasses = "";

        if (!estRepondu) {
            retClasses = classes.join(' '); // pour retirer le tableau
        } else {
            classes.push('disabled');
            if (index === question.indexCorrect) {
                classes.push('correct');
            } else if (index === reponseChoisie) {
                classes.push('incorrect');
            }
            if (index === reponseChoisie) {
                classes.push('selected');
            }
            retClasses = classes.join(' '); // pour retirer le tableau et joindre les classes sélectionnées
        }

        return retClasses;

    }
}
