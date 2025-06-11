document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('h1');
  if (title) {
    title.animate([
      { letterSpacing: '0.1em', color: '#1DB954' },
      { letterSpacing: '0.2em', color: '#FAFAFA' },
      { letterSpacing: '0.1em', color: '#1DB954' }
    ], {
      duration: 1800,
      iterations: Infinity
    });
  }
  const slogan = document.querySelector('.slogan');
  if (slogan) {
    slogan.addEventListener('mouseover', () => {
      slogan.style.color = '#1DB954';
    });
    slogan.addEventListener('mouseout', () => {
      slogan.style.color = '#94A3B8';
    });
  }
}); 