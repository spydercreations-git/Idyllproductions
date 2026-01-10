import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase.config';

// Video categories mapping
export const VIDEO_CATEGORIES = {
  'Short-Form Content': 'short-form',
  'SaaS & Tech Videos': 'saas-tech',
  'Gaming Content': 'gaming',
  'YouTube Long-Form': 'youtube-long-form'
} as const;

// Upload a video file to Firebase Storage
export const uploadVideo = async (
  file: File, 
  category: keyof typeof VIDEO_CATEGORIES, 
  fileName: string
): Promise<string> => {
  try {
    const categoryPath = VIDEO_CATEGORIES[category];
    const videoRef = ref(storage, `videos/${categoryPath}/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(videoRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Get all video URLs for a category
export const getVideosForCategory = async (
  category: keyof typeof VIDEO_CATEGORIES
): Promise<string[]> => {
  try {
    const categoryPath = VIDEO_CATEGORIES[category];
    const videosRef = ref(storage, `videos/${categoryPath}`);
    
    // List all files in the category folder
    const result = await listAll(videosRef);
    
    // Get download URLs for all files
    const urls = await Promise.all(
      result.items.map(item => getDownloadURL(item))
    );
    
    return urls;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

// Get a specific video URL
export const getVideoURL = async (
  category: keyof typeof VIDEO_CATEGORIES,
  fileName: string
): Promise<string | null> => {
  try {
    const categoryPath = VIDEO_CATEGORIES[category];
    const videoRef = ref(storage, `videos/${categoryPath}/${fileName}`);
    
    const downloadURL = await getDownloadURL(videoRef);
    return downloadURL;
  } catch (error) {
    console.error('Error fetching video URL:', error);
    return null;
  }
};

// Batch upload multiple videos
export const batchUploadVideos = async (
  files: { file: File; category: keyof typeof VIDEO_CATEGORIES; fileName: string }[]
): Promise<{ fileName: string; url: string; error?: string }[]> => {
  const results = await Promise.allSettled(
    files.map(async ({ file, category, fileName }) => {
      const url = await uploadVideo(file, category, fileName);
      return { fileName, url };
    })
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        fileName: files[index].fileName,
        url: '',
        error: result.reason.message
      };
    }
  });
};