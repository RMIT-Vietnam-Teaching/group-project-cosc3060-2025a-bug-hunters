document.addEventListener("DOMContentLoaded", () => {
  const alert = document.getElementById('success-alert') || document.getElementById('error-alert');

  if (alert) {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 3000); 
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const successAlert = document.getElementById('success-alert');
  const errorAlert = document.getElementById('error-alert');

  const fadeOut = (el) => {
    el.style.transition = 'opacity 0.5s ease';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  };

  if (successAlert) {
    setTimeout(() => fadeOut(successAlert), 3000);
  }

  if (errorAlert) {
    setTimeout(() => fadeOut(errorAlert), 3000);
  }
});