/**
 * Represents a single podcast show.
 * @class Podcast
 * @param {Object} data - Raw podcast data from API
 */
class Podcast {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.seasons = data.seasons;
    this.image = data.image.trim();
    this.genreIds = data.genres;
    this.updated = new Date(data.updated);
    this.seasonDetails = this.getSeasonDetails(data.id);
  }

  /**
   * Get season details for this podcast
   * @param {string} podcastId - Podcast ID
   * @returns {Array<Object>} Season details
   */
  getSeasonDetails(podcastId) {
    const seasonData = window.podcastData.seasons.find(s => s.id === podcastId);
    return seasonData ? seasonData.seasonDetails : [];
  }

  /**
   * Get genre objects for this podcast
   * @returns {Array<Object>} Array of genre objects
   */
  getGenres() {
    return this.genreIds.map(genreId => {
      return window.podcastData.genres.find(g => g.id === genreId);
    }).filter(Boolean);
  }

  /**
   * Format the last updated date into human-readable form.
   * @returns {string} Human-readable time since last update
   */
  getFormattedLastUpdated() {
    const now = new Date();
    const diffTime = now - this.updated;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    return `Updated ${diffDays} days ago`;
  }

  /**
   * Get formatted date for display.
   * @returns {string} Formatted date string
   */
  getFormattedDate() {
    return this.updated.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Export the class for module usage
export default Podcast;