export function feturedListings(listings) {
  const sortedListings = listings.sort((a, b) => b._count.bids - a._count.bids);
  return sortedListings.slice(0, 10);
}
