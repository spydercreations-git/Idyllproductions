
import React from 'react';
import { Play, Film, Calendar, Star } from 'lucide-react';

const FilmsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen relative" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
      backgroundSize: '120px 120px'
    }}>
      {/* Fade overlay for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      <section className="pt-40 pb-32 px-6 md:px-12 relative z-10 animate-page-slide-in">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8">
              Our Films
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cinematic storytelling that captivates audiences and brings visions to life through the art of filmmaking.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Side - Coming Soon Card */}
            <div className="relative">
              <div className="aspect-[4/3] bg-slate-800 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="text-center relative z-10 text-white">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <Film className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">First Short Film</h2>
                  <p className="text-white/80 mb-6">In Production</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                    <Calendar className="w-4 h-4" />
                    <span>Release Date: TBA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-slate-900">What to Expect</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Our debut short film represents a culmination of our expertise in visual storytelling, 
                  combining cinematic techniques with compelling narratives to create an unforgettable viewing experience.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-900">Production Quality</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Leveraging our experience in high-performance video editing and production, 
                  this film will showcase the same attention to detail and professional quality 
                  that our clients have come to expect.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Film className="w-6 h-6 text-purple-600" />
                  <h3 className="text-2xl font-bold text-slate-900">Stay Updated</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Follow our journey as we bring this project to life. 
                  We'll be sharing behind-the-scenes content and updates throughout the production process.
                </p>
              </div>
            </div>
          </div>

          {/* Future Projects Teaser */}
          <div className="text-center bg-slate-100 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">More Films Coming</h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              This is just the beginning. We have exciting plans for future film projects that will 
              continue to push the boundaries of visual storytelling and cinematic excellence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilmsPage;
