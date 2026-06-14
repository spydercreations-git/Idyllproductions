import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';

const Blog1: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <article className="pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold rounded-full">
                Beginner Guide
              </span>
            </div>
            
            <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              How to Start Your Video Editing Journey – A Complete Beginner's Guide
            </h1>
            
            <div className="flex items-center gap-6 text-slate-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                May 15, 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                8 min read
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              Have you ever watched a beautifully edited video and thought, 'How do they do that?' The good news is – video editing is a skill anyone can learn! Whether you're a student, a content creator, or a business owner who wants to tell better stories, this guide is your starting point. At Idyll Productions, we've helped hundreds of beginners go from confused to confident, and today we're sharing everything you need to know to get started.
            </p>

            <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mt-12 mb-6">What Is Video Editing?</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Video editing is the process of arranging, trimming, and combining video clips to create a final, polished video. It involves cutting unwanted footage, adding music, transitions, text, and effects to make your video engaging and professional-looking. Think of it like telling a story – you decide what to show, when to show it, and how it all flows together.
            </p>

            <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mt-12 mb-6">Step 1 – Choose Your Goal</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Before you even open any software, ask yourself: What kind of video do I want to make? YouTube vlogs, Instagram Reels, brand commercials, and wedding videos all require different styles of editing. Knowing your goal helps you choose the right tools and techniques from the beginning.
            </p>

            <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mt-12 mb-6">Step 2 – Get Your Footage Ready</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Organize your clips into folders before importing them. Label everything clearly – raw footage, B-roll, music, graphics. A messy project folder is one of the biggest mistakes beginners make, and it slows down your entire workflow.
            </p>

            <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mt-12 mb-6">Step 3 – Choose Your Software</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              For beginners, we recommend starting with Adobe Premiere Pro or DaVinci Resolve (which has a free version). Both are industry-standard tools used by professionals worldwide. Don't worry – we have a full blog dedicated to helping you choose the right software!
            </p>

            <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mt-12 mb-6">Step 4 – Learn the Basic Cuts</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Start simple. The most important skill in editing is knowing when to cut. A cut is just moving from one clip to the next. Practice cutting on the beat of music, cutting when someone finishes a sentence, and removing any awkward pauses or mistakes from your footage.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
              <h3 className="font-sf-pro text-xl font-bold text-slate-900 mb-3">Idyll Productions Pro Tip</h3>
              <p className="text-slate-700 leading-relaxed">
                Watch your favorite YouTube creators and pay attention to how they edit. Notice when they cut, what music they use, and how fast or slow the pacing feels. This is called 'reverse engineering' and it's one of the fastest ways to improve your editing eye.
              </p>
            </div>

            <h2 className="font-sf-pro text-3xl font-bold text-slate-900 mt-12 mb-6">Conclusion</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Starting your video editing journey doesn't have to be overwhelming. Take it one step at a time, practice every day, and remember – every professional editor was once a beginner too. At Idyll Productions, we're always here to help you grow. Need professional editing done for you? Reach out to our team today!
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
            <div className="text-slate-400">
              <span className="text-sm">Previous Post</span>
            </div>
            <Link
              to="/blog/premiere-pro-vs-davinci-resolve-vs-final-cut-pro"
              className="flex items-center gap-2 text-slate-900 hover:text-purple-600 transition-colors group"
            >
              <span className="font-semibold">Next Post</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Blog1;
