function getScores() {
  return JSON.parse(localStorage.getItem('planetplay-scores') || '[]');
}
function renderScores() {
  const list = document.getElementById('scores-list');
  const badge = document.getElementById('badge-area');
  const scores = getScores();
  if (!scores.length) {
    list.innerHTML = '<p>Aucun score enregistré pour le moment.</p>';
    badge.innerHTML = '';
    return;
  }
  let html = '<table><tr><th>Date</th><th>Type</th><th>Score</th></tr>';
  let best = 0;
  scores.forEach(s => {
    html += `<tr><td>${new Date(s.date).toLocaleString()}</td><td>${s.type}</td><td>${s.score}</td></tr>`;
    if (s.score > best) best = s.score;
  });
  html += '</table>';
  list.innerHTML = html;
  if (best >= 15) renderBadge();
  else badge.innerHTML = '';
}
function renderBadge() {
  const badge = document.getElementById('badge-area');
  const canvas = document.createElement('canvas');
  canvas.width = 120; canvas.height = 120;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1DB954';
  ctx.beginPath(); ctx.arc(60,60,55,0,2*Math.PI); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Planet', 60, 60);
  ctx.fillText('Hero', 60, 85);
  badge.innerHTML = '<h4>Badge : Planet Hero</h4>';
  badge.appendChild(canvas);
}
document.getElementById('export-json').onclick = function() {
  const data = localStorage.getItem('planetplay-scores') || '[]';
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'planetplay-scores.json';
  a.click();
  URL.revokeObjectURL(url);
};
renderScores(); 