// ─── Bunny.net Stream — HLS playlist URLs ────────────────────────────────────
// CDN base: https://vz-caf49a9b-97a.b-cdn.net/<videoId>/playlist.m3u8

const CDN = 'https://vz-caf49a9b-97a.b-cdn.net';

const hls = (id: string) => `${CDN}/${id}/playlist.m3u8`;

export const HERO_VIDEO = hls('71b0d8a0-c6ea-46ee-944b-f3b5382f1ec7');

// UGC ads gallery (home page + UGC page)
export const UGC_VIDEOS = [
  { video: hls('5aaede28-9e55-4440-9310-5ad64dcf9513'), views: '1.2M', likes: '89K' },
  { video: hls('0a24b72a-48c5-4ce6-8dd9-9cc36bc5d63f'), views: '2.4M', likes: '156K' },
  { video: hls('7f0756f8-94b3-4f82-8985-b777838be797'), views: '987K',  likes: '72K' },
  { video: hls('8da697b2-c9d3-4d44-815c-32f5635bbada'), views: '1.8M', likes: '134K' },
  { video: hls('4ea1225e-169b-423c-b818-b3788746955f'), views: '1.5M', likes: '98K' },
  { video: hls('29919170-b150-4185-b0e0-cf5d48ef232c'), views: '2.1M', likes: '145K' },
  { video: hls('96e54a2a-b6fb-4a32-aac7-0a65db5b3fc0'), views: '3.2M', likes: '201K' },
];

// Editing category showcase videos
const BUNNY_VIDEOS = {
  'Short-Form Content': [
    hls('5c721b3b-4d78-408b-95bf-6571d420ca75'),
    hls('6373df8f-4d2f-4a3d-8f42-fb2da451da0e'),
    hls('34d1bbfb-f449-48dc-9844-fdac659fc26a'),
    hls('91c02dd8-8501-477a-bc5d-44b695028208'),
    hls('36a6eb71-0aae-4351-9085-3dd119d721ca'),
    hls('2d307875-017f-4ea6-b108-315be365d746'),
  ],
  'Long-Form': [
    hls('ee98b365-7d03-4a3a-a64b-b1c49e496f78'),
    hls('f8fd3d0e-27aa-4391-9eb6-1b80846c99a1'),
    hls('e1e2529d-6583-4207-b34c-1cbfc12d04c2'),
    hls('04d77914-e950-4c92-8c31-50ea79c80830'),
    hls('8e8d2b70-9c89-4f81-a9b2-701d856ac488'),
    hls('ba385e0a-023d-4bd5-803b-5eef2bcf0ce6'),
  ],
  'SaaS & Tech Videos': [
    hls('c1a9fd3c-b80c-4c25-9b1f-c99c74040be8'),
    hls('ac2f0a0a-2aee-4b2d-8805-587ab3fc9692'),
    hls('b240ed13-666d-4e39-934e-32e3f98c570e'),
    hls('e782d3d8-cb75-4261-9dea-5c4524e1cb86'),
    hls('12f83a43-eafe-4e43-b3e3-d72bc8cdafbb'),
    hls('88aefcf2-8e11-4c1e-ad55-94e332c8ff0f'),
  ],
  'Gaming Content': [
    hls('f0e1c69b-8758-495f-9ca0-c0324eb9f43f'),
    hls('1c1eb4e3-0118-437e-9e10-82971aa2021f'),
    hls('06c94a42-4027-46d5-80a5-160910d6e036'),
    hls('ed13e68d-59f8-44a5-bcad-85d05fba4755'),
    hls('c40084a7-0fad-4209-995f-2e9031408e02'),
  ],
  'Rhythmic Montage': [
    hls('189128cc-d897-4e78-b093-ca2d54daf4ec'),
    hls('13cb07e3-9114-4907-8f52-dbbb3bf6541a'),
    hls('c1d371b9-00d4-4bd1-9d4a-9199794f656a'),
    hls('6418e170-ef53-4ce5-abfd-876f5d0a87dc'),
  ],
};

export const getVideosForCategory = (categoryName: string): string[] =>
  BUNNY_VIDEOS[categoryName as keyof typeof BUNNY_VIDEOS] ?? [];

// Legacy exports kept for any remaining imports
export const USE_FIREBASE = false;
export const FIREBASE_VIDEOS = BUNNY_VIDEOS;
export const CLOUDINARY_VIDEOS = BUNNY_VIDEOS;
