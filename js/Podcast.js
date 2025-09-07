/**
 * Represents a single podcast show.
 * @class Podcast
 * @param {string} title - Title of the podcast
 * @param {string} coverImage - URL to the cover image
 * @param {number} seasons - Number of seasons
 * @param {Array<string>} genres - List of genres
 * @param {Date} lastUpdated - Last updated timestamp
 * @param {string} description - Description of the podcast
 * @param {Array<Object>} seasonsData - Detailed season data
 */
class Podcast {
  constructor(title, coverImage, seasons, genres, lastUpdated, description, seasonsData) {
    this.title = title;
    this.coverImage = coverImage;
    this.seasons = seasons;
    this.genres = genres;
    this.lastUpdated = lastUpdated;
    this.description = description;
    this.seasonsData = seasonsData;
  }

  /**
   * Format the last updated date into human-readable form.
   * @returns {string} Human-readable time since last update
   */
  getFormattedLastUpdated() {
    const now = new Date();
    const diffTime = now - this.lastUpdated;
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
    return this.lastUpdated.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}