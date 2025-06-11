const form = document.getElementById('contact-form');
const success = document.getElementById('contact-success');
if (form) {
  form.onsubmit = function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert('Merci de remplir tous les champs avec un email valide.');
      return false;
    }
    form.style.display = 'none';
    success.style.display = '';
    return false;
  };
} 