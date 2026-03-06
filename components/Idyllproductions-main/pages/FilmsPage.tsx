
import React from 'react';
import { Play, Film, Calendar, Star, Sparkles, Video } from 'lucide-react';

const FilmsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Organic dot pattern matching home page */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        maskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        WebkitMaskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        maskComposite: 'add',
        WebkitMaskComposite: 'source-over'
      }} />
      
      <section className="pt-40 pb-32 px-6 md:px-12 relative z-10 animate-page-slide-in">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="font-sf-pro text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-8">
              Our Films
            </h1>
            <p className="font-inter text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cinematic storytelling that captivates audiences and brings visions to life through the art of filmmaking.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Left Side - Coming Soon Card */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-blue-200">
                <div className="text-center relative z-10 p-8">
                  <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Film className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="font-sf-pro text-3xl font-semibold mb-4 text-slate-900">First Short Film</h2>
                  <p className="font-inter text-slate-600 mb-6 text-lg">In Production</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>Release Date: TBA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Star className="w-5 h-5" />
                  </div>
                  <h3 className="font-sf-pro text-xl font-semibold text-slate-900">What to Expect</h3>
                </div>
                <p className="font-inter text-slate-600 leading-relaxed">
                  Our debut short film represents a culmination of our expertise in visual storytelling, 
                  combining cinematic techniques with compelling narratives to create an unforgettable viewing experience.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="font-sf-pro text-xl font-semibold text-slate-900">Production Quality</h3>
                </div>
                <p className="font-inter text-slate-600 leading-relaxed">
                  Leveraging our experience in high-performance video editing and production, 
                  this film will showcase the same attention to detail and professional quality 
                  that our clients have come to expect.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-sf-pro text-xl font-semibold text-slate-900">Stay Updated</h3>
                </div>
                <p className="font-inter text-slate-600 leading-relaxed">
                  Follow our journey as we bring this project to life. 
                  We'll be sharing behind-the-scenes content and updates throughout the production process.
                </p>
              </div>
            </div>
          </div>

          {/* Future Projects Teaser */}
          <div className="text-center bg-blue-50 rounded-2xl p-12 border border-blue-100">
            <h2 className="font-sf-pro text-3xl font-semibold text-slate-900 mb-4">More Films Coming</h2>
            <p className="font-inter text-slate-600 max-w-2xl mx-auto leading-relaxed">
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
