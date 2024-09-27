import { GET_BASE_URL, PROFILE, API_KEY } from '../../api/constants.js';
import { createImageModal } from '../../events/auth/createImageModal.js';
import { getUsersListings } from '../../ui/posts/userListings.js';
import { newListingModal } from '../../events/auth/newListingModal.js';

const userInfo = document.querySelector('.userInfo');

export async function getUserId() {
  userInfo.innerHTML = '';

  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = JSON.parse(localStorage.getItem('token'));

  if (!profile) {
    console.log('No profile found in localStorage.');
    return;
  }

  const profileName = profile.name;

  try {
    const response = await fetch(GET_BASE_URL + PROFILE + `/${profileName}`, {
      headers: {
        'X-Noroff-API-Key': API_KEY,
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });

    if (!response.ok) {
      console.log('Failed to fetch info on user');
    }

    const userData = await response.json();
    userInfo.innerHTML += `<div class="user-info">
                                <div class="user-image">
                                <img src="${userData.data.avatar.url}" alt="${userData.data.avatar.alt} 
                                class="profile-img">
                                <a href="#" id="edit-avatar">
                                <i class="fa-solid fa-pen-to-square editImage"></i>
                                </a></div>
                                <p>Name: ${userData.data.name}</p>
                                <p>Credits: ${userData.data.credits}</p>
                                <p>Wins: ${userData.data._count.wins}</p>
                                <button class="btn-small">Create listing</button>
                               </div>`;

    await getUsersListings();

    document.querySelector('#edit-avatar').addEventListener('click', (e) => {
      e.preventDefault();
      createImageModal(userData.data.avatar.url);
      document.getElementById('editAvatarModal').style.display = 'block';
    });

    document.querySelector('.btn-small').addEventListener('click', (e) => {
      e.preventDefault();
      newListingModal();
      document.getElementById('newListingModal').style.display = 'block';
    });

    /*
    //her er noe problemer. modalen kommer fremdeles ikke opp..
    const createListingButton = document.querySelector('.btn-small');
    if (createListingButton) {
        createListingButton.addEventListener('click', (e) => {
            e.preventDefault();
            newListingModal(); 
        });  
    }*/

    return userData;
  } catch (error) {
    console.log('Could not get user info on profile:', error);
  }
}
