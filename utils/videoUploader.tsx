import React, { useState } from 'react';
import { uploadVideo, batchUploadVideos, VIDEO_CATEGORIES } from './videoStorage';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface VideoFile {
  file: File;
  category: keyof typeof VIDEO_CATEGORIES;
  fileName: string;
}

const VideoUploader: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<VideoFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<any[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const videoFiles: VideoFile[] = files.map(file => ({
      file,
      category: 'Short-Form Content', // Default category
      fileName: file.name
    }));
    setSelectedFiles(prev => [...prev, ...videoFiles]);
  };

  const updateFileCategory = (index: number, category: keyof typeof VIDEO_CATEGORIES) => {
    setSelectedFiles(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, category } : item
      )
    );
  };

  const updateFileName = (index: number, fileName: string) => {
    setSelectedFiles(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, fileName } : item
      )
    );
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      const results = await batchUploadVideos(selectedFiles);
      setUploadResults(results);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Video Uploader</h2>
      
      {/* File Input */}
      <div className="mb-6">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">MP4, MOV, AVI (MAX. 100MB each)</p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept="video/*"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Selected Files ({selectedFiles.length})</h3>
          <div className="space-y-4">
            {selectedFiles.map((videoFile, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    value={videoFile.fileName}
                    onChange={(e) => updateFileName(index, e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="File name"
                  />
                </div>
                <div className="flex-1">
                  <select
                    value={videoFile.category}
                    onChange={(e) => updateFileCategory(index, e.target.value as keyof typeof VIDEO_CATEGORIES)}
                    className="w-full p-2 border rounded"
                  >
                    {Object.keys(VIDEO_CATEGORIES).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload {selectedFiles.length} Video{selectedFiles.length > 1 ? 's' : ''}
            </>
          )}
        </button>
      )}

      {/* Upload Results */}
      {uploadResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Upload Results</h3>
          <div className="space-y-2">
            {uploadResults.map((result, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded">
                {result.error ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                <span className="flex-1">{result.fileName}</span>
                {result.error ? (
                  <span className="text-red-500 text-sm">{result.error}</span>
                ) : (
                  <span className="text-green-500 text-sm">Uploaded successfully</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;