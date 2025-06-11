const questions = [
  { q: "Quel matériau met le plus de temps à se décomposer ?", a: ["Plastique", "Papier", "Verre", "Bois"], c: 0, exp: "Le plastique peut mettre jusqu'à 1000 ans à se décomposer !" },
  { q: "Quel geste réduit le plus l'empreinte carbone d'un gamer ?", a: ["Éteindre la console", "Recycler les jeux", "Acheter d'occasion", "Utiliser le cloud"], c: 0, exp: "Éteindre complètement ses appareils évite la consommation fantôme." },
  { q: "Combien de litres d'eau pour fabriquer une console ?", a: ["10", "100", "1000", "10 000"], c: 3, exp: "Jusqu'à 10 000 litres d'eau pour une console, d'où l'intérêt de prolonger leur durée de vie !" },
  { q: "Quel déchet va dans la poubelle jaune ?", a: ["Bouteille plastique", "Épluchure", "Pile", "Verre"], c: 0, exp: "La bouteille plastique va dans la poubelle jaune, pas les piles ni le verre !" },
  { q: "Quel animal souffre le plus du plastique en mer ?", a: ["Tortue", "Ours", "Chien", "Abeille"], c: 0, exp: "Les tortues confondent les sacs plastiques avec des méduses." },
  { q: "Quelle énergie est la plus propre ?", a: ["Charbon", "Solaire", "Pétrole", "Gaz"], c: 1, exp: "Le solaire est une énergie renouvelable et propre." },
  { q: "Quel est le bon réflexe pour économiser l'électricité ?", a: ["Laisser en veille", "Éteindre", "Débrancher", "Rien faire"], c: 2, exp: "Débrancher les appareils évite la consommation cachée." },
  { q: "Combien de temps met une canette à se dégrader ?", a: ["2 ans", "10 ans", "100 ans", "200 ans"], c: 2, exp: "Une canette met environ 100 ans à disparaître dans la nature." },
  { q: "Quel jeu vidéo sensibilise à l'écologie ?", a: ["Eco", "FIFA", "GTA", "Mario Kart"], c: 0, exp: "Eco est un jeu de gestion écologique !" },
  { q: "Quel geste simple au quotidien ?", a: ["Trier", "Jeter tout", "Brûler", "Ignorer"], c: 0, exp: "Trier ses déchets est un geste simple et efficace." },
  { q: "Le cloud gaming consomme-t-il plus d'énergie ?", a: ["Oui", "Non"], c: 0, exp: "Le cloud gaming sollicite de nombreux serveurs gourmands en énergie." },
  { q: "Quel badge pour un joueur écolo ?", a: ["Planet Hero", "Noob", "Boss", "Speedrunner"], c: 0, exp: "Le badge Planet Hero récompense les joueurs engagés !" },
  { q: "Quel composant est le plus polluant ?", a: ["Carte mère", "Boîtier", "Ventilateur", "LED"], c: 0, exp: "La carte mère contient de nombreux métaux rares et polluants." },
  { q: "Quel est le bon tri pour une pile ?", a: ["Déchetterie", "Poubelle jaune", "Compost", "Verre"], c: 0, exp: "Les piles doivent être déposées en déchetterie ou en point de collecte." },
  { q: "Quel est le slogan de PlanetPlay ?", a: ["L'écologie a aussi sa place dans la culture jeu vidéo !", "Jouer c'est polluer", "Game Over", "Level Up"], c: 0, exp: "C'est notre slogan officiel !" }
];
let quizOrder = [];
let score = 0;
let current = 0;
const startBtn = document.getElementById('start-quiz');
const qArea = document.getElementById('question-area');
const sArea = document.getElementById('score-area');
const fArea = document.getElementById('feedback-area');
function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
function showQuestion() {
  if (current >= quizOrder.length) return showScore();
  const q = questions[quizOrder[current]];
  qArea.innerHTML = `<div class='quiz-q'><span class='quiz-progress'>${current+1}/15</span> ${q.q}</div>` +
    q.a.map((ans, i) => `<button class='btn quiz-a' data-i='${i}'>${ans}</button>`).join('<br>');
  qArea.style.display = '';
  sArea.style.display = 'none';
  fArea.innerHTML = '';
  document.querySelectorAll('.quiz-a').forEach(btn => {
    btn.onclick = () => {
      const isGood = parseInt(btn.dataset.i) === q.c;
      if (isGood) {
        score++;
        btn.classList.add('good');
        fArea.innerHTML = `<div class='good'>Bravo !</div><div>${q.exp}</div>`;
      } else {
        btn.classList.add('bad');
        fArea.innerHTML = `<div class='bad'>Mauvaise réponse</div><div>${q.exp}</div>`;
      }
      document.querySelectorAll('.quiz-a').forEach(b => b.disabled = true);
      setTimeout(() => { current++; showQuestion(); }, 900);
    };
  });
}
function showScore() {
  qArea.style.display = 'none';
  sArea.style.display = '';
  fArea.innerHTML = '';
  let msg = score >= 12 ? "🌟 Super ! Tu es un vrai éco-gamer !" : score >= 8 ? "👍 Pas mal, continue à t'informer !" : "💡 Tu peux faire mieux, retente ta chance !";
  sArea.innerHTML = `<h3>Score : ${score} / 15</h3><div>${msg}</div><button class='btn' onclick='location.reload()'>Rejouer</button>`;
  saveScore(score);
}
function saveScore(s) {
  let scores = JSON.parse(localStorage.getItem('planetplay-scores') || '[]');
  scores.push({ type: 'quiz', score: s, date: Date.now() });
  localStorage.setItem('planetplay-scores', JSON.stringify(scores));
}
if (startBtn) {
  startBtn.onclick = () => {
    quizOrder = shuffle([...Array(questions.length).keys()]).slice(0, 15);
    score = 0; current = 0;
    startBtn.style.display = 'none';
    showQuestion();
  };
} 