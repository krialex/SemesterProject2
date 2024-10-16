import { GET_BASE_URL, REGISTRER, API_KEY } from '../constants.js';

const signInForm = document.querySelector('.signInForm');
const userName = document.getElementById('signinName');
const userEmail = document.getElementById('signinEmail');
const userPassword = document.getElementById('signinPassword');
const errorName = document.getElementById('errorSigninName');
const errorEmail = document.getElementById('errorSigninEmail');
const errorPassword = document.getElementById('errorSigninPassword');

export async function registrerAccount(name, email, password) {
  try {
    const response = await fetch(GET_BASE_URL + REGISTRER, {
      headers: {
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      throw new Error('Could not registrer account');
    }
  } catch (error) {
    console.log(error);
  }
}

export function validateEmail(email) {
  const pattern = /@stud\.noroff\.no$/;
  return pattern.test(email);
}

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let isValid = true;

  if (userName.value.trim() === '') {
    errorName.style.display = 'inline-block';
    isValid = false;
  } else {
    errorName.style.display = 'none';
  }
  if (userEmail.value.trim() === '' || !validateEmail(userEmail.value)) {
    console.log('email is invalid..');
    errorEmail.style.display = 'inline-block';
    isValid = false;
  } else {
    errorEmail.style.display = 'none';
  }
  if (userPassword.value.trim().length < 8) {
    errorPassword.style.display = 'inline-block';
    isValid = false;
  } else {
    errorPassword.style.display = 'none';
  }

  if (isValid) {
    const name = userName.value;
    const email = userEmail.value;
    const password = userPassword.value;

    try {
      await registrerAccount(name, email, password);
      setTimeout(() => window.location.replace('index.html'), 500);
    } catch (error) {
      console.error(error);
    }
  }
});
