/**
 * Handles modal display and interaction.
 * @class Modal
 */
class Modal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.closeBtn = document.getElementById('close-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalImage = document.getElementById('modal-image');
    this.modalDescription = document.getElementById('modal-description');
    this.modalGenres = document.getElementById('modal-genres');
    this.modalLastUpdated = document.getElementById('modal-last-updated');
    this.seasonsList = document.getElementById('seasons-list');

    this.init();
  }

  /**
   * Initialize modal event listeners.
   */
  init() {
    this.closeBtn.addEventListener('click', () => this.hide());
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hide();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  /**
   * Show modal with podcast data.
   * @param {Podcast} podcast - The podcast to display
   */
  show(podcast) {
    this.modalTitle.textContent = podcast.title;
    this.modalImage.src = podcast.image;
    this.modalDescription.textContent = podcast.description;
    this.modalLastUpdated.textContent = `Last updated: ${podcast.getFormattedDate()}`;
    this.renderGenres(podcast.getGenres());
    this.renderSeasons(podcast.seasonDetails);
    this.modal.style.display = 'flex';
  }

  /**
   * Hide the modal.
   */
  hide() {
    this.modal.style.display = 'none';
  }

  /**
   * Render genre tags in the modal.
   * @param {Array<Object>} genres - List of genre objects
   */
  renderGenres(genres) {
    this.modalGenres.innerHTML = '';
    genres.forEach(genre => {
      const tag = document.createElement('span');
      tag.className = 'genre-tag';
      tag.textContent = genre.title;
      this.modalGenres.appendChild(tag);
    });
  }

  /**
   * Render seasons list.
   * @param {Array<Object>} seasons - Array of season objects
   */
  renderSeasons(seasons) {
    this.seasonsList.innerHTML = '';
    seasons.forEach(season => {
      const item = document.createElement('div');
      item.className = 'season-item';
      item.innerHTML = `
        <div class="season-title">${season.title}</div>
        <div class="episode-count">${season.episodes} episodes</div>
      `;
      this.seasonsList.appendChild(item);
    });
  }
}

// Export the class for module usage
export default Modal;