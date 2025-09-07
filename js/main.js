/**
 * Main application logic.
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for the data to be loaded
  let attempts = 0;
  const maxAttempts = 20;
  
  // Check if data is loaded or wait for it
  while (!window.podcastData && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 50));
    attempts++;
  }
  
  if (!window.podcastData) {
    console.error('Failed to load podcast data after multiple attempts');
    return;
  }

  const podcastManager = new PodcastManager();
  const modal = new Modal();

  const podcastGrid = document.getElementById('podcast-grid');
  const genreFilter = document.getElementById('genre-filter');
  const sortFilter = document.getElementById('sort-filter');

  /**
   * Render podcasts to the DOM.
   * @param {Array<Podcast>} podcasts - List of podcasts to render
   */
  function renderPodcasts(podcasts) {
    podcastGrid.innerHTML = '';
    if (podcasts.length === 0) {
      podcastGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No podcasts found matching your criteria.</p>';
      return;
    }
    
    podcasts.forEach(podcast => {
      const card = document.createElement('div');
      card.className = 'podcast-card';
      card.innerHTML = `
        <img src="${podcast.image}" alt="${podcast.title}">
        <div class="podcast-info">
          <h3 class="podcast-title">${podcast.title}</h3>
          <div class="seasons">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ${podcast.seasons} seasons
          </div>
          <div class="genre-tags">
            ${podcast.getGenres().map(g => `<span class="genre-tag">${g.title}</span>`).join('')}
          </div>
          <div class="updated-date">${podcast.getFormattedLastUpdated()}</div>
        </div>
      `;
      card.addEventListener('click', () => modal.show(podcast));
      podcastGrid.appendChild(card);
    });
  }

  // Initial render
  const filteredAndSorted = podcastManager.sortBy(sortFilter.value);
  renderPodcasts(filteredAndSorted);

  // Event Listeners
  genreFilter.addEventListener('change', () => {
    const genre = genreFilter.value;
    const sorted = podcastManager.sortBy(sortFilter.value);
    const filtered = podcastManager.filterByGenre(genre);
    renderPodcasts(filtered);
  });

  sortFilter.addEventListener('change', () => {
    const genre = genreFilter.value;
    const sorted = podcastManager.sortBy(sortFilter.value);
    const filtered = podcastManager.filterByGenre(genre);
    renderPodcasts(filtered);
  });
});