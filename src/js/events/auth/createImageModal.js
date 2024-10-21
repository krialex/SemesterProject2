import { editProfilePic } from '../auth/editProfilePic.js';

export function createImageModal() {
  const modal = document.createElement('div');
  modal.id = 'editAvatarModal';
  modal.classList.add('modal');
  modal.innerHTML = `<div class="modal-content listing-modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
                        <span class="close" aria-label="Close">&times;</span>
                        <h2>Edit Avatar</h2>
                        <label for="avatarUrl">Enter your new avatar: </label>
                        <input type="text" id="avatarUrl" placeholder="Enter new avatar URL">
                        <button id="saveAvatar" class="btn btn-primary buttons newAvatarImage">Save</button>
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

  document.getElementById('saveAvatar').addEventListener('click', async (e) => {
    const newAvatarUrl = document.getElementById('avatarUrl').value;
    await editProfilePic(e, newAvatarUrl);

    modal.style.display = 'none';
    window.location.reload();
  });
}
