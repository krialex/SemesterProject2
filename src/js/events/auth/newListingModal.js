import { createNewListing } from '../../events/posts/createNewListing.js';

export function newListingModal() {
  const modal = document.createElement('div');
  modal.id = 'newListingModal';
  modal.classList.add('modal');
  modal.innerHTML = `<div class="modal-content listing-modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
                        <span class="close" aria-label="Close">&times;</span>
                        <h2>Create new listing</h2>
                        <lable for="newListingTitle" class="newListingLable">Your title: </lable>
                        <input type="text" id="newListingTitle" placeholder="Title" required>
                        <lable for="newListingDescription" class="newListingLable">Description: </lable>
                        <input type="text" id="newListingDescription" placeholder="Description">
                        <lable for="newListingTags" class="newListingLable">Tags: </lable>
                        <input type="text" id="newListingTags" placeholder="Tags">
                        <lable for="newListingUrl" class="newListingLable">Listing image: </lable>
                        <input type="text" id="newListingUrl" placeholder="Image url">
                        <lable for="newListingEndsAt" class="newListingLable">Enter end date end time: </lable>
                        <input type="datetime-local" id="newListingEndsAt" placeholder="Enter end date for listing">
                        <button id="pubilshListing" class="btn btn-primary newListingBtn buttons">Publish</button>
                        </div>`;

  document.body.appendChild(modal);

  const closeModal = modal.querySelector('.close');
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  document
    .getElementById('pubilshListing')
    .addEventListener('click', async (e) => {
      e.preventDefault();

      const title = document.getElementById('newListingTitle').value;
      const description = document.getElementById(
        'newListingDescription',
      ).value;
      const tags = document
        .getElementById('newListingTags')
        .value.split(',')
        .map((tag) => tag.trim());
      const imageUrl = document.getElementById('newListingUrl').value;
      const endsAt = new Date(
        document.getElementById('newListingEndsAt').value,
      ).toISOString();

      const listingData = {
        title,
        description,
        tags,
        media: [{ url: imageUrl, alt: 'Listing image' }],
        endsAt,
      };

      await createNewListing(listingData);

      modal.style.display = 'none';
      window.location.reload();
    });
}
