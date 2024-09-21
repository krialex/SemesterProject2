import { GET_BASE_URL, PROFILE, API_KEY } from '../../api/constants.js';
//import { load } from "../localStorage/loadInfo.js";

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
                                <img src="${userData.data.banner.url}" alt="${userData.data.banner.alt} 
                                class="profile-img">
                                <i class="fa-solid fa-pen-to-square editImage"></i>
                                </div>
                                <p>Name: ${userData.data.name}</p>
                                <p>Credits: ${userData.data.credits}</p>
                                <p>Wins: ${userData.data._count.wins}</p>
                               </div>`;

    return userData;
  } catch (error) {
    console.log('Could not get user info on profile:', error);
  }
}

/*import { GET_BASE_URL, PROFILE, API_KEY } from "../../api/constants.js";
import { load } from "../localStorage/loadInfo.js";

const userInfo = document.querySelector(".userInfo");

export async function getUserId(name) {
    userInfo.innerHTML += "";

    const profileName = localStorage.getItem("pofile.name");

    console.log(profileName);
    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${profileName}`, {
            headers: {
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });
        if(response.ok) {
            throw new Error("Failed to fetch info on user");
        }
        const userData = await response.json();

        userInfo.innerHTML += `<div class="user-info">
                               <img src="${userData.data.banner.url}"
                               alt="${userData.data.banner.alt}">
                               <p>${userData.data.name}</p>
                               <p>${userData.data.credits}</p>
                               <p>${userData.data._count.wins}</p>
                               <p>New listing</p></div>`
        
        return userData;
    } catch {
        console.log("could not get user info on profile");
    }
} */
