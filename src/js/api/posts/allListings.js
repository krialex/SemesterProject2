export async function getListings() {
  const apiUrl = new URL(
    'https://v2.api.noroff.dev/auction/listings?_active=true&_bids=true',
  );
  try {
    const respons = await fetch(apiUrl);
    const listingsJson = await respons.json();

    return listingsJson;
  } catch (error) {
    console.log('can not fetch info from api', error);
    throw error;
  }
}
