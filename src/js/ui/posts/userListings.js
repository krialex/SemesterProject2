import { GET_BASE_URL, PROFILE, API_KEY } from '../../api/constants.js';
import { load } from '../../api/localeStorage/load.js';
import { buildListingsHTML } from '../../ui/posts/listingsHtml.js';

const listingsContainer = document.querySelector('.userProfileListings');

export async function getUsersListings() {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = load('token');
  const profileName = profile.name;

  listingsContainer.innerHTML = '';

  try {
    const response = await fetch(
      GET_BASE_URL + PROFILE + `/${profileName}/listings`,
      {
        headers: {
          'X-Noroff-API-Key': API_KEY,
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      },
    );

    if (!response.ok) {
      console.log('Failed to fetch listings from user');
      return;
    }

    const usersListings = await response.json();

    if (!usersListings.data || usersListings.data.length === 0) {
      listingsContainer.innerHTML = `<div class="user-feedback-container">
                                           <p>This user has no listings yet..</p>
                                           </div>`;
    } else {
      buildListingsHTML(usersListings, listingsContainer);
    }
  } catch (error) {
    console.log('there are no listings made by this user', error);
  }
}
