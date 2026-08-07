const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const path = require('path');

// Firebase config - you'll need to update this with your actual config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Mapping of your folders to Firebase paths
const folderMapping = {
  'short-form': 'videos/short-form',
  'saas-and-tech-videos': 'videos/saas-tech',
  'gaming-videos': 'videos/gaming',
  'intro': 'videos/hero',
  'other videos': 'videos/youtube-long-form'
};

async function uploadVideo(filePath, firebasePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const storageRef = ref(storage, `${firebasePath}/${fileName}`);
    
    console.log(`Uploading ${fileName} to ${firebasePath}...`);
    
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: 'video/mp4'
    });
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`✅ Uploaded: ${fileName}`);
    console.log(`📁 URL: ${downloadURL}\n`);
    
    return {
      fileName,
      url: downloadURL,
      path: firebasePath
    };
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error);
    return null;
  }
}

async function uploadAllVideos() {
  const compressedVideosPath = path.join(__dirname, '..', 'compressed-videos');
  const results = {
    'short-form': [],
    'saas-tech': [],
    'gaming': [],
    'hero': [],
    'youtube-long-form': []
  };
  
  console.log('🚀 Starting batch video upload to Firebase...\n');
  
  for (const [localFolder, firebasePath] of Object.entries(folderMapping)) {
    const folderPath = path.join(compressedVideosPath, localFolder);
    
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  Folder not found: ${localFolder}`);
      continue;
    }
    
    const files = fs.readdirSync(folderPath).filter(file => 
      file.toLowerCase().endsWith('.mp4')
    );
    
    console.log(`📂 Processing folder: ${localFolder} (${files.length} videos)`);
    
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const result = await uploadVideo(filePath, firebasePath);
      
      if (result) {
        const category = firebasePath.split('/')[1]; // Extract category from path
        if (results[category]) {
          results[category].push(result.url);
        }
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('🎉 Upload complete! Generating URL constants...\n');
  
  // Generate the constants file
  const constantsContent = `// Auto-generated Firebase video URLs
export const FIREBASE_VIDEO_URLS = ${JSON.stringify(results, null, 2)};

// Hero video URL
export const HERO_VIDEO_URL = "${results.hero[0] || 'https://placeholder-url.com/hero.mp4'}";

// Export for easy access
export const getVideosForCategory = (category: keyof typeof FIREBASE_VIDEO_URLS) => {
  return FIREBASE_VIDEO_URLS[category] || [];
};`;

  fs.writeFileSync(
    path.join(__dirname, '..', 'constants', 'firebaseVideoUrls.ts'),
    constantsContent
  );
  
  console.log('✅ Generated constants/firebaseVideoUrls.ts');
  console.log('🔗 Video URLs ready for use in your website!');
  
  return results;
}

// Run the upload
uploadAllVideos().catch(console.error);