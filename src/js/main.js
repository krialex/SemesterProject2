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
                            <h3>${post.title}</h3>
                            <p>Bids: ${post._count.bids}</p>
                            <p>Description: ${post.description}</p>
                            </div>`;

      listingContainer.innerHTML += postHTML;
    });
  } catch (error) {
    console.log('can not fetch info from api', error);
  }
}

getListings();
