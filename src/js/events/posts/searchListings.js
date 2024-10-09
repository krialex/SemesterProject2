import { GET_BASE_URL, LISTINGS, API_KEY } from '../../api/constants.js';

export async function searchListings(query) {
  const searchUrl = `${GET_BASE_URL}${LISTINGS}/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'X-Noroff-API-Key': API_KEY,
      },
    });
    if (response.ok) {
      const searchResult = await response.json();
      return searchResult;
    } else {
      console.log('Failed to fetch search results');
      return [];
    }
  } catch (error) {
    console.log(
      'try did not go thru. fix the try in searchListings function..',
      error,
    );
    return [];
  }
}
