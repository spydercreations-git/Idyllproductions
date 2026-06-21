import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, Send, User, MapPin, Briefcase, HelpCircle, FileText, Phone, ArrowLeft } from 'lucide-react';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  country: string;
  location: string;
  whatYouDo: string;
  howYouKnow: string;
  workPreference: string;
  experience: string;
}

const ApplyEditorPage: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    country: '',
    location: '',
    whatYouDo: '',
    howYouKnow: '',
    workPreference: 'Freelance',
    experience: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Computed age number for validation
  const ageNum = formData.age ? parseInt(formData.age, 10) : null;
  const isTooYoung = ageNum !== null && ageNum < 15;
  const isYoungAdult = ageNum !== null && ageNum >= 15 && ageNum < 18;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmails = async () => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">New Work Application</h2>
        <p>A new candidate has submitted an application to work at Idyll Productions:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 40%;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Age:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.age}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Gender:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.gender}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Country:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.country}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Lives in:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.location}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Role Wanted:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.whatYouDo}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">How they found Idyll:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.howYouKnow}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Hiring Preference:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.workPreference}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; vertical-align: top;">Experience:</td><td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${formData.experience}</td></tr>
        </table>
      </div>
    `;

    const applicantHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="vertical-align: middle;"><span style="font-size: 26px; font-weight: bold; color: #000000; letter-spacing: -0.5px;">Idyll<sup style="font-size: 16px; margin-left: 2px; color: #000000;">↗</sup></span></td>
            <td style="text-align: right; vertical-align: middle; color: #888888; font-size: 14px;">${formattedDate}</td>
          </tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #EAEAEA; margin-bottom: 30px;" />
        <div style="border-left: 4px solid #FF6B35; padding-left: 16px; margin-bottom: 30px;">
          <h1 style="font-size: 24px; font-weight: bold; color: #111111; margin: 0; line-height: 1.2;">Application Received</h1>
        </div>
        <div style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 40px;">
          <p style="margin-top: 0; margin-bottom: 20px;">Hi ${formData.name},</p>
          <p style="margin-bottom: 20px;">Thank you for applying to work at Idyll Productions!</p>
          <p style="margin-bottom: 20px; font-weight: 500; color: #111111;">We will review your info and contact you if we need you.</p>
          <p style="margin-bottom: 20px;">If we find a match between your background and our active roles, we will reach out directly to set up an interview.</p>
          <p style="margin-bottom: 0; color: #555555;">Best regards,<br />Idyll Productions Team</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; background-color: #FFF2EE; border-top: 3px solid #FF6B35; padding: 16px 20px;">
          <tr>
            <td style="padding: 16px 20px;">
              <span style="color: #555555; font-size: 12px;">This email was generated by the Idyll Productions Work With Us Portal.<br />
              <span style="color: #888888;">© 2026 Idyll Productions. All rights reserved.</span></span>
            </td>
          </tr>
        </table>
      </div>
    `;

    const resendApiKey = 're_9a2M5VBk_KLPxPp5T2K5wvzE9dBKnwiDT';

    try {
      const r1 = await fetch('/api/resend/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'Idyll Productions <info@idyllproductions.work>', to: ['harshidyllproductions@gmail.com'], subject: `New Work Application: ${formData.name}`, html: adminHtml })
      });
      if (!r1.ok) console.error('Admin email error:', await r1.text());
    } catch (e) { console.error('Failed to send admin email:', e); }

    try {
      const r2 = await fetch('/api/resend/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'Idyll Productions <info@idyllproductions.work>', to: [formData.email], subject: 'Thank you for your application — Idyll Productions', html: applicantHtml })
      });
      if (!r2.ok) console.error('Applicant email error:', await r2.text());
    } catch (e) { console.error('Failed to send applicant email:', e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.age || !formData.experience) {
      alert('Please fill in all required fields.');
      return;
    }
    if (isTooYoung) {
      alert('Sorry, you must be at least 15 years old to apply.');
      return;
    }
    setIsSubmitting(true);
    await sendEmails();
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Thank-you screen ──
  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen relative text-slate-800 flex items-center justify-center px-4 pt-32 pb-16" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
          zIndex: 1,
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.10) 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
          maskImage: `linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)`
        }} />
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xl text-center relative z-10">
          <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#FF6B35] stroke-[3]" />
          </div>
          <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mb-4">Thank You!</h2>
          <p className="font-inter text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
            We have received your application. We will review your info and contact you if we need you. Thanks!
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-left text-xs space-y-2 text-slate-500">
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Name:</span><span>{formData.name}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Email:</span><span>{formData.email}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Preference:</span><span>{formData.workPreference}</span></div>
          </div>
          <Link to="/" className="inline-flex w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-200 shadow-md items-center justify-center text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Main form ──
  return (
    <div className="bg-white min-h-screen relative text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Dot pattern background */}
      <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.10) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: `linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)`
      }} />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">

        {/* Back to Home */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 group">
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 border border-slate-200/60 rounded-full mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-gradient-to-r from-[#FF6B35] to-[#FF8C00]"></span>
            <span className="text-slate-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Work at Idyll Productions
            </span>
          </div>
          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Work at{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C00] to-[#E8650A] text-transparent bg-clip-text">Idyll Productions</span>
          </h1>
          <p className="font-inter text-base sm:text-lg text-slate-500 leading-relaxed">
            Fill out the form below to showcase your background and experience. We'd love to learn more about you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">✦</span>
            Your Application
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Row 2: Phone + Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone Number <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Age <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="number" name="age" required min="1" max="99" value={formData.age} onChange={handleChange}
                  placeholder="Your age"
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-1 focus:outline-none transition-all duration-200 text-sm ${
                    isTooYoung
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-300 bg-red-50'
                      : isYoungAdult
                      ? 'border-amber-300 focus:border-amber-400 focus:ring-amber-300 bg-amber-50'
                      : 'border-slate-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]'
                  }`}
                />
                {/* Age banners — clean inline style matching site theme */}
                {isTooYoung && (
                  <div className="mt-2 px-3 py-2 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-xs text-red-700 leading-relaxed">
                      <span className="font-bold">Sorry, minimum age is 15.</span> We appreciate your interest — come back when you turn 15!
                    </p>
                  </div>
                )}
                {isYoungAdult && (
                  <div className="mt-2 px-3 py-2 bg-amber-50 border-l-4 border-[#FF6B35] rounded-r-lg">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <span className="font-bold">Ages 15–17:</span> You can join as <span className="font-semibold">Freelance / Contract</span> only. Proper hiring opens at 18.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Row 3: Gender + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
                <select
                  name="gender" value={formData.gender} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Country</label>
                <input
                  type="text" name="country" value={formData.country} onChange={handleChange}
                  placeholder="e.g. India, United States"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Row 4: Location + Role wanted */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Where do you live? (City / State)</label>
                <input
                  type="text" name="location" value={formData.location} onChange={handleChange}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  What do you want to be in Idyll Productions?
                </label>
                <input
                  type="text" name="whatYouDo" value={formData.whatYouDo} onChange={handleChange}
                  placeholder="e.g. Video Editor, Motion Artist, Thumbnail Designer"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Row 5: How you know + Work preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">How did you hear about Idyll Productions?</label>
                <input
                  type="text" name="howYouKnow" value={formData.howYouKnow} onChange={handleChange}
                  placeholder="e.g. Instagram, YouTube, Friend"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Work Preference <span className="text-[#FF6B35]">*</span>
                </label>
                <select
                  name="workPreference" required
                  value={isYoungAdult ? 'Freelance' : formData.workPreference}
                  onChange={handleChange}
                  disabled={isYoungAdult}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm ${
                    isYoungAdult ? 'bg-amber-50 border-amber-300 text-amber-800 cursor-not-allowed' : 'bg-white border-slate-200'
                  }`}
                >
                  <option value="Freelance">Freelance / Contract</option>
                  {!isYoungAdult && <option value="Proper Hiring">Proper Hiring (Full-Time / Part-Time)</option>}
                </select>
                {isYoungAdult && (
                  <p className="mt-1.5 text-xs text-amber-700">🔒 Locked to Freelance for ages 15–17.</p>
                )}
              </div>
            </div>

            {/* Row 6: Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Your Experience / Portfolio Links <span className="text-[#FF6B35]">*</span>
              </label>
              <textarea
                name="experience" required rows={5} value={formData.experience} onChange={handleChange}
                placeholder="Tell us about your background, software you use, links to your portfolio or recent edits..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isTooYoung}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyEditorPage;
