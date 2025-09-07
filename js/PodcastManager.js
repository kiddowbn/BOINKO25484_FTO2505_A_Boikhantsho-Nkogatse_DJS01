/**
 * Manages podcast data, filtering, and sorting.
 * @class PodcastManager
 */
class PodcastManager {
  constructor() {
    this.podcasts = [];
    this.initializePodcasts();
  }

  /**
   * Initialize podcast data from external data source.
   */
  initializePodcasts() {
    // Create Podcast instances from the data
    this.podcasts = window.podcastData.podcasts.map(item => {
      return new Podcast(item);
    });
  }

  /**
   * Filter podcasts by genre.
   * @param {string} genre - Genre filter value
   * @returns {Array<Podcast>} Filtered list
   */
  filterByGenre(genre) {
    if (genre === 'all') return this.podcasts;
    const genreId = parseInt(genre);
    return this.podcasts.filter(podcast => 
      podcast.genreIds.includes(genreId)
    );
  }

  /**
   * Sort podcasts by criteria.
   * @param {string} sort - Sort option ('recent', 'popular', 'newest')
   * @returns {Array<Podcast>} Sorted list
   */
  sortBy(sort) {
    switch (sort) {
      case 'recent':
        return [...this.podcasts].sort((a, b) => b.updated - a.updated);
      case 'popular':
        return [...this.podcasts].sort((a, b) => b.seasons - a.seasons);
      case 'newest':
        return [...this.podcasts].sort((a, b) => a.updated - b.updated);
      default:
        return this.podcasts;
    }
  }

  /**
   * Get all available genres from the data.
   * @returns {Array<Object>} Array of genre objects
   */
  getAllGenres() {
    return window.podcastData.genres;
  }
}

// Export the class for module usage
export default PodcastManager;