import { GET_BASE_URL, LISTINGS, API_KEY } from '../../api/constants.js';
import { load } from '../../api/localeStorage/load.js';

export async function createNewListing(listingData) {
  const token = load('token');

  try {
    const response = await fetch(GET_BASE_URL + LISTINGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(listingData),
    });
    if (!response.ok) {
      console.log('failed to create new listing..');
    }
    const item = response.json();
    return item;
  } catch (error) {
    console.log('nothing was publiched', error);
  }
}
