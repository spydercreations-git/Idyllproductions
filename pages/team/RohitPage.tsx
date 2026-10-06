import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const RohitPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Background radial grid */}
      <div 
        className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-24 relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to About
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8 pb-8 border-b border-slate-200">
            {/* Photo / Avatar Placeholder */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 text-white flex items-center justify-center font-extrabold text-4xl shadow-lg flex-shrink-0">
              RG
            </div>

            <div>
              <h1 className="font-sf-pro text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-2">
                Rohit, COO of Idyll Productions
              </h1>
              <p className="text-base font-semibold text-[#FF8156]">
                Chief Operating Officer
              </p>
            </div>
          </div>

          {/* Bio / Story */}
          <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
            <p>
              Rohit is the Chief Operating Officer of Idyll Productions. He oversees the studio's end-to-end production pipelines, editor allocations, quality control, and client delivery schedules.
            </p>
            <p>
              With an obsessive focus on operational efficiency and zero-friction client workflows, Rohit ensures our 24-hour turnaround commitments are met consistently across high-volume video campaigns.
            </p>
          </div>

          {/* Contact & Social Links */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Connect with Rohit</h3>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rohitidyllproductions@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-[#FF8156] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF8156]" />
                rohitidyllproductions@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF8156] text-white font-bold rounded-xl hover:bg-[#e87245] transition-all duration-300 shadow-md"
          >
            Contact Operations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RohitPage;
