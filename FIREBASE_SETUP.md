# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `idyll-productions-videos`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Storage

1. In your Firebase project, go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode" (we'll configure security later)
4. Select a location (choose closest to your users)
5. Click "Done"

## Step 3: Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (`</>`)
4. Register app name: `idyll-productions-website`
5. Copy the config object

## Step 4: Update Environment Variables

Replace the values in `.env.local` with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
```

## Step 5: Configure Storage Rules

In Firebase Console > Storage > Rules, replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all videos
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only allow uploads through admin
    }
  }
}
```

## Step 6: Organize Your Storage

Create this folder structure in Firebase Storage:

```
videos/
├── short-form/
├── saas-tech/
├── gaming/
└── youtube-long-form/
```

## Step 7: Upload Videos

Use the VideoUploader component or upload manually:

1. Go to Firebase Console > Storage
2. Create folders as shown above
3. Upload your compressed videos to appropriate folders

## Video Compression Tips

For optimal performance, compress videos to:
- **Resolution**: 1080p max (720p for mobile-first content)
- **Bitrate**: 2-5 Mbps for 1080p, 1-2 Mbps for 720p
- **Format**: MP4 (H.264 codec)
- **File size**: Under 10MB per video

## Security Notes

- Storage rules allow public read access for videos
- Write access is disabled for security
- Upload videos through Firebase Console or admin tools only