export function buildHtmlForOneListing(listing) {
  const listingContainer = document.querySelector('.oneListing');

  if (listing) {
    let listingHTML = `<div>`;

    if (listing.data.media && listing.data.media.length > 0) {
      let imageUrl = listing.data.media[0].url;
      let imageAlt = listing.data.media[0].alt || 'Listing image';

      listingHTML += `<img src="${imageUrl}" alt="${imageAlt}" class="listing-img">`;
    } else {
      listingHTML += `<div class="no-image-placeholder">*No image found for this listing*</div>`;
    }
    listingHTML += `</div>
                            <div><h2>${listing.data.title}</h2>
                            <p>${listing.data.description}</p>
                            <div class="dateInfo">
                            <p><span class="infoOnListing">Created:</span> ${new Date(
                              listing.data.created,
                            ).toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}</p>
                            <p><span class="infoOnListing">Ends at:</span> ${new Date(
                              listing.data.endsAt,
                            ).toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}</p>
                            <p><span class="infoOnListing">Current bids:</span> ${listing.data._count.bids}</p>
                            </div>
                            <form id="bidForm" class="placeYourBid">
                            <label for="yourBid">Place your bid: </label>
                            <input type="text" id="yourBid" placeholder="Your bid" />
                            <button type="submit" class="btn btn-primary">Bid now</button>
                            </form>
                            </div>`;

    listingContainer.innerHTML += listingHTML;
  } else {
    listingContainer.innerHTML = `<p>Listing not found</p>`;
  }
}
