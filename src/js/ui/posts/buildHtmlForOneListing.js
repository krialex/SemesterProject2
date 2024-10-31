export function buildHtmlForOneListing(listing, lastBid) {
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

    const endDate = new Date(listing.data.endsAt);
    const endDataHTML =
      endDate > new Date()
        ? `<p><span class="infoOnListing">Ends at:</span> ${endDate.toLocaleDateString(
            'en-GB',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            },
          )}</p>`
        : '<div class="ended-btn">Ended</div>';

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
                           ${endDataHTML}
                            <p><span class="infoOnListing">Current bids:</span> ${listing.data._count.bids}</p>
                            </div>`;
    if (lastBid) {
      listingHTML += `<div class="last-bid">
                        <p><span class="infoOnListing">Last bid by seller:</span> ${lastBid.amount}</p>
                        <p><span class="infoOnListing">Bid placed on:</span> ${new Date(
                          lastBid.created,
                        ).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}</p>
                        </div>`;
    }
    listingHTML += `<form id="bidForm"class="placeYourBid">
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
