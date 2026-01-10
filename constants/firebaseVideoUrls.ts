// Firebase video URLs - Update these after uploading to Firebase
export const FIREBASE_VIDEO_URLS = {
  "short-form": [
    // Replace with your Firebase URLs after upload
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fshort-form%2FAd%201.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fshort-form%2FAd%202.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fshort-form%2FAd%203.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fshort-form%2FAd%204.mp4?alt=media"
  ],
  "saas-tech": [
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FDoks%20Ai%20Fiinal.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FFinal%20Thoka%20Thoki.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FShapes.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FWaves%20Final.mp4?alt=media"
  ],
  "gaming": [
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fgaming%2F1%20G.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fgaming%2F2.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fgaming%2F3%20G.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fgaming%2F4.mp4?alt=media"
  ],
  "hero": [
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fhero%2Fmain%20white.mp4?alt=media"
  ],
  "youtube-long-form": [
    // Using saas-tech videos as fallback for YouTube long-form
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FDoks%20Ai%20Fiinal.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FFinal%20Thoka%20Thoki.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FShapes.mp4?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsaas-tech%2FWaves%20Final.mp4?alt=media"
  ]
};

// Hero video URL
export const HERO_VIDEO_URL = FIREBASE_VIDEO_URLS.hero[0];

// Helper function to get videos for a category
export const getVideosForCategory = (category: keyof typeof FIREBASE_VIDEO_URLS) => {
  return FIREBASE_VIDEO_URLS[category] || [];
};