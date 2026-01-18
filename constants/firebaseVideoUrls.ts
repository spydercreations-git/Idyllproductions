// Cloudinary video URLs - Optimized for fast loading and mobile
export const FIREBASE_VIDEO_URLS = {
  "short-form": [
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750310/Ad_1_ahbw0h.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750322/Ad_2_zo3me4.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750320/Ad_3_tkfp5f.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750326/Ad_4_el6fgj.mp4"
  ],
  "saas-tech": [
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750334/Doks_Ai_Fiinal_iwuzvv.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750333/Final_Thoka_Thoki_kefupk.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750335/Shapes_flet7d.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750333/Waves_Final_kdxxpz.mp4"
  ],
  "gaming": [
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750337/1_G_pvafu1.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750337/2_o5btbp.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750339/3_G_fvet0k.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750341/4_kwlmnp.mp4"
  ],
  "hero": [
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750338/main_white_rqzryb.mp4"
  ],
  "youtube-long-form": [
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750353/empty_ypvbbi.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750353/empty_ypvbbi.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750353/empty_ypvbbi.mp4",
    "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750353/empty_ypvbbi.mp4"
  ]
};

// Hero video URL
export const HERO_VIDEO_URL = FIREBASE_VIDEO_URLS.hero[0];

// Helper function to get videos for a category
export const getVideosForCategory = (category: keyof typeof FIREBASE_VIDEO_URLS) => {
  return FIREBASE_VIDEO_URLS[category] || [];
};