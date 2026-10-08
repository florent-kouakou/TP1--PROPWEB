export const TEMPLATE_BIENVENUE = `
    <div class="welcome-screen">
        <h1>🧠 Quiz à deux</h1>
        <p class="subtitle">Entrez les noms des deux joueurs</p>

        <div class="player-input-group">
            <div class="player-input-box">
                <label for="player1">Joueur 1</label>
                <input type="text" id="player1" placeholder="Nom du joueur 1">
            </div>
            <div class="player-input-box">
                <label for="player2">Joueur 2</label>
                <input type="text" id="player2" placeholder="Nom du joueur 2">
            </div>
        </div>
        <div class="error-msg" id="errorMsg"></div>
        <button class="btn btn-start" id="startBtn">Démarrer</button>
    </div>
`;

export const TEMPLATE_OPTION = (classes, index, lettre, option) => `
    <div class="${classes}" data-index="${index}">
        <span class="letter">${lettre}</span>
        ${option}
    </div>
`;

export const TEMPLATE_BADGE_JOUEUR = (nom, score, estActif) => `
    <div class="player-badge ${estActif ? 'active' : ''}">
        <div class="name">${nom}</div>
        <div class="score">${score}</div>
        <div class="indicator">${estActif ? '💅 À vous !' : ''}</div>
    </div>
`;

export const TEMPLATE_QUIZ = (numero, enonce, htmlOptions, htmlBadges, estRepondu) => `
    <h1>🧠 Quiz</h1>
    <p class="subtitle">Tour par tour</p>

    <div class="players-status">
        ${htmlBadges}
    </div>

    <div class="question-text">( ${numero} ) - ${enonce}</div>

    <div class="options-grid">
        ${htmlOptions}
    </div>

    <div class="nav-buttons">
        <button class="btn btn-next" id="nextBtn" ${estRepondu ? '' : 'disabled'}>Suivant ➡</button>
    </div>
`;

export const TEMPLATE_JOUEUR_RESULTAT = (nom, score, estGagnant, htmlIcones = '') => `
    <div class="result-player ${estGagnant ? 'winner' : ''}">
        <div class="name">${nom}</div>
        <div class="score">${score}</div>
    </div>
`;

export const TEMPLATE_RESULTAT = (htmlJoueurs, messageGagnant ) => `
    <h1>🧠 Quiz</h1>
    <p class="subtitle">Résultat final</p>

    <div class="result-container">
        <div class="result-message">${messageGagnant}</div>
        <div class="result-score">
            ${htmlJoueurs}
        </div>
        <button class="btn btn-restart" id="restartBtn">🔄 Nouvelle partie</button>
    </div>
`;

