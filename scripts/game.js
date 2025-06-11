const items = [
  { name: 'Bouteille plastique', type: 'plastique' },
  { name: 'Canette', type: 'metal' },
  { name: 'Peau de banane', type: 'compost' },
  { name: 'Journal', type: 'papier' },
  { name: 'Pile', type: 'dechetterie' },
  { name: 'Bocal en verre', type: 'verre' }
];
const bins = [
  { type: 'plastique', label: 'Plastique' },
  { type: 'metal', label: 'Métal' },
  { type: 'compost', label: 'Compost' },
  { type: 'papier', label: 'Papier' },
  { type: 'dechetterie', label: 'Déchetterie' },
  { type: 'verre', label: 'Verre' }
];
let gameScore = 0, timeLeft = 60, timer;
const startBtn = document.getElementById('start-game');
const playArea = document.getElementById('play-area');
const scoreArea = document.getElementById('game-score');
const feedback = document.getElementById('game-feedback');
function startGame() {
  gameScore = 0; timeLeft = 60;
  playArea.innerHTML = '';
  scoreArea.innerHTML = '';
  feedback.innerHTML = '';
  playArea.style.display = '';
  scoreArea.style.display = '';
  feedback.className = '';
  // Afficher les bacs
  const binsHTML = `<div class='bins'>${bins.map(b => `<div class='bin' data-type='${b.type}'>${b.label}</div>`).join('')}</div>`;
  // Afficher les déchets à trier
  const itemsHTML = `<div class='items'>${shuffle([...items]).map((it, i) => `<div class='item' draggable='true' data-type='${it.type}' id='item${i}'>${it.name}</div>`).join('')}</div>`;
  playArea.innerHTML = binsHTML + itemsHTML + `<div id='timer'>60s</div>`;
  // Drag & drop
  document.querySelectorAll('.item').forEach(el => {
    el.ondragstart = e => { e.dataTransfer.setData('type', el.dataset.type); el.classList.add('dragging'); };
    el.ondragend = e => { el.classList.remove('dragging'); };
  });
  document.querySelectorAll('.bin').forEach(bin => {
    bin.ondragover = e => { e.preventDefault(); bin.classList.add('dragover'); };
    bin.ondragleave = e => { bin.classList.remove('dragover'); };
    bin.ondrop = e => {
      bin.classList.remove('dragover');
      const type = e.dataTransfer.getData('type');
      const item = document.querySelector(`.item[data-type='${type}']:not(.sorted)`);
      if (!item) return;
      if (bin.dataset.type === type) {
        gameScore++;
        item.classList.add('sorted');
        bin.classList.add('good');
        feedback.textContent = 'Bravo !';
        feedback.className = '';
        setTimeout(() => { bin.classList.remove('good'); feedback.textContent = ''; }, 700);
      } else {
        bin.classList.add('bad');
        feedback.textContent = 'Mauvais bac !';
        feedback.className = 'bad';
        setTimeout(() => { bin.classList.remove('bad'); feedback.textContent = ''; feedback.className = ''; }, 900);
      }
      scoreArea.innerHTML = `Score : ${gameScore} / ${items.length}`;
      if (gameScore === items.length) endGame(true);
    };
  });
  // Timer
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft + 's';
    if (timeLeft <= 0) endGame(false);
  }, 1000);
  scoreArea.innerHTML = `Score : 0 / ${items.length}`;
}
function endGame(win) {
  clearInterval(timer);
  playArea.style.display = 'none';
  scoreArea.innerHTML = `<h3>Score : ${gameScore} / ${items.length}</h3>` +
    `<button class='btn' onclick='location.reload()'>Rejouer</button>`;
  feedback.innerHTML = win ? "🎉 Bravo, tu as tout trié !" : "⏰ Temps écoulé !";
  feedback.className = win ? '' : 'bad';
  saveScore(gameScore);
}
function saveScore(s) {
  let scores = JSON.parse(localStorage.getItem('planetplay-scores') || '[]');
  scores.push({ type: 'game', score: s, date: Date.now() });
  localStorage.setItem('planetplay-scores', JSON.stringify(scores));
}
function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
if (startBtn) startBtn.onclick = startGame; 