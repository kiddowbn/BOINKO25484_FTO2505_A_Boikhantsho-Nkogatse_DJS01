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
   * Initialize sample podcast data.
   */
  initializePodcasts() {
    this.podcasts = [
      new Podcast(
        "Tech Trends Weekly",
        "assets/images/placeholder.jpg",
        3,
        ["Technology", "Business"],
        new Date("2025-01-15"),
        "Join us every week as we dive deep into the latest technology trends...",
        [
          { title: "Season 1: Getting Started", description: "Introduction to the fundamentals", episodes: 12 },
          { title: "Season 2: Advanced Topics", description: "Deep dives into complex subjects", episodes: 15 },
          { title: "Season 3: Industry Insights", description: "Expert perspectives and case studies", episodes: 18 },
          { title: "Season 4: Future Trends", description: "What's coming next in tech", episodes: 20 }
        ]
      ),
      new Podcast(
        "Crime Files",
        "assets/images/placeholder.jpg",
        5,
        ["True Crime", "Mystery"],
        new Date("2025-01-08"),
        "Uncover real-life criminal cases with expert analysis.",
        [
          { title: "Season 1: Cold Cases", description: "Revisiting unsolved mysteries", episodes: 10 },
          { title: "Season 2: High-Profile Murders", description: "Stories behind famous crimes", episodes: 12 },
          { title: "Season 3: Undercover Ops", description: "Secret missions and卧底 work", episodes: 14 }
        ]
      ),
      new Podcast(
        "Daily News Digest",
        "assets/images/placeholder.jpg",
        2,
        ["News", "Politics"],
        new Date("2025-01-10"),
        "Your daily briefing on world events and breaking news.",
        [
          { title: "Season 1: Global Events", description: "Major international stories", episodes: 8 },
          { title: "Season 2: Local Impact", description: "How global news affects your community", episodes: 10 }
        ]
      ),
      new Podcast(
        "Mindful Living",
        "assets/images/placeholder.jpg",
        4,
        ["Health", "Lifestyle"],
        new Date("2025-01-12"),
        "Tips and techniques for a healthier, more balanced life.",
        [
          { title: "Season 1: Meditation Basics", description: "Getting started with mindfulness", episodes: 12 },
          { title: "Season 2: Nutrition & Wellness", description: "Eat better, feel better", episodes: 14 },
          { title: "Season 3: Sleep Science", description: "Improve your sleep quality", episodes: 10 }
        ]
      )
    ];
  }

  /**
   * Filter podcasts by genre.
   * @param {string} genre - Genre filter value
   * @returns {Array<Podcast>} Filtered list
   */
  filterByGenre(genre) {
    if (genre === 'all') return this.podcasts;
    return this.podcasts.filter(podcast => podcast.genres.includes(genre));
  }

  /**
   * Sort podcasts by criteria.
   * @param {string} sort - Sort option ('recent', 'popular', 'newest')
   * @returns {Array<Podcast>} Sorted list
   */
  sortBy(sort) {
    switch (sort) {
      case 'recent':
        return [...this.podcasts].sort((a, b) => b.lastUpdated - a.lastUpdated);
      case 'popular':
        return [...this.podcasts].sort((a, b) => b.seasons - a.seasons);
      case 'newest':
        return [...this.podcasts].sort((a, b) => a.lastUpdated - b.lastUpdated);
      default:
        return this.podcasts;
    }
  }
}