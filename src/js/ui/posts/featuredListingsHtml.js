export function featuredListingsHtml(topListings) {
  const featuredSection = document.querySelector('.featured-listings');
  featuredSection.innerHTML = '';

  if (topListings.length === 0) {
    featuredSection.innerHTML = '<p>No featured listings available.</p>';
    return;
  }

  let carouselHTML = `<div id="featuredCarousel" class="carousel slide">
                        <div class="carousel-inner">`;

  topListings.forEach((post, index) => {
    let isActive = index === 0 ? ' active' : '';
    let imageUrl = post.media && post.media.length > 0 ? post.media[0].url : '';
    let imageAlt =
      post.media && post.media.length > 0
        ? post.media[0].alt || 'Listing image'
        : 'No image available';

    if (imageUrl) {
      carouselHTML += `<a href="listingItem.html?id=${post.id}" class="carousel-item${isActive}" style="text-decoration: none;">
        <img src="${imageUrl}" class="d-block w-100 feature-img" alt="${imageAlt}">
        <div class="carousel-caption d-md-block">
          <h4 style="color: white;">${post.title}</h4>
          <p style="color: white;">Bids: ${post._count.bids}</p>
        </div>
        </a>`;
    } else {
      carouselHTML += `<a href="listingItem.html?id=${post.id}" class="carousel-item${isActive}" style="text-decoration: none;">
      <div class="no-featured-image-placeholder d-block w-100 feature-img">
        *No image found for this listing*
      </div>
      <div class="carousel-caption d-md-block">
        <h4 style="color: white;">${post.title}</h4>
        <p style="color: white;">Bids: ${post._count.bids}</p>
      </div>
    </a>`;
    }
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
                     </div>`;

  featuredSection.innerHTML = carouselHTML;
}
