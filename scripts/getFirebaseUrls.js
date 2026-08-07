// Simple script to help generate Firebase URLs
// Run this after uploading videos to Firebase Storage

const generateFirebaseUrl = (projectId, filePath) => {
  // Convert file path to Firebase Storage URL format
  const encodedPath = encodeURIComponent(filePath);
  return `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodedPath}?alt=media`;
};

// Your video file paths (update PROJECT_ID with your actual Firebase project ID)
const PROJECT_ID = "YOUR_PROJECT_ID"; // Replace with your Firebase project ID

const videoPaths = {
  "short-form": [
    "videos/short-form/Ad 1.mp4",
    "videos/short-form/Ad 2.mp4", 
    "videos/short-form/Ad 3.mp4",
    "videos/short-form/Ad 4.mp4"
  ],
  "saas-tech": [
    "videos/saas-tech/Doks Ai Fiinal.mp4",
    "videos/saas-tech/Final Thoka Thoki.mp4",
    "videos/saas-tech/Shapes.mp4",
    "videos/saas-tech/Waves Final.mp4"
  ],
  "gaming": [
    "videos/gaming/1 G.mp4",
    "videos/gaming/2.mp4",
    "videos/gaming/3 G.mp4",
    "videos/gaming/4.mp4"
  ],
  "hero": [
    "videos/hero/main white.mp4"
  ],
  "youtube-long-form": [
    "videos/saas-tech/Doks Ai Fiinal.mp4",
    "videos/saas-tech/Final Thoka Thoki.mp4",
    "videos/saas-tech/Shapes.mp4",
    "videos/saas-tech/Waves Final.mp4"
  ]
};

console.log("🔗 Generated Firebase URLs:\n");

const firebaseUrls = {};

Object.entries(videoPaths).forEach(([category, paths]) => {
  console.log(`📁 ${category.toUpperCase()}:`);
  firebaseUrls[category] = paths.map(path => {
    const url = generateFirebaseUrl(PROJECT_ID, path);
    console.log(`   ${url}`);
    return url;
  });
  console.log("");
});

console.log("📋 Copy this to constants/firebaseVideoUrls.ts:\n");
console.log(`export const FIREBASE_VIDEO_URLS = ${JSON.stringify(firebaseUrls, null, 2)};`);
console.log(`\nexport const HERO_VIDEO_URL = "${firebaseUrls.hero[0]}";`);

// Instructions
console.log("\n📝 Instructions:");
console.log("1. Replace PROJECT_ID with your actual Firebase project ID");
console.log("2. Upload videos to Firebase Storage with the exact paths shown above");
console.log("3. Copy the generated URLs to constants/firebaseVideoUrls.ts");
console.log("4. Your website will automatically use the Firebase videos!");