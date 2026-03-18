
import React from 'react';
import { Service, ProcessStep, WorkCategory, Film } from './types';
import { Video, Zap, Gamepad2, Layers, Film as FilmIcon, Cpu, Edit3, Camera, Layout, Activity, Heart, ShieldCheck } from 'lucide-react';

export const BRAND_NAME = "Idyll Productions";

export const SERVICES: (Service & { icon: React.ReactNode; accent: string })[] = [
  {
    title: "SaaS & Product Animations",
    description: "Translating complex features into fluid, high-conversion visual narratives.",
    icon: <Zap className="w-6 h-6" />,
    accent: "text-blue-500"
  },
  {
    title: "Short-Form Social Content",
    description: "Vertical storytelling optimized for the split-second attention economy.",
    icon: <Video className="w-6 h-6" />,
    accent: "text-red-500"
  },
  {
    title: "Gaming & E-sports",
    description: "High-octane edits that capture the adrenaline of competitive play.",
    icon: <Gamepad2 className="w-6 h-6" />,
    accent: "text-green-500"
  }
];

export const TOOLKIT = [
  { name: "After Effects", description: "Motion Graphics", icon: <Zap className="w-5 h-5" />, color: "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200" },
  { name: "Premiere Pro", description: "Video Editing", icon: <Edit3 className="w-5 h-5" />, color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" },
  { name: "Cinema 4D", description: "3D Rendering", icon: <Cpu className="w-5 h-5" />, color: "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200" },
  { name: "DaVinci", description: "Color Grading", icon: <Camera className="w-5 h-5" />, color: "hover:bg-red-50 hover:text-red-600 hover:border-red-200" },
  { name: "Figma", description: "UI/UX Design", icon: <Layout className="w-5 h-5" />, color: "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200" }
];

export const PHILOSOPHY = [
  { title: "Precision", text: "We measure twice and cut once. Every keyframe is a deliberate choice.", icon: <Activity className="w-6 h-6" />, color: "text-blue-600" },
  { title: "Passion", text: "We treat every client project with the soul of an independent film.", icon: <Heart className="w-6 h-6" />, color: "text-red-600" },
  { title: "Quality", text: "Zero compromises. We build for the long-term visual identity of brands.", icon: <ShieldCheck className="w-6 h-6" />, color: "text-green-600" }
];

export const STATS = [
  { label: "Growth Rate", value: "+140%", color: "text-green-600" },
  { label: "Active Projects", value: "12", color: "text-blue-600" },
  { label: "Render Hours", value: "18k", color: "text-red-600" },
  { label: "Global Clients", value: "45", color: "text-gray-900" }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { title: "Direction", description: "Defining the visual North Star for the project." },
  { title: "Drafting", description: "Storyboarding and style-frames for alignment." },
  { title: "Execution", description: "The heavy lifting in our production suite." },
  { title: "Refining", description: "Iterative polishing until perfection is met." }
];

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    name: "SaaS Animations",
    format: "Product Showcases",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    previews: [
      "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41842-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-10515-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-white-graph-on-a-blue-background-15636-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-screen-with-code-flowing-16008-large.mp4"
    ]
  },
  {
    name: "Short-Form",
    format: "Vertical Content",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    previews: [
      "https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-happy-in-front-of-the-camera-42171-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-travel-video-vlog-style-beach-scenery-41951-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-for-the-camera-42111-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-influencer-recording-a-makeup-tutorial-42021-large.mp4"
    ]
  },
  {
    name: "Gaming Reels",
    format: "E-sports Trailers",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    previews: [
      "https://assets.mixkit.co/videos/preview/mixkit-high-speed-car-chase-in-a-video-game-41712-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-gamer-playing-with-an-intense-look-on-his-face-41702-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-character-animation-41732-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-sci-fi-video-game-environment-exploration-41722-large.mp4"
    ]
  },
  {
    name: "Cinema",
    format: "Original Films",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    previews: [
      "https://assets.mixkit.co/videos/preview/mixkit-cinematic-slow-motion-shot-of-a-woman-in-the-city-at-night-42284-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-colorful-ink-background-42221-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-macro-shot-of-a-burning-matchstick-42231-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-beautiful-landscape-at-sunset-with-golden-light-42261-large.mp4"
    ]
  }
];

export const FILMS: Film[] = [
  {
    title: "Echoes of Silence",
    category: "Released",
    description: "A haunting exploration of solitude in the digital age.",
    poster: "https://picsum.photos/seed/film1/600/900",
    year: "2023"
  },
  {
    title: "Neon Horizon",
    category: "Upcoming",
    description: "A fast-paced cybernetic journey through a forgotten city.",
    poster: "https://picsum.photos/seed/film2/600/900"
  },
  {
    title: "The Craft",
    category: "In Production",
    description: "Documenting the meticulous world of traditional artisans.",
    poster: "https://picsum.photos/seed/film3/600/900"
  }
];
