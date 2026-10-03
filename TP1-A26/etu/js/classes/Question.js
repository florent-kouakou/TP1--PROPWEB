/**
 * Classe Question
 * Représente une question de quiz avec ses options et la bonne réponse.
 */
export class Question {

    #enonce;
    #options;
    #indexCorrect;

    /**
     * @param {Object} data - Données de la question
     * @param {string} data.question - L'intitulé de la question
     * @param {string[]} data.options - Tableau des 4 propositions
     * @param {number} data.correct - Index de la bonne réponse (0..3)
     */
    constructor({question, options, correct}) {
        if (!question || typeof question !== 'string') {
            throw new Error("La question doit etre valide");
        }
        if (typeof correct !== 'number' || correct < 0) {
            throw new Error("L'index doit etre correct");
        }
        if (options.length < 0 || Array.isArray(options)) {
            throw new Error("Les options doivent marcher un minimum");
        }

        this.#enonce = question;
        this.#options = options;
        this.#indexCorrect = correct;
    }


    get enonce() {
        return this.#enonce;
    }

    get indexCorrect() {
        return this.#indexCorrect;
    }

    get options(){
        let retour = []
        for (let i = 0; i < this.#options.length; i++){
            retour[i] = this.#options;
        }
        return retour;
    }

    estCorrect(index){
        return index === this.#indexCorrect;
    }

    /**
     * Retourne la lettre correspondant à un index (A, B, C, D…).
     * @param {number} index
     * @returns {string}
     */
    lettreA(index) {
        return (String.fromCharCode(index) + 64);
    }
}