export function featuredListingsHtml(topListings) {
  const featuredSection = document.querySelector('.featured-listings');
  featuredSection.innerHTML = '';

  if (topListings.length === 0) {
    featuredSection.innerHTML = '<p>No featured listings available.</p>';
    return;
  }

  let carouselHTML = `<div id="featuredCarousel" class="carousel slide">
                        <a href="listingItem.html">
                        <div class="carousel-inner">`;

  topListings.forEach((post, index) => {
    let isActive = index === 0 ? ' active' : '';
    let imageUrl = post.media && post.media.length > 0 ? post.media[0].url : '';
    let imageAlt =
      post.media && post.media.length > 0
        ? post.media[0].alt || 'Listing image'
        : 'No image available';

    carouselHTML += `<div class="carousel-item${isActive}">
                         <img src="${imageUrl}" class="d-block w-100 feature-img" alt="${imageAlt}">
                         <div class="carousel-caption d-md-block">
                         <h4>${post.title}</h4>
                         <p>Bids: ${post._count.bids}</p>
                         </div>
                         </div>`;
  });

  carouselHTML += `</div>
                     <button class="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                     </button>
                     <button class="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                     </button>
                     </a>
                     </div>`;

  featuredSection.innerHTML = carouselHTML;
}
