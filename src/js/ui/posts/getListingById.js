import { GET_BASE_URL, LISTINGS, API_KEY } from '../../api/constants.js';
import { buildHtmlForOneListing } from './buildHtmlForOneListing.js';

export async function getListingById() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const response = await fetch(`${GET_BASE_URL}${LISTINGS}/${id}`, {
    headers: {
      'X-Noroff-API-Key': API_KEY,
    },
    method: 'GET',
  });

  if (response.ok) {
    const listing = await response.json();
    console.log(listing);
    buildHtmlForOneListing(listing);
    //return listing;
  } else {
    console.log('Cant fetch listing by id');
    return null;
  }
}
