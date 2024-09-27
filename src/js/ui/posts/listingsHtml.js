export function buildListingsHTML(listings, container) {
  container.innerHTML = '';

  listings.data.forEach((post) => {
    let postHTML = `<div class="listing-card">
                        <a href="listingItem.html">
                        <h3>${post.title}</h3>`;

    if (post.media && post.media.length > 0) {
      let imageUrl = post.media[0].url;
      let imageAlt = post.media[0].alt || 'Listing image';

      postHTML += `<img src="${imageUrl}" alt="${imageAlt}" class="listing-img">`;
    }

    postHTML += `<div class="listingsFeed-info">
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
                     )}</p>
                     </div></a></div>`;

    container.innerHTML += postHTML;
  });
}
