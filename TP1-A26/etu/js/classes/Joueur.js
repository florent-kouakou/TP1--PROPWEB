/**
 * Classe Joueur
 * Représente un joueur avec son nom et son score.
 */
export class Joueur {

    #nom;
    #score;

    constructor(nom) {
        this.#nom = nom.trim();
        this.#score = 0;
        this._nom = nom;
    }


    get nom() {
        return this._nom;
    }

    get [#score]() {
        return this[#score];
    }

    ajouterPoint(){
        this.#score++;
    }

    reinitialiser(){
        this.#score = 0;
    }



    /**
     * Compare le score avec un autre joueur.
     * @param {Joueur} autre
     * @returns {number} 1 si supérieur, -1 si inférieur, 0 si égalité
     */
    comparerA(autre) {
        if (this.#score < autre.#score){
            return -1;
        }
        if (this.#score === autre.#score){
            return 0;
        }
        if (this.#score > autre.#score){
            return 1;
        }
    }
}
