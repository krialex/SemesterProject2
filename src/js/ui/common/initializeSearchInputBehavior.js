export function initializeSearchInputBehavior() {
  const box = document.querySelector('.box');
  const input = box.querySelector('input');

  input.addEventListener('focus', () => {
    box.classList.add('active');
  });

  input.addEventListener('blur', () => {
    box.classList.remove('active');
  });

  box.addEventListener('click', () => {
    input.focus();
  });
}
