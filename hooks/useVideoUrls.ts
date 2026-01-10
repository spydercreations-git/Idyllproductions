import { useState, useEffect } from 'react';
import { getVideosForCategory, VIDEO_CATEGORIES } from '../utils/videoStorage';

interface VideoUrls {
  [key: string]: string[];
}

export const useVideoUrls = () => {
  const [videoUrls, setVideoUrls] = useState<VideoUrls>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        setLoading(true);
        const categories = Object.keys(VIDEO_CATEGORIES) as (keyof typeof VIDEO_CATEGORIES)[];
        
        const urlPromises = categories.map(async (category) => {
          const urls = await getVideosForCategory(category);
          return { category, urls };
        });

        const results = await Promise.all(urlPromises);
        
        const urlMap: VideoUrls = {};
        results.forEach(({ category, urls }) => {
          urlMap[category] = urls;
        });

        setVideoUrls(urlMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchAllVideos();
  }, []);

  const refreshVideos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categories = Object.keys(VIDEO_CATEGORIES) as (keyof typeof VIDEO_CATEGORIES)[];
      
      const urlPromises = categories.map(async (category) => {
        const urls = await getVideosForCategory(category);
        return { category, urls };
      });

      const results = await Promise.all(urlPromises);
      
      const urlMap: VideoUrls = {};
      results.forEach(({ category, urls }) => {
        urlMap[category] = urls;
      });

      setVideoUrls(urlMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh videos');
    } finally {
      setLoading(false);
    }
  };

  return {
    videoUrls,
    loading,
    error,
    refreshVideos
  };
};