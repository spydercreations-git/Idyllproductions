import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';

const UGCPage: React.FC = () => {
  const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({});
  const [loadingVideos, setLoadingVideos] = useState<{ [key: number]: boolean }>({});

  const toggleVideoMute = (videoIndex: number) => {
    const videoElement = document.querySelector(`[data-ugc-video-index="${videoIndex}"]`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setVideoMuted(prev => ({
        ...prev,
        [videoIndex]: videoElement.muted
      }));
    }
  };

  const handleVideoLoadStart = (index: number) => {
    setLoadingVideos(prev => ({ ...prev, [index]: true }));
  };

  const handleVideoCanPlay = (index: number) => {
    setLoadingVideos(prev => ({ ...prev, [index]: false }));
  };

  // UGC Videos
  const ugcVideos = [
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445393/1_xa7dyf.mp4',
      views: '1.2M',
      likes: '89K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445382/3_wxpev1.mp4',
      views: '2.4M',
      likes: '156K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445398/5_i80unn.mp4',
      views: '987K',
      likes: '72K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445396/7_h2sknt.mp4',
      views: '1.8M',
      likes: '134K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445395/2_jauouv.mp4',
      views: '1.5M',
      likes: '98K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445388/6_sxq5fz.mp4',
      views: '2.1M',
      likes: '145K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445387/8_tis7ey.mp4',
      views: '3.2M',
      likes: '201K'
    },
    {
      video: 'https://res.cloudinary.com/dp8h3of4r/video/upload/v1771445382/4_zoabu6.mp4',
      views: '2.8M',
      likes: '178K'
    }
  ];

  // How We Deliver Steps
  const deliverySteps = [
    {
      step: 1,
      title: "Share the Reference",
      desc: "Send us examples of the style and format you want for your UGC content.",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      step: 2,
      title: "Share the Raw Files",
      desc: "Upload your raw footage to our secure cloud storage or shared drive.",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      step: 3,
      title: "Share the Deadline",
      desc: "Let us know your timeline and we'll prioritize your project accordingly.",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      step: 4,
      title: "Videos Organized in Notion",
      desc: "Your video links are arranged in a Notion workspace for easy tracking and collaboration.",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      step: 5,
      title: "Editor Starts Editing",
      desc: "Our expert editors begin crafting your content with precision and creativity.",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      step: 6,
      title: "Delivered & Notified",
      desc: "You'll be notified via Notion when each video is ready. Download and make it viral!",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Title & Description */}
          <div className="text-center mb-16">
            <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              UGC Content Editing
            </h1>
            <p className="font-inter text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Transform your raw UGC footage into scroll-stopping content that drives engagement and conversions. 
              Our expert team specializes in creating authentic, high-performing user-generated content that resonates with your audience.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm sm:text-base text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>100+ Videos/Day</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>Platform Optimized</span>
              </div>
            </div>
          </div>

          {/* UGC Videos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {ugcVideos.map((item, index) => (
              <div 
                key={index}
                className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* Loading Animation */}
                {loadingVideos[index] && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}

                <video
                  data-ugc-video-index={index}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={videoMuted[index] !== false}
                  playsInline
                  preload="metadata"
                  onLoadStart={() => handleVideoLoadStart(index)}
                  onCanPlay={() => handleVideoCanPlay(index)}
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* Stats Overlay */}
                <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-semibold">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </div>
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-semibold">
                    <Heart className="w-3 h-3" />
                    {item.likes}
                  </div>
                </div>

                {/* Mute Button */}
                <button
                  onClick={() => toggleVideoMute(index)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                >
                  {videoMuted[index] === false ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Deliver Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              How We Deliver Your UGC Content
            </h2>
            <p className="font-inter text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process ensures fast, high-quality delivery every time
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {deliverySteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                  <h3 className="font-sf-pro text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="font-inter text-base text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UGCPage;
