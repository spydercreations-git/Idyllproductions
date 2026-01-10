# Video Upload Guide

## Step 1: Complete Firebase Setup

1. Follow the `FIREBASE_SETUP.md` guide to create your Firebase project
2. Update your `.env.local` file with the Firebase configuration
3. Make sure Firebase Storage is enabled

## Step 2: Upload Videos Manually (Recommended)

Go to [Firebase Console](https://console.firebase.google.com/) > Your Project > Storage

Create this folder structure and upload your videos:

### 📁 videos/short-form/
Upload from: `compressed-videos/short-form/`
- Ad 1.mp4
- Ad 2.mp4  
- Ad 3.mp4
- Ad 4.mp4

### 📁 videos/saas-tech/
Upload from: `compressed-videos/saas-and-tech-videos/`
- Doks Ai Fiinal.mp4
- Final Thoka Thoki.mp4
- Shapes.mp4
- Waves Final.mp4

### 📁 videos/gaming/
Upload from: `compressed-videos/gaming-videos/`
- 1 G.mp4
- 2.mp4
- 3 G.mp4
- 4.mp4

### 📁 videos/hero/
Upload from: `compressed-videos/intro/`
- main white.mp4

### 📁 videos/youtube-long-form/
Upload from: `compressed-videos/other videos/`
- empty.mp4 (or use saas-tech videos as fallback)

## Step 3: Get Firebase URLs

After uploading, click on each video in Firebase Console and copy the "Download URL". 

## Step 4: Update Constants

I'll help you update the `constants/firebaseVideoUrls.ts` file with your actual Firebase URLs.

## Alternative: Automated Upload Script

If you prefer automation:

1. Complete Firebase setup first
2. Install dependencies: `npm install firebase-admin`
3. Run: `node scripts/uploadVideos.js`

But manual upload through Firebase Console is more reliable for first-time setup.