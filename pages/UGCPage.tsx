import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, Check, X, Calendar, Play, Sparkles, Shield, Zap } from 'lucide-react';
import { UGC_VIDEOS, getVideosForCategory } from '../constants/videoConfig';
import { HoverHlsVideo } from '../components/HlsVideo';

const UGCPage: React.FC = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation step calculations
  const step1 = tick % 4;
  const step2 = tick % 5;
  const progress1 = step2 === 0 ? 60 : (step2 >= 1 ? 100 : 0);
  const progress2 = step2 <= 0 ? 0 : (step2 === 1 ? 40 : (step2 >= 2 ? 100 : 0));
  const step3 = tick % 4;
  let playheadPos = "10%";
  if (step3 === 0) playheadPos = "15%";
  if (step3 === 1) playheadPos = "50%";
  if (step3 === 2) playheadPos = "75%";
  if (step3 === 3) playheadPos = "90%";
  const step4 = tick % 6;
  const isDone = step4 >= 3;

  // Display all UGC_VIDEOS dynamically
  const ugcVideos = UGC_VIDEOS;

  // Comparison metrics dataset for responsive table
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'Email',
    videoCount: 50,
    contentTypes: [] as string[],
    referenceLinks: '',
    additionalDetails: '',
    expectedBudget: '',
    isCustomPackage: false,
    customRevisions: '3 Revisions',
    customPricePerVideo: 30,
    customCaptions: true,
    customHook: true,
    customManager: true,
    customNotion: true,
    customPointOfContact: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [isSubmitted]);

  const calculateBudget = (quantity: number) => {
    if (formData.isCustomPackage) return quantity * (formData.customPricePerVideo || 0);
    if (quantity <= 50) return quantity * 30;
    if (quantity <= 100) return quantity * 35;
    return quantity * 25;
  };

  const getPackageName = () => {
    if (formData.isCustomPackage) return 'Custom Package (Make Your Own)';
    if (formData.videoCount <= 50) return '50 Videos / Month';
    if (formData.videoCount <= 100) return '51-100 Videos / Month';
    return '100+ Videos / Month';
  };

  const getCustomDetailsString = () => {
    if (!formData.isCustomPackage) return '';
    return `
Custom Specifications:
- Revisions: ${formData.customRevisions}
- Price Per Video: $${formData.customPricePerVideo}
- Captions: ${formData.customCaptions ? 'Yes' : 'No'}
- Hook Creation: ${formData.customHook ? 'Yes' : 'No'}
- Dedicated PM: ${formData.customManager ? 'Yes' : 'No'}
- Notion Project Board: ${formData.customNotion ? 'Yes' : 'No'}
- Single Point of Contact: ${formData.customPointOfContact ? 'Yes' : 'No'}`;
  };

  const sendEmails = async (isNegotiating: boolean = false) => {
    const calculatedBudget = calculateBudget(formData.videoCount);
    const packageName = getPackageName();
    const customSpecs = getCustomDetailsString();
    
    const formattedDate = new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const contactLink = `${window.location.origin}/#contact-us`;

    // Admin Notification HTML Layout
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">New UGC Lead Form Submission</h2>
        <p>A new lead form has been submitted with the following details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 40%;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email Address:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone Number:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone || 'Not Provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Preferred Contact Method:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.contactMethod}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Videos Per Month:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.videoCount}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Selected Package:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${packageName}</td>
          </tr>
          ${formData.isCustomPackage ? `
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; vertical-align: top;">Custom Specs:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">
              <ul style="margin: 0; padding-left: 20px;">
                <li>Revisions: ${formData.customRevisions}</li>
                <li>Price Per Video: $${formData.customPricePerVideo}</li>
                <li>Captions: ${formData.customCaptions ? 'Yes' : 'No'}</li>
                <li>Hook Creation: ${formData.customHook ? 'Yes' : 'No'}</li>
                <li>Dedicated PM: ${formData.customManager ? 'Yes' : 'No'}</li>
                <li>Notion Project Board: ${formData.customNotion ? 'Yes' : 'No'}</li>
              </ul>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Estimated Budget:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #FF6B35;">$${calculatedBudget.toLocaleString()}</td>
          </tr>
          ${isNegotiating && formData.expectedBudget ? `
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Expected Budget (Negotiated):</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.expectedBudget}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; vertical-align: top;">Reference Links:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${formData.referenceLinks || 'None'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; vertical-align: top;">Additional Details:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${formData.additionalDetails || 'None'}</td>
          </tr>
        </table>
      </div>
    `;

    // Client Confirmation HTML Layout matching the design mockup perfectly
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

    // 1. Send all details to admin email
    const resendApiKey = 're_bm4pb9tA_DtRAqjSjs4UDfoqcnY7afuPG';
    const corsProxy = 'https://corsproxy.io/?';

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
          subject: isNegotiating ? 'New Lead Form Submission (Negotiation)' : 'New Lead Form Submission',
          html: adminHtml
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Admin Email Notification Error:', errText);
        alert(`Admin Notification failed: ${errText}`);
      } else {
        console.log('Admin notification email sent successfully.');
      }
    } catch (e: any) {
      console.error('Failed to notify admin via Resend API:', e);
      alert(`Admin Email connection error: ${e.message}`);
    }

    // 2. Send message to client email
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
        console.error('Client Confirmation Email Error:', errText);
        // We log and show alert only for testing/debugging purposes.
        alert(`Client Email failed: ${errText}\n(Note: Sandbox mode only allows sending to verified domain/emails)`);
      } else {
        console.log('Client confirmation email sent successfully.');
      }
    } catch (e: any) {
      console.error('Failed to email client via Resend API:', e);
    }
  };

  const handleNegotiate = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in your Name and Email Address.");
      return;
    }
    
    setIsSubmitting(true);
    await sendEmails(true);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleProceed = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in your Name and Email Address.");
      return;
    }

    setIsSubmitting(true);
    await sendEmails(false);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Scroll to portfolio grid
  const scrollToGrid = () => {
    document.getElementById('ugc-portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Trigger native Cal.com booking modal
  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    const cal = (window as any).Cal;
    if (cal && cal.ns && cal.ns["quick-meet"]) {
      cal.ns["quick-meet"]("modal", {
        calLink: "harsh-pawar-vtrl47/quick-meet",
        config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" }
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen relative text-slate-800 flex items-center justify-center px-4 pt-32 pb-16" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Global dots pattern with top-to-bottom fade */}
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
            We have received your project details. Please check your email or preferred contact method where we will reach out to you very soon!
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-left text-xs space-y-2 text-slate-500">
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Name:</span> <span>{formData.name}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Email:</span> <span>{formData.email}</span></div>
            {formData.phone && <div className="flex justify-between"><span className="font-semibold text-slate-700">Phone:</span> <span>{formData.phone}</span></div>}
            <div className="flex justify-between"><span className="font-semibold text-slate-700">Contact Method:</span> <span>{formData.contactMethod}</span></div>
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
      
      {/* Global dots pattern with top-to-bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.12) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`
      }} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Back to Home Navigation */}
          <div className="flex justify-start mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 font-medium text-slate-600 hover:text-[#FF6B35] transition-all duration-300 hover:translate-x-[-4px]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Badge Above Title */}
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#FF6B35]/5 border border-[#FF6B35]/15 rounded-full mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF69B4)'
            }}></span>
            <span className="text-[#FF6B35] font-semibold text-xs sm:text-sm uppercase tracking-wider">
              UGC Performance Marketing
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8 max-w-4xl mx-auto">
            High-Performance UGC Video Ads That{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C00] to-[#E8650A] text-transparent bg-clip-text">Drive Millions</span>
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed px-4">
            We transform raw user-generated footage into scroll-stopping video ads. Done-for-you scripting, performance editing, and hook-testing to maximize your ad spend.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={handleBookCall}
              className="w-full sm:w-auto relative h-12 px-10 rounded-lg text-base font-semibold bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book a Strategy Call
            </button>
            <button
              onClick={scrollToGrid}
              className="w-full sm:w-auto relative h-12 px-10 rounded-lg text-base font-semibold bg-white text-slate-800 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-105 transform flex items-center justify-center"
            >
              View UGC Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO GALLERY GRID --- */}
      <section id="ugc-portfolio" className="py-16 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-[#FF6B35] font-semibold text-xs uppercase tracking-wider">UGC Gallery</span>
            </div>
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Our UGC Creative Grid
            </h2>
            <p className="font-inter text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Hover to watch muted previews. Turn sound on or click to inspect high-converting ad styles.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {ugcVideos.map((item, index) => (
              <div 
                key={index}
                className="relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-[2px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(241, 245, 249, 1) 0%, rgba(226, 232, 240, 1) 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(241, 245, 249, 1) 0%, rgba(226, 232, 240, 1) 100%)';
                }}
              >
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-black aspect-[9/16] relative">
                  
                  {/* Hover Plays Video */}
                  <HoverHlsVideo
                    src={item.video}
                    aspectClass="aspect-[9/16]"
                    className="w-full h-full"
                  />

                  {/* Pulsing Center Play Badge (fades out on hover) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0 bg-black/15 z-10">
                    <div className="w-12 h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center animate-pulse">
                      <Play className="w-5 h-5 text-slate-900 fill-current translate-x-[2px]" />
                    </div>
                  </div>

                  {/* Stats Badges Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-semibold">
                        <Eye className="w-3.5 h-3.5 text-[#FF6B35]" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-semibold">
                        <Heart className="w-3.5 h-3.5 text-[#FF6B35]" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- PROVEN PROCESS SECTION --- */}
      <section className="py-24 px-4 sm:px-6 md:px-8 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"></span>
              <span className="text-[#FF6B35] font-semibold text-xs uppercase tracking-wider">Proven Process</span>
            </div>
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Top-Notch UGC Video Ads In Just A Few Clicks
            </h2>
            <p className="font-inter text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Our streamlined editing pipeline guarantees fast, hassle-free UGC production and seamless delivery.
            </p>
          </div>

          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-4 right-6 font-sf-pro text-5xl font-extrabold bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-transparent bg-clip-text opacity-20">
                01
              </div>
              
              {/* Animated Visual Canvas - Submit Brief */}
              <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl mb-6 relative overflow-hidden flex items-center justify-around px-4">
                {/* Brief Document Form Mock */}
                <div className="flex flex-col gap-1.5 p-2 bg-white rounded-lg border border-slate-200/80 shadow-sm w-20 relative z-10">
                  <div className="w-8 h-1 bg-[#FF6B35] rounded-full" />
                  <div className="w-12 h-1 bg-slate-200 rounded-full" />
                  <div className="w-10 h-1 bg-slate-200 rounded-full" />
                </div>

                {/* Moving File */}
                <div 
                  className={`absolute z-20 flex items-center gap-1 p-1 bg-white border border-[#FF6B35]/30 rounded-md shadow-md transition-all duration-1000 ease-in-out
                    ${step1 === 0 ? 'opacity-0 scale-75 translate-x-[-30px] translate-y-[10px]' : ''}
                    ${step1 === 1 ? 'opacity-100 scale-100 translate-x-[0px] translate-y-[-10px]' : ''}
                    ${step1 === 2 ? 'opacity-0 scale-50 translate-x-[35px] translate-y-[0px]' : ''}
                    ${step1 === 3 ? 'opacity-0 scale-0' : ''}
                  `}
                >
                  <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-[8px] font-semibold text-slate-500">Brief.pdf</span>
                </div>

                {/* Drive Folder Mock */}
                <div className={`relative z-10 flex flex-col items-center justify-center transition-transform duration-300 ${step1 === 2 ? 'scale-110' : 'scale-100'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500
                    ${step1 === 2 || step1 === 3 ? 'bg-emerald-50 text-emerald-500 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}
                  `}>
                    {step1 === 2 || step1 === 3 ? (
                      <Check className="w-5 h-5 animate-bounce" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-[8px] font-bold mt-1 tracking-wider ${step1 === 2 || step1 === 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {step1 === 2 || step1 === 3 ? 'UPLOADED' : 'DRIVE'}
                  </span>
                </div>
              </div>

              <h3 className="font-sf-pro text-lg font-bold text-slate-900 mb-2">Submit Brief</h3>
              <p className="font-inter text-sm text-slate-500 leading-relaxed">
                Provide references, formatting examples, custom scripts, and directions matching your branding guidelines.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-4 right-6 font-sf-pro text-5xl font-extrabold bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-transparent bg-clip-text opacity-20">
                02
              </div>
              
              {/* Animated Visual Canvas - Upload Raw Footage */}
              <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl mb-6 relative overflow-hidden flex flex-col justify-center gap-3 px-3">
                {/* Clip 1 */}
                <div className="bg-white p-1.5 border border-slate-200/80 rounded-lg shadow-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B35] flex-shrink-0">
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold text-slate-700 leading-none truncate">clip_01.mov</span>
                      <span className="text-[7px] text-slate-400 mt-0.5 leading-none">{progress1}%</span>
                    </div>
                  </div>
                  <div className="flex-1 max-w-[60px] h-1 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress1}%` }}
                    />
                  </div>
                  {progress1 === 100 ? (
                    <Check className="w-3 h-3 text-emerald-500 bg-emerald-50 rounded-full p-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  )}
                </div>
 
                {/* Clip 2 */}
                <div className="bg-white p-1.5 border border-slate-200/80 rounded-lg shadow-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B35] flex-shrink-0">
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold text-slate-700 leading-none truncate">clip_02.mov</span>
                      <span className="text-[7px] text-slate-400 mt-0.5 leading-none">{progress2}%</span>
                    </div>
                  </div>
                  <div className="flex-1 max-w-[60px] h-1 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress2}%` }}
                    />
                  </div>
                  {progress2 === 100 ? (
                    <Check className="w-3 h-3 text-emerald-500 bg-emerald-50 rounded-full p-0.5 flex-shrink-0" />
                  ) : (
                    progress2 === 0 ? (
                      <span className="text-[7px] font-semibold text-slate-400 flex-shrink-0">Waiting</span>
                    ) : (
                      <div className="w-3 h-3 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    )
                  )}
                </div>
              </div>

              <h3 className="font-sf-pro text-lg font-bold text-slate-900 mb-2">Upload Raw Footage</h3>
              <p className="font-inter text-sm text-slate-500 leading-relaxed">
                Upload your raw video clips directly into our secure cloud storage folder or shared drive.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-4 right-6 font-sf-pro text-5xl font-extrabold bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-transparent bg-clip-text opacity-20">
                03
              </div>
              
              {/* Animated Visual Canvas - Performance Editing */}
              <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl mb-6 relative overflow-hidden flex flex-col justify-center px-3">
                {/* Scissor tool indicator */}
                <div className={`absolute top-1.5 left-[46%] z-30 bg-[#FF6B35] text-white rounded-full p-0.5 shadow-md transition-all duration-300
                  ${step3 === 1 ? 'scale-100 opacity-100 rotate-[-15deg]' : 'scale-50 opacity-0'}
                `}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.12 14.12L19 19m-4.88-4.88L19 9.12M14.12 14.12L12 12m0 0L7.88 7.88M12 12L5 5m7 7l5-5m-5 5l-5 5" />
                  </svg>
                </div>

                {/* Video Track Label */}
                <div className="text-[7px] font-bold text-slate-400 mb-1 tracking-wider uppercase">Timeline (V1)</div>

                {/* Video Tracks */}
                <div className="h-5 bg-slate-200/50 rounded relative flex items-center px-1 border border-slate-200">
                  {/* Block 1 (solid or split) */}
                  {step3 === 0 ? (
                    <div className="h-3.5 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded text-[7px] text-white font-bold flex items-center pl-1.5 shadow-sm w-[75%] transition-all duration-500">
                      UGC_Raw_Footage
                    </div>
                  ) : (
                    <div className="flex gap-0.5 w-full transition-all duration-500">
                      <div className="h-3.5 bg-[#FF6B35] rounded text-[6px] text-white font-bold flex items-center pl-1.5 shadow-sm w-[35%]">
                        Clip_A
                      </div>
                      <div className={`h-3.5 bg-[#F7931E] rounded text-[6px] text-white font-bold flex items-center pl-1.5 shadow-sm transition-all duration-500
                        ${step3 === 1 ? 'w-[35%]' : 'w-[18%]'}
                      `}>
                        {step3 === 1 ? 'Clip_B' : 'Trim'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Audio Track Label & Visualizer */}
                <div className="text-[7px] font-bold text-slate-400 mt-1.5 mb-1 tracking-wider uppercase">Audio (A1)</div>
                <div className="h-3.5 bg-slate-200/30 rounded flex items-center gap-0.5 px-1.5 border border-slate-200/50">
                  {[1, 3, 2, 4, 1, 2, 3, 2, 4, 2, 1, 3, 4, 2, 1, 3, 2, 4, 1, 3, 2, 4, 2, 1].map((val, idx) => {
                    const playheadPercent = parseFloat(playheadPos);
                    const indicatorPercent = (idx / 24) * 100;
                    return (
                      <div 
                        key={idx} 
                        className={`w-0.5 rounded-full transition-colors duration-300
                          ${playheadPercent >= indicatorPercent ? 'bg-[#FF6B35]' : 'bg-slate-300'}
                        `}
                        style={{ height: `${val * 20}%` }}
                      />
                    );
                  })}
                </div>

                {/* Playhead line */}
                <div 
                  className="absolute top-1 bottom-1 w-[1.5px] bg-rose-500 z-20 shadow-md transition-all duration-1000 ease-in-out"
                  style={{ left: playheadPos }}
                >
                  <div className="absolute top-0 -translate-x-[3.5px] w-2 h-2 bg-rose-500 rotate-45 rounded-sm" />
                </div>
              </div>

              <h3 className="font-sf-pro text-lg font-bold text-slate-900 mb-2">Performance Editing</h3>
              <p className="font-inter text-sm text-slate-500 leading-relaxed">
                Our editing wizards hook viewers in the first 3 seconds, add animated captions, and tune the pacing.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-4 right-6 font-sf-pro text-5xl font-extrabold bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-transparent bg-clip-text opacity-20">
                04
              </div>
              
              {/* Animated Visual Canvas - Delivery & Feedback */}
              <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl mb-6 relative overflow-hidden flex flex-col justify-center px-2.5 gap-1.5">
                {/* Notion Header Bar */}
                <div className="flex items-center gap-1 border-b border-slate-200 pb-1">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Workspace Database</span>
                </div>

                {/* Database Row */}
                <div className="bg-white border border-slate-200/80 rounded-lg p-1.5 shadow-sm flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1 min-w-0">
                    <svg className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="text-[9px] font-bold text-slate-800 truncate">UGC_Ad_v3.mov</span>
                  </div>

                  {/* Notion-style Status Dropdown */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className={`px-1.5 py-0.5 text-[7px] font-bold rounded flex items-center gap-0.5 transition-all duration-500
                      ${isDone 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          Done
                        </>
                      ) : (
                        <>
                          <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
                          Progress
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Comment Feedback Bubble */}
                <div className={`absolute bottom-1.5 right-1.5 bg-emerald-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded shadow-md transition-all duration-500 flex items-center gap-0.5 z-20
                  ${isDone ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-75 pointer-events-none'}
                `}>
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Approved!
                </div>
              </div>

              <h3 className="font-sf-pro text-lg font-bold text-slate-900 mb-2">Delivery & Feedback</h3>
              <p className="font-inter text-sm text-slate-500 leading-relaxed">
                Review your renders in Notion, leave timecoded feedback, request unlimited revisions, and publish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LEAD FORM SECTION --- */}
      <section className="py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-slate-50/60 border-y border-slate-100 z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-[#FF6B35] font-semibold text-xs uppercase tracking-wider">Start Editing</span>
            </div>
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              UGC Video Editing Lead Form
            </h2>
            <p className="font-inter text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Select your expected monthly volume package, then enter your details below for an instant quote.
            </p>
          </div>

          {/* Section 3: Pricing & Packages (Horizontal Row at the top) */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">1</span>
              Choose Your Package
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Package 1 */}
              {(() => {
                const isActive = !formData.isCustomPackage && formData.videoCount <= 50;
                return (
                  <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between
                    ${isActive 
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-lg ring-1 ring-[#FF6B35]' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                        Selected
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">50 Videos / Month</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#FF6B35]">$30</span>
                        <span className="text-slate-500 text-sm">per video</span>
                      </div>
                      <ul className="mt-5 space-y-2 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 3 revisions
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Captions included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Hook creation included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Dedicated project manager
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Notion-based project management
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Single point of contact
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mb-4">
                        <span className="font-medium text-slate-500">Estimated Cost:</span>
                        <span className="font-bold text-slate-900">
                          {isActive ? `$${formData.videoCount * 30}` : '50 × $30 = $1,500'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, videoCount: 50, isCustomPackage: false })}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold border transition-all duration-200
                          ${isActive
                            ? 'bg-[#FF6B35] text-white border-transparent shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        Choose This Package
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Package 2 */}
              {(() => {
                const isActive = !formData.isCustomPackage && formData.videoCount > 50 && formData.videoCount <= 100;
                return (
                  <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between
                    ${isActive 
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-lg ring-1 ring-[#FF6B35]' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                        Selected
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">51-100 Videos / Month</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#FF6B35]">$35</span>
                        <span className="text-slate-500 text-sm">per video</span>
                      </div>
                      <ul className="mt-5 space-y-2 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 6 revisions
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Captions included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Hook creation included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Dedicated project manager
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Notion-based project management
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Single point of contact
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mb-4">
                        <span className="font-medium text-slate-500">Estimated Cost:</span>
                        <span className="font-bold text-slate-900">
                          {isActive ? `$${formData.videoCount * 35}` : 'Videos × $35'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, videoCount: 75, isCustomPackage: false })}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold border transition-all duration-200
                          ${isActive
                            ? 'bg-[#FF6B35] text-white border-transparent shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        Choose This Package
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Package 3 */}
              {(() => {
                const isActive = !formData.isCustomPackage && formData.videoCount > 100;
                return (
                  <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between
                    ${isActive 
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-lg ring-1 ring-[#FF6B35]' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                        Selected
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">100+ Videos / Month</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#FF6B35]">$25</span>
                        <span className="text-slate-500 text-sm">per video</span>
                      </div>
                      <ul className="mt-5 space-y-2 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Unlimited revisions
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Captions included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Hook creation included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Dedicated project manager
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Notion-based project management
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Single point of contact
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mb-4">
                        <span className="font-medium text-slate-500">Estimated Cost:</span>
                        <span className="font-bold text-slate-900">
                          {isActive ? `$${formData.videoCount * 25}` : 'Videos × $25'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, videoCount: 120, isCustomPackage: false })}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold border transition-all duration-200
                          ${isActive
                            ? 'bg-[#FF6B35] text-white border-transparent shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        Choose This Package
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Package 4: Custom Package */}
              {(() => {
                const isActive = formData.isCustomPackage;
                return (
                  <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between
                    ${isActive 
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-lg ring-1 ring-[#FF6B35]' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                        Selected
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Custom Package</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-[#FF6B35]">Build Your Own</span>
                      </div>
                      <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                        Specify your own revisions, captions, hooks, project management integration, and contact requirements.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#FF6B35]" /> Tailor-made features
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#FF6B35]" /> Flexible revision policies
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#FF6B35]" /> Custom integrations
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mb-4">
                        <span className="font-medium text-slate-500">Estimated Cost:</span>
                        <span className="font-bold text-slate-900">Custom Quote</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isCustomPackage: true })}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold border transition-all duration-200
                          ${isActive
                            ? 'bg-[#FF6B35] text-white border-transparent shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        Make Your Own
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Form and Sidebar (Two-column layout below packages) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Fields (Contact & Project Details) */}
            <form className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-10">
              
              {/* Section 1: Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">2</span>
                  Contact Information
                </h3>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-[#FF6B35]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-[#FF6B35]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Phone Number / Fastest Way to Contact You <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {['Email', 'WhatsApp', 'Phone Call', 'Slack', 'Other'].map((method) => (
                        <label
                          key={method}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all duration-200 text-center
                            ${formData.contactMethod === method
                              ? 'border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={formData.contactMethod === method}
                            onChange={() => setFormData({ ...formData, contactMethod: method })}
                            className="sr-only"
                          />
                          {method}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Project Details */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">3</span>
                  Project Details
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      How Many Videos Do You Need Edited Per Month? <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.videoCount}
                      onChange={(e) => setFormData({ ...formData, videoCount: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 font-semibold text-slate-800 text-sm"
                    />
                  </div>

                  {formData.isCustomPackage && (
                    <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                        <h4 className="text-sm font-bold text-slate-800">Customize Your Package Options</h4>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                            Revisions Required
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {['3 Revisions', '6 Revisions', 'Unlimited Revisions', 'Custom Policy'].map((rev) => (
                              <button
                                key={rev}
                                type="button"
                                onClick={() => setFormData({ ...formData, customRevisions: rev })}
                                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all duration-200
                                  ${formData.customRevisions === rev
                                    ? 'border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35]'
                                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                  }`}
                              >
                                {rev}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                            Expected Price Per Video ($)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={formData.customPricePerVideo}
                            onChange={(e) => setFormData({ ...formData, customPricePerVideo: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 font-semibold text-slate-800 text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                            Included Inclusions & Add-ons
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div 
                              onClick={() => setFormData({ ...formData, customCaptions: !formData.customCaptions })}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 bg-white select-none
                                ${formData.customCaptions ? 'border-[#FF6B35] text-[#FF6B35]' : 'border-slate-200 text-slate-600'}`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0
                                ${formData.customCaptions 
                                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white' 
                                  : 'border-slate-300 bg-white'
                                }`}
                              >
                                {formData.customCaptions && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>Captions Included</span>
                            </div>

                            <div 
                              onClick={() => setFormData({ ...formData, customHook: !formData.customHook })}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 bg-white select-none
                                ${formData.customHook ? 'border-[#FF6B35] text-[#FF6B35]' : 'border-slate-200 text-slate-600'}`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0
                                ${formData.customHook 
                                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white' 
                                  : 'border-slate-300 bg-white'
                                }`}
                              >
                                {formData.customHook && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>Hook Creation Included</span>
                            </div>

                            <div 
                              onClick={() => setFormData({ ...formData, customManager: !formData.customManager })}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 bg-white select-none
                                ${formData.customManager ? 'border-[#FF6B35] text-[#FF6B35]' : 'border-slate-200 text-slate-600'}`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0
                                ${formData.customManager 
                                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white' 
                                  : 'border-slate-300 bg-white'
                                }`}
                              >
                                {formData.customManager && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>Dedicated Project Manager</span>
                            </div>

                            <div 
                              onClick={() => setFormData({ ...formData, customNotion: !formData.customNotion })}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 bg-white select-none
                                ${formData.customNotion ? 'border-[#FF6B35] text-[#FF6B35]' : 'border-slate-200 text-slate-600'}`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0
                                ${formData.customNotion 
                                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white' 
                                  : 'border-slate-300 bg-white'
                                }`}
                              >
                                {formData.customNotion && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>Notion PM Workspace</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Reference Links <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.referenceLinks}
                      onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                      placeholder="Share examples of editing styles, creators, or brands you'd like us to match."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Additional Project Details <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.additionalDetails}
                      onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                      placeholder="Tell us about your brand, editing style, turnaround expectations, or any special requirements."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm"
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      onClick={handleProceed}
                      disabled={isSubmitting}
                      className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Lead Form'
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </form>

            {/* Right Column: Sticky Budget & Negotiation Sidebar + Why Clients Choose Us */}
            <div className="lg:col-span-4 space-y-8 sticky top-24">
              
              {/* Section 4: Budget Confirmation */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
                <h3 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6B35] text-white text-sm font-bold">4</span>
                  Budget Confirmation
                </h3>

                <div className="space-y-4">
                  {formData.isCustomPackage ? (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                      <span className="text-xs font-semibold text-slate-500">Estimated Total Cost</span>
                      <span className="text-xl font-extrabold text-slate-900 leading-tight">
                        Your custom budget is ${calculateBudget(formData.videoCount).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1">
                        Based on {formData.videoCount} videos/month at ${formData.customPricePerVideo} per video.
                      </span>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                      <span className="text-xs font-semibold text-slate-500">Estimated Total Cost</span>
                      <span className="text-xl font-extrabold text-slate-900 leading-tight">
                        Your estimated monthly budget is ${calculateBudget(formData.videoCount).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1">
                        Based on {formData.videoCount} videos/month at ${formData.videoCount <= 50 ? 30 : formData.videoCount <= 100 ? 35 : 25} per video.
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleProceed}
                      disabled={isSubmitting}
                      className="w-full h-12 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        formData.isCustomPackage ? 'Proceed with Custom Specifications' : 'Proceed With This Budget'
                      )}
                    </button>
                    
                    {!formData.isCustomPackage && (
                      <div className="border-t border-slate-100 pt-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Would You Like To Negotiate? <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.expectedBudget}
                          onChange={(e) => setFormData({ ...formData, expectedBudget: e.target.value })}
                          placeholder="Enter your expected budget here (e.g. $1,200)"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none transition-all duration-200 text-sm mb-3"
                        />
                        <button
                          type="button"
                          onClick={handleNegotiate}
                          disabled={isSubmitting}
                          className="w-full h-12 bg-[#FF6B35] hover:bg-[#E8650A] text-white font-bold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            'Negotiate Pricing'
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Why Clients Choose Us */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
                <h3 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Why Clients Choose Us
                </h3>
                <ul className="space-y-3.5">
                  {[
                    'Dedicated project manager',
                    'One point of contact throughout the project',
                    'Notion-based project management',
                    'Fast communication',
                    'Consistent editing style across all videos',
                    'Captions included',
                    'Hook creation included',
                    'Scalable editing team for high-volume content'
                  ].map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#FF6B35] mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-20 px-4 sm:px-6 md:px-8 relative z-10 bg-slate-50">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 relative" style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #E8650A 100%)'
        }}>
          {/* Glass Overlay effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to Scale Your Brand with Performance UGC Ads?
            </h2>
            <p className="font-inter text-base sm:text-lg text-white/90 mb-10 leading-relaxed">
              Book a free 15-minute consulting call. We'll audit your current ad creatives and show you how editing optimization can unlock higher ROAS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleBookCall}
                className="w-full sm:w-auto relative h-12 px-10 rounded-lg text-base font-semibold text-slate-900 bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 text-[#FF6B35]" />
                Schedule Your Call
              </button>
              
              <Link
                to="/"
                className="w-full sm:w-auto relative h-12 px-10 rounded-lg text-base font-semibold text-white border border-white/40 bg-transparent hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default UGCPage;
