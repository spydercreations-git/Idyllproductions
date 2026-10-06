import React, { useEffect } from 'react';
import X from 'lucide-react/dist/esm/icons/x';
import Users from 'lucide-react/dist/esm/icons/users';
import Film from 'lucide-react/dist/esm/icons/film';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';

interface BrandCollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandCollaborationModal: React.FC<BrandCollaborationModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 md:bg-slate-950/60 md:backdrop-blur-sm transition-all duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative text-left overflow-hidden transition-all duration-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Minimal Header */}
        <div className="mb-4 pr-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF8156] block mb-1">
            Transparency & Process
          </span>
          <h3 className="font-sf-pro text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            How We Work With Brands & Creators
          </h3>
        </div>

        {/* Full Explanation */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-inter">
          <p>
            In modern video production and the creator economy, large enterprise brands rarely manage post-production directly in-house. Instead, campaigns are produced through <strong className="text-slate-900">independent creators, UGC talents, and specialized creative agencies</strong>.
          </p>

          {/* Minimal Structured Points with Brand Orange Accents */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-[#FF8156]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#FF8156]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">
                <strong className="text-slate-900">Direct Creator Collaborations:</strong> We work directly with the content creators, talents, and agency teams who feature or partner with these brands in their videos.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-[#FF8156]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#FF8156]">
                <Film className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">
                <strong className="text-slate-900">Hands-On Post-Production:</strong> We craft the storytelling, pacing, motion design, and high-retention hooks behind these commercial campaigns.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-[#FF8156]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#FF8156]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">
                <strong className="text-slate-900">Featured Work & Attribution:</strong> The brands shown represent companies featured in or sponsoring the projects edited by our studio.
              </p>
            </div>
          </div>

          {/* Clean Subtle Footer Note */}
          <p className="text-slate-600 text-xs italic bg-slate-50/70 p-3 rounded-lg border border-slate-100">
            We believe in 100% honesty. Whether we partner directly with a brand team or empower the creators who represent them, our editing quality meets global industry standards.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-[#FF8156] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCollaborationModal;
