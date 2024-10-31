export function buildListingsHTML(listings, container) {
  container.innerHTML = '';

  listings.data.forEach((post) => {
    let postHTML = `<div class="listing-card">
                        <a href="listingItem.html?id=${post.id}" aria-label="View Listing">
                        <h3>${post.title}</h3>`;

    if (post.media && post.media.length > 0) {
      let imageUrl = post.media[0].url;
      let imageAlt = post.media[0].alt || 'Listing image';

      postHTML += `<img src="${imageUrl}" alt="${imageAlt}" class="listing-img">`;
    } else {
      postHTML += `<div class="no-image-placeholder">*No image found for this listing*</div>`;
    }

    const endDate = new Date(post.endsAt);
    const endDateHTML =
      endDate > new Date()
        ? `<p>Ends at: ${endDate.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</p>`
        : '<div class="ended-btn">Ended</div>';

    postHTML += `<div class="listingsFeed-info">
                      <p>Bids: ${post._count.bids}</p>
                      ${endDateHTML}
                      </div></a></div>`;

    container.innerHTML += postHTML;
  });
}

/* postHTML += `<div class="listingsFeed-info">
                     <p>Bids: ${post._count.bids}</p>
                     <p>Ends at: ${new Date(post.endsAt).toLocaleDateString(
                       'en-GB',
                       {
                         year: 'numeric',
                         month: 'long',
                         day: 'numeric',
                         hour: '2-digit',
                         minute: '2-digit',
                       },
                     )}</p> */
