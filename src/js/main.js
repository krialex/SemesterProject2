import { getListings } from './api/posts/allListings.js';
import { buildListingsHTML } from './ui/posts/listingsHtml.js';
import { feturedListings } from './api/posts/featuredListings.js';
import { featuredListingsHtml } from './ui/posts/featuredListingsHtml.js';
import { initializeModals } from './events/auth/modals.js';
import { getUserId } from './ui/auth/userInfo.js';
import { getListingById } from './ui/posts/getListingById.js';
import { searchListings } from './events/posts/searchListings.js';
import { initializeSearchInputBehavior } from './ui/common/initializeSearchInputBehavior.js';

async function init() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  try {
    const listingsData = await getListings();
    const allListings = listingsData.data;
    const topListings = feturedListings(allListings);

    const listingContainer = document.querySelector('.listings-container');

    loader.style.display = 'none';

    featuredListingsHtml(topListings);
    buildListingsHTML(listingsData, listingContainer);
  } catch (error) {
    console.log('Failed to loade page', error);
  }
}
init();

initializeModals();

function loginAndLogout() {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  const loginButton = document.querySelector('.login-button');
  const signinButton = document.querySelector('.signin-button');
  const profileIcon = document.querySelector('.profile-icon');
  const signOutButton = document.querySelector('.signout-button');

  if (loggedIn) {
    if (loginButton) loginButton.style.display = 'none';
    if (signinButton) signinButton.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'block';
    if (signOutButton) signOutButton.style.display = 'block';

    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      getUserId(profile.name);
      console.log(profile.name);
    }
  } else {
    if (loginButton) loginButton.style.display = 'block';
    if (signinButton) signinButton.style.display = 'block';
    if (profileIcon) profileIcon.style.display = 'none';
    if (signOutButton) signOutButton.style.display = 'none';
  }
}

// Event handler for sign out button
document.querySelector('.signout-button')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('profile');
  localStorage.setItem('loggedIn', 'false');
  loginAndLogout();
  window.location.href = 'index.html';
});

loginAndLogout();

document.addEventListener('DOMContentLoaded', async () => {
  await getListingById();
});

async function handleSearch(event) {
  const query = event.target.value;

  if (query.length > 0) {
    try {
      const searchResult = await searchListings(query);
      const listingContainer = document.querySelector('.listings-container');

      buildListingsHTML(searchResult, listingContainer);
    } catch (error) {
      console.log('Search failed. check main.js..', error);
    }
  } else {
    const listingsData = await getListings();
    const listingContainer = document.querySelector('.listings-container');

    buildListingsHTML(listingsData, listingContainer);
  }
}

document.getElementById('search-input').addEventListener('input', handleSearch);

initializeSearchInputBehavior();
