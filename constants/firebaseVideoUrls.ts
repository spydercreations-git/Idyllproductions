// Placeholder URLs - Replace with Firebase URLs after setup
export const FIREBASE_VIDEO_URLS = {
  "short-form": [
    "https://via.placeholder.com/400x600/000000/FFFFFF?text=Video+1",
    "https://via.placeholder.com/400x600/000000/FFFFFF?text=Video+2",
    "https://via.placeholder.com/400x600/000000/FFFFFF?text=Video+3",
    "https://via.placeholder.com/400x600/000000/FFFFFF?text=Video+4"
  ],
  "saas-tech": [
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=SaaS+Demo+1",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=SaaS+Demo+2",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=SaaS+Demo+3",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=SaaS+Demo+4"
  ],
  "gaming": [
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=Gaming+1",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=Gaming+2",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=Gaming+3",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=Gaming+4"
  ],
  "hero": [
    "https://via.placeholder.com/1200x675/000000/FFFFFF?text=Hero+Video"
  ],
  "youtube-long-form": [
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=YouTube+1",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=YouTube+2",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=YouTube+3",
    "https://via.placeholder.com/800x450/000000/FFFFFF?text=YouTube+4"
  ]
};

// Hero video URL
export const HERO_VIDEO_URL = FIREBASE_VIDEO_URLS.hero[0];

// Helper function to get videos for a category
export const getVideosForCategory = (category: keyof typeof FIREBASE_VIDEO_URLS) => {
  return FIREBASE_VIDEO_URLS[category] || [];
};