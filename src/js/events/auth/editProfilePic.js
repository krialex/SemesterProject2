import { GET_BASE_URL, PROFILE, API_KEY } from '../../api/constants.js';
import { load } from '../../api/localeStorage/load.js';

export async function editProfilePic(event, avatarUrl) {
  event.preventDefault();
  const profile = JSON.parse(localStorage.getItem('profile'));
  const profileName = profile.name;

  try {
    const token = load('token');
    const avatarData = {
      avatar: {
        url: avatarUrl,
        alt: 'image',
      },
    };

    const response = await fetch(GET_BASE_URL + PROFILE + `/${profileName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(avatarData),
    });

    if (!response.ok) {
      console.log('could not update avatar image for profile..');
      return;
    }

    console.log('Avatar image updated successfully!');
  } catch (error) {
    console.log('editProfilePic function does not work..', error);
  }
}
