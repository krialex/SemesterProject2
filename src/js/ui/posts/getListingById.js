import { GET_BASE_URL, LISTINGS, API_KEY } from '../../api/constants.js';
import { buildHtmlForOneListing } from './buildHtmlForOneListing.js';
import { load } from '../../api/localeStorage/load.js';
import { submitBid } from '../../events/posts/submitBid.js';
import { showToast } from '../common/userFeedbackToast.js';

export async function getListingById() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const token = load('token');

  const response = await fetch(
    `${GET_BASE_URL}${LISTINGS}/${id}?_seller=true&_bids=true`,
    {
      headers: {
        'X-Noroff-API-Key': API_KEY,
      },
      method: 'GET',
    },
  );

  if (response.ok) {
    const listing = await response.json();
    console.log(listing);

    const lastBid =
      listing.data.bids?.length > 0
        ? listing.data.bids[listing.data.bids.length - 1]
        : null;

    const lastBidder = lastBid ? lastBid.bidder : null;

    buildHtmlForOneListing(listing, lastBid, lastBidder);

    const bidForm = document.getElementById('bidForm');
    bidForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bidAmount = document.getElementById('yourBid').value;

      if (token) {
        const submitResult = await submitBid(id, bidAmount, token);

        if (submitResult) {
          const updatedResponse = await fetch(
            `${GET_BASE_URL}${LISTINGS}/${id}?_seller=true&_bids=true`,
            {
              headers: {
                'X-Noroff-API-Key': API_KEY,
              },
              method: 'GET',
            },
          );

          if (updatedResponse.ok) {
            const updatedListing = await updatedResponse.json();
            const updatedLastBid =
              updatedListing.data.bids.length > 0
                ? updatedListing.data.bids[updatedListing.data.bids.length - 1]
                : null;
            const updatedLastBidder = updatedLastBid
              ? updatedLastBid.bidder
              : null;

            document.querySelector('.oneListing').innerHTML = '';

            buildHtmlForOneListing(
              updatedListing,
              updatedLastBid,
              updatedLastBidder,
            );
          }
        }
      } else {
        showToast('You must be logged in to place a bid');
      }
    });
  } else {
    console.log('Cant fetch listing by id');
    return null;
  }
}
