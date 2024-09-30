import { GET_BASE_URL, LOGIN, API_KEY } from '../constants.js';
import { save } from '../localeStorage/save.js';

const logInForm = document.querySelector('.logInForm');
const userEmail = document.getElementById('loginEmail');
const userPassword = document.getElementById('loginPassword');
const errorEmail = document.getElementById('errorEmail');
const errorPassword = document.getElementById('errorPassword');

export async function login(email, password) {
  const response = await fetch(GET_BASE_URL + LOGIN, {
    headers: {
      'X-Noroff-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save('token', accessToken);
    save('profile', profile);
    localStorage.setItem('loggedIn', 'true');

    return profile;
  }
  throw new Error('Could not log in..');
}

export function validateEmail(email) {
  const pattern = /@stud\.noroff\.no$/;
  return pattern.test(email);
}

logInForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let valueValid = true;

  if (userEmail.value.trim() === '' || !validateEmail(userEmail.value)) {
    errorEmail.style.display = 'inline';
    valueValid = false;
  } else {
    errorEmail.style.display = 'none';
  }
  if (userPassword.value.trim().length < 8) {
    errorPassword.style.display = 'inline';
    valueValid = false;
  } else {
    errorPassword.style.display = 'none';
  }
  if (valueValid) {
    const email = userEmail.value;
    const password = userPassword.value;
    console.log(email, password);

    try {
      await login(email, password);
      setTimeout(() => window.location.replace('index.html'), 1000);
    } catch (error) {
      console.error(error);
    }
  }
});
