import { login } from '../../api/auth/logIn.js';
import { registrerAccount } from '../../api/auth/signIn.js';

import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

export function initializeModals() {
  document.addEventListener('DOMContentLoaded', () => {
    const loginModal = new bootstrap.Modal(
      document.getElementById('loginModal'),
    );
    const signinModal = new bootstrap.Modal(
      document.getElementById('signinModal'),
    );

    const loginButton = document.querySelector('.login-button');
    const signinButton = document.querySelector('.signin-button');

    loginButton.addEventListener('click', () => {
      loginModal.show();
    });

    signinButton.addEventListener('click', () => {
      signinModal.show();
    });

    // Event listener for login form submission
    const loginForm = document.getElementById('loginForm'); // Anta at skjemaet i loginModal har ID 'loginForm'
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Forhindre standard skjema-innsending

        const email = loginForm.querySelector('#loginEmail').value;
        const password = loginForm.querySelector('#loginPassword').value;

        try {
          await login(email, password);
          loginModal.hide(); // Lukk modal ved vellykket innlogging
        } catch (error) {
          console.error('Login failed:', error);
        }
      });
    }

    // Event listener for signup form submission
    const signupForm = document.getElementById('signupForm'); // Anta at skjemaet i signinModal har ID 'signupForm'
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Forhindre standard skjema-innsending

        const email = signupForm.querySelector('#signupEmail').value;
        const password = signupForm.querySelector('#signupPassword').value;

        try {
          await registrerAccount(email, password);
          signinModal.hide(); // Lukk modal ved vellykket registrering
        } catch (error) {
          console.error('Signup failed:', error);
        }
      });
    }
  });
}
