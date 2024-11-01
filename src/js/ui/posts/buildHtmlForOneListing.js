export function buildHtmlForOneListing(listing, lastBid, lastBidder) {
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
    const isEnded = endDate <= new Date();

    const endDataHTML = isEnded
      ? '<div class="ended-btn">Ended</div>'
      : `<p><span class="infoOnListing">Ends at:</span> ${endDate.toLocaleDateString(
          'en-GB',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          },
        )}</p>`;

    listingHTML += `</div>
                            <div><h2>${listing.data.title}</h2>
                            <p>${listing.data.description}</p>
                            <br>
                            <hr>
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
                           ${endDataHTML}`;

    if (!isEnded) {
      listingHTML += `<p><span class="infoOnListing">Current bids:</span> ${listing.data._count.bids}</p>`;
      if (lastBid) {
        listingHTML += `<div class="last-bid">
                          <p><span class="infoOnListing">Last bid:</span> ${lastBid.amount} - made by ${lastBidder.name}</p>
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
      listingHTML += `<form id="bidForm" class="placeYourBid">
                          <label for="yourBid">Place your bid: </label>
                          <input type="text" id="yourBid" placeholder="Your bid" />
                          <button type="submit" class="btn btn-primary buttons">Bid now</button>
                          </form>`;
    }

    listingHTML += `</div></div>`;
    listingContainer.innerHTML += listingHTML;
  } else {
    listingContainer.innerHTML = `<p>Listing not found</p>`;
  }
}
