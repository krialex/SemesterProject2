const apiUrl = new URL('https://v2.api.noroff.dev/auction/listings/');
const listingContainer = document.querySelector('.listings');

async function getListings() {
  try {
    const respons = await fetch(apiUrl);
    const listingsJson = await respons.json();

    console.log(listingsJson);

    listingContainer.innerHTML = '';

    listingsJson.data.forEach((post) => {
      let postHTML = `<div class="listing-card">
                            <h3>${post.title}</h3>`;

      if (post.media && post.media.length > 0) {
        let imageUrl = post.media[0].url;
        let imageAlt = post.media[0].alt || 'Listing image';

        postHTML += `<img src="${imageUrl}" alt="${imageAlt}" class="listing-img">`;
      }

      postHTML += `<p>Bids: ${post._count.bids}</p>
                         </div>`;

      listingContainer.innerHTML += postHTML;
    });
  } catch (error) {
    console.log('can not fetch info from api', error);
  }
}

getListings();
