import { GET_BASE_URL, LISTINGS, API_KEY } from '../../api/constants.js';
import { buildHtmlForOneListing } from './buildHtmlForOneListing.js';
import { load } from '../../api/localeStorage/load.js';

export async function getListingById() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const token = load('token');

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

    const bidForm = document.getElementById('bidForm');
    bidForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bidAmount = document.getElementById('yourBid').value;

      if (token) {
        await submitBid(id, bidAmount, token);
      } else {
        alert('You must be logged in to place a bid');
      }
    });
  } else {
    console.log('Cant fetch listing by id');
    return null;
  }
}

async function submitBid(id, bidAmount, token) {
  const bidData = { amount: parseFloat(bidAmount) };

  if (isNaN(bidAmount) || bidAmount <= 0) {
    alert('Please enter a valid bid amount');
    return;
  }

  try {
    const response = await fetch(`${GET_BASE_URL}${LISTINGS}/${id}/bids`, {
      method: 'POST',
      headers: {
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bidData),
    });

    console.log(bidData);

    if (response.ok) {
      alert('Your bid is successfully placed!');
      const result = await response.json();
      window.location.reload();

      console.log(result);
    } else {
      const errorResponse = await response.json();
      console.log('Failed to place your bid', errorResponse);
      alert(`Error: ${errorResponse.message}`);
    }
  } catch (error) {
    console.log('An error has occurred', error);
    alert('An error has occurred while placing the bid');
  }
}
