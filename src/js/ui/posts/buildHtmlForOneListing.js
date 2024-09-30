export function buildHtmlForOneListing(listing) {
  const listingContainer = document.querySelector('.oneListing');

  if (listing) {
    let listingHTML = `<div>`;

    if (listing.data.media && listing.data.media.length > 0) {
      let imageUrl = listing.data.media[0].url;
      let imageAlt = listing.data.media[0].alt || 'Listing image';

      listingHTML += `<img src="${imageUrl}" alt="${imageAlt}" class="listing-img">`;
    }
    listingHTML += `</div>
                            <div><h2>${listing.data.title}</h2>
                            <p>${listing.data.description}</p>
                            <p>Created: ${new Date(
                              listing.data.created,
                            ).toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}</p>
                            <p>Ends at: ${new Date(
                              listing.data.endsAt,
                            ).toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}</p>
                            <p>Current bids: ${listing.data._count.bids}</p>
                            <form class="placeYourBid">
                            <label for="yourBid">Place your bid: </label>
                            <input type="text" id="yourBid" placeholder="Your bid" />
                            <button class="btn btn-primary">Bid now</button>
                            </form>
                            </div>`;

    listingContainer.innerHTML += listingHTML;
  } else {
    listingContainer.innerHTML = `<p>Listing not found</p>`;
  }
}
