// Using compressed videos from public folder
export const FIREBASE_VIDEO_URLS = {
  "short-form": [
    "/videos/short-form/Ad 1.mp4",
    "/videos/short-form/Ad 2.mp4",
    "/videos/short-form/Ad 3.mp4",
    "/videos/short-form/Ad 4.mp4"
  ],
  "saas-tech": [
    "/videos/saas-tech/Doks Ai Fiinal.mp4",
    "/videos/saas-tech/Final Thoka Thoki.mp4",
    "/videos/saas-tech/Shapes.mp4",
    "/videos/saas-tech/Waves Final.mp4"
  ],
  "gaming": [
    "/videos/gaming/1 G.mp4",
    "/videos/gaming/2.mp4",
    "/videos/gaming/3 G.mp4",
    "/videos/gaming/4.mp4"
  ],
  "hero": [
    "/main white.mp4"
  ],
  "youtube-long-form": [
    "/videos/saas-tech/Doks Ai Fiinal.mp4",
    "/videos/saas-tech/Final Thoka Thoki.mp4",
    "/videos/saas-tech/Shapes.mp4",
    "/videos/saas-tech/Waves Final.mp4"
  ]
};

// Hero video URL
export const HERO_VIDEO_URL = FIREBASE_VIDEO_URLS.hero[0];

// Helper function to get videos for a category
export const getVideosForCategory = (category: keyof typeof FIREBASE_VIDEO_URLS) => {
  return FIREBASE_VIDEO_URLS[category] || [];
};