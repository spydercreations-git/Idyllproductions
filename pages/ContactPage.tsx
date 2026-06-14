import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Check, Sparkles, ArrowLeft, Instagram, Twitter, MessageCircle, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'Short-form content',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on submit
  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [isSubmitted]);

  // Initialize Cal.com inline widget
  useEffect(() => {
    const cal = (window as any).Cal;
    if (cal) {
      cal("init", "quick-meet", { origin: "https://app.cal.com" });
      cal.ns["quick-meet"]("inline", {
        elementOrSelector: "#my-cal-inline-quick-meet",
        config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
        calLink: "harsh-pawar-vtrl47/quick-meet",
      });
      cal.ns["quick-meet"]("ui", {
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#FF6B35" },
          "dark": { "cal-brand": "#ffffff" }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    }
  }, []);

  const sendEmails = async () => {
    const formattedDate = new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const contactLink = `${window.location.origin}/#contact-us`;

    // Admin Email HTML Layout
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">New Contact Form Submission</h2>
        <p>A new message has been submitted from the Contact page:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 40%;">First Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.firstName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Last Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email Address:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Project Type:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.projectType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; vertical-align: top;">Message:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${formData.message}</td>
          </tr>
        </table>
      </div>
    `;

    // Client Confirmation HTML Layout matching UGC client email layout perfectly
    const clientHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; background-color: #ffffff;">
        <!-- Header -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="vertical-align: middle;">
              <span style="font-size: 26px; font-weight: bold; color: #000000; letter-spacing: -0.5px;">Idyll<sup style="font-size: 16px; margin-left: 2px; color: #000000;">↗</sup></span>
            </td>
            <td style="text-align: right; vertical-align: middle; color: #888888; font-size: 14px;">
              ${formattedDate}
            </td>
          </tr>
        </table>

        <hr style="border: 0; border-top: 1px solid #EAEAEA; margin-bottom: 30px;" />

        <!-- Title Section with Left Orange Border -->
        <div style="border-left: 4px solid #FF6B35; padding-left: 16px; margin-bottom: 30px;">
          <h1 style="font-size: 24px; font-weight: bold; color: #111111; margin: 0; line-height: 1.2;">Thank you! We have received your project information.</h1>
        </div>

        <!-- Body Text -->
        <div style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          <p style="margin-top: 0; margin-bottom: 20px;">Thank you! We have received your project information.</p>
          <p style="margin-bottom: 20px;">Our team will review the details and contact you shortly.</p>
          <p style="margin-bottom: 20px;">This is an automated message. Please do not reply to this message. If you would like to speak with us directly, please click the "Contact Us" button below.</p>
          <p style="margin-bottom: 0; color: #555555;">— Idyll Productions</p>
        </div>

        <!-- Contact Us Button -->
        <div style="margin-bottom: 40px;">
          <a href="${contactLink}" style="background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 4px; display: inline-block; letter-spacing: 0.5px; text-transform: uppercase;">CONTACT US</a>
        </div>

        <!-- Footer Box -->
        <table style="width: 100%; border-collapse: collapse; background-color: #FFF2EE; border-top: 3px solid #FF6B35; border-radius: 4px; padding: 16px 20px;">
          <tr>
            <td style="padding: 16px 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle; width: 30px; padding: 0;">
                    <span style="display: inline-block; width: 18px; height: 18px; border-radius: 50%; background-color: #007AFF; color: #ffffff; text-align: center; line-height: 18px; font-size: 11px; font-weight: bold;">✓</span>
                  </td>
                  <td style="vertical-align: middle; color: #555555; font-size: 12px; line-height: 1.5; padding: 0;">
                    This email was generated by the Idyll Productions Workspace.<br />
                    <span style="color: #888888;">© 2026 Idyll Productions Email System. All rights reserved.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;

    const resendApiKey = 're_bm4pb9tA_DtRAqjSjs4UDfoqcnY7afuPG';
    const corsProxy = 'https://corsproxy.io/?';

    // 1. Notify Admin
    try {
      const response = await fetch(`${corsProxy}https://api.resend.com/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Idyll Productions <info@idyllproductions.work>',
          to: ['harshidyllproductions@gmail.com'],
          subject: 'New Contact Form Submission',
          html: adminHtml
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Contact Form Admin Email Error:', errText);
      }
    } catch (e) {
      console.error('Failed to notify admin on contact submission:', e);
    }

    // 2. Notify Client
    try {
      const response = await fetch(`${corsProxy}https://api.resend.com/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Idyll Productions <info@idyllproductions.work>',
          to: [formData.email],
          subject: 'Thank you! We have received your project information.',
          html: clientHtml
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Contact Form Client Email Error:', errText);
      }
    } catch (e) {
      console.error('Failed to notify client on contact submission:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    await sendEmails();
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen relative text-slate-800 flex items-center justify-center px-4 pt-32 pb-16" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Global dots pattern */}
        <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
          zIndex: 1,
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.12) 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
          maskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`
        }} />

        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xl text-center relative z-10">
          <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#FF6B35] stroke-[3]" />
          </div>
          <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mb-4">
            Thank You!
          </h2>
          <p className="font-inter text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
            We have received your information. Please check your email or preferred contact method where we will reach out to you very soon!
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-left text-xs space-y-2 text-slate-500">
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Name:</span> <span>{formData.firstName} {formData.lastName}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Email:</span> <span>{formData.email}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Project Type:</span> <span>{formData.projectType}</span></div>
          </div>
          <Link 
            to="/" 
            className="inline-flex w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-200 shadow-md items-center justify-center text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Global dots pattern */}
      <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.12) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`
      }} />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 border border-slate-200/60 rounded-full mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-gradient-to-r from-[#FF6B35] to-[#FF8C00]"></span>
            <span className="text-slate-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Let's Create Something{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C00] to-[#E8650A] text-transparent bg-clip-text">Amazing Together</span>
          </h1>
          <p className="font-inter text-base sm:text-lg text-slate-500 leading-relaxed px-4">
            Ready to elevate your content? Drop us a message or schedule an onboarding strategy call directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">1</span>
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      First Name <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Last Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Project Type
                  </label>
                  <select
                    id="project"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm font-medium text-slate-800 bg-white"
                  >
                    <option>Short-form content</option>
                    <option>SaaS & Tech videos</option>
                    <option>Gaming content</option>
                    <option>YouTube long-form</option>
                    <option>UGC Campaign</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Tell Us About Your Project <span className="text-[#FF6B35]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm resize-none"
                    placeholder="Describe your project, goals, editing style, and timeline..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Email and Social Platform Links */}
            <div className="pt-6 mt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                <a href="mailto:idyllproductionsoffical@gmail.com" className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#FF6B35] transition-colors">
                  idyllproductionsoffical@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/idyllproductionsofficial/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#FF6B35]/10 text-slate-400 hover:text-[#FF6B35] transition-all flex items-center justify-center border border-slate-100 shadow-sm" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://x.com/madebyidyll" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#FF6B35]/10 text-slate-400 hover:text-[#FF6B35] transition-all flex items-center justify-center border border-slate-100 shadow-sm" title="Twitter/X">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://discord.com/users/1466675809568817246" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#FF6B35]/10 text-slate-400 hover:text-[#FF6B35] transition-all flex items-center justify-center border border-slate-100 shadow-sm" title="Discord">
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#FF6B35]/10 text-slate-400 hover:text-[#FF6B35] transition-all flex items-center justify-center border border-slate-100 shadow-sm" title="WhatsApp">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Cal.com Booking Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl flex flex-col justify-between h-full min-h-[600px]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">2</span>
                Book a Strategy Call
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
                Prefer a direct conversation? Select a time that works for you to book a discovery session with our team.
              </p>
            </div>
            <div className="flex-grow w-full rounded-2xl overflow-hidden border border-slate-100 min-h-[450px]">
              <div style={{ width: "100%", height: "100%", overflow: "scroll" }} id="my-cal-inline-quick-meet"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;