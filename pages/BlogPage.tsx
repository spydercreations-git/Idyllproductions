import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'how-to-start-video-editing-journey',
    title: 'How to Start Your Video Editing Journey – A Complete Beginner\'s Guide',
    excerpt: 'Have you ever watched a beautifully edited video and thought, \'How do they do that?\' The good news is – video editing is a skill anyone can learn!',
    category: 'Beginner Guide',
    readTime: '8 min read',
    date: 'May 15, 2026'
  },
  {
    id: 2,
    slug: 'premiere-pro-vs-davinci-resolve-vs-final-cut-pro',
    title: 'Adobe Premiere Pro vs DaVinci Resolve vs Final Cut Pro – Which Software Is Best?',
    excerpt: 'The most common question we get at Idyll Productions is: \'Which video editing software should I use?\' We break down the three most popular professional editing tools.',
    category: 'Software Comparison',
    readTime: '10 min read',
    date: 'May 14, 2026'
  },
  {
    id: 3,
    slug: 'reduce-video-file-size-without-losing-quality',
    title: 'How to Reduce Video File Size Without Losing Quality – The Complete Guide',
    excerpt: 'Large video files are one of the most frustrating challenges in video production. Learn smart, proven ways to reduce your file size dramatically without sacrificing quality.',
    category: 'Technical Guide',
    readTime: '7 min read',
    date: 'May 13, 2026'
  },
  {
    id: 4,
    slug: 'what-is-ai-video-editing',
    title: 'What Is AI Video Editing and How Is It Changing the Industry?',
    excerpt: 'Artificial Intelligence is no longer the future – it\'s the present. Learn exactly what AI video editing is, how it works, and why it\'s changing the industry.',
    category: 'AI & Technology',
    readTime: '9 min read',
    date: 'May 12, 2026'
  },
  {
    id: 5,
    slug: 'edit-videos-for-instagram-reels',
    title: 'How to Edit Videos for Instagram Reels – Tips That Actually Get Views',
    excerpt: 'Instagram Reels is one of the most powerful content formats on the internet. Learn the exact editing techniques we use to create Reels that get watched, shared, and followed.',
    category: 'Social Media',
    readTime: '8 min read',
    date: 'May 11, 2026'
  },
  {
    id: 6,
    slug: 'color-grading-for-beginners',
    title: 'Color Grading for Beginners – How to Make Your Videos Look Cinematic',
    excerpt: 'Ever noticed how movies and high-end commercials have that gorgeous, rich, cinematic look? Learn the fundamentals of color grading so your videos can start looking like they belong in a cinema.',
    category: 'Color Grading',
    readTime: '10 min read',
    date: 'May 10, 2026'
  },
  {
    id: 7,
    slug: 'edit-youtube-videos-for-retention',
    title: 'How to Edit YouTube Videos That Keep Viewers Watching Until the End',
    excerpt: 'YouTube\'s algorithm rewards videos that keep viewers watching longer. Learn the editing secrets that keep viewers glued to the screen.',
    category: 'YouTube Strategy',
    readTime: '9 min read',
    date: 'May 9, 2026'
  },
  {
    id: 8,
    slug: 'top-10-video-editing-mistakes',
    title: 'Top 10 Video Editing Mistakes Beginners Make (And How to Avoid Them)',
    excerpt: 'Learning video editing is exciting – but it\'s easy to fall into bad habits. We break down the top 10 editing mistakes beginners make and exactly how to fix them.',
    category: 'Common Mistakes',
    readTime: '8 min read',
    date: 'May 8, 2026'
  },
  {
    id: 9,
    slug: 'edit-talking-head-videos-like-pro',
    title: 'How to Edit Talking Head Videos Like a Pro',
    excerpt: 'Talking head videos seem simple, but editing them well is an art. Here\'s exactly how we edit talking head videos for executives, educators, and content creators.',
    category: 'Tutorial',
    readTime: '7 min read',
    date: 'May 7, 2026'
  },
  {
    id: 10,
    slug: 'adobe-after-effects-for-beginners',
    title: 'How to Use Adobe After Effects for Beginners – Motion Graphics Made Simple',
    excerpt: 'Adobe After Effects is the industry standard for motion graphics and visual effects. We break down After Effects into digestible steps so you can start creating stunning motion graphics.',
    category: 'Motion Graphics',
    readTime: '10 min read',
    date: 'May 6, 2026'
  },
  {
    id: 11,
    slug: 'short-form-video-editing-viral-content',
    title: 'Short-Form Video Editing: How to Create Viral Content for TikTok and YouTube Shorts',
    excerpt: 'Short-form video is the most consumed content format in the world. We\'ve cracked the code on short-form editing, and we\'re sharing our playbook with you.',
    category: 'Viral Content',
    readTime: '9 min read',
    date: 'May 5, 2026'
  },
  {
    id: 12,
    slug: 'how-to-edit-wedding-video',
    title: 'How to Edit a Wedding Video – A Step-by-Step Guide',
    excerpt: 'A wedding video is one of the most emotionally significant pieces of content a videographer will ever create. Learn how to edit wedding videos that truly move people.',
    category: 'Wedding Video',
    readTime: '11 min read',
    date: 'May 4, 2026'
  },
  {
    id: 13,
    slug: 'create-professional-video-ads',
    title: 'How to Create Professional Video Ads for Your Business – A Complete Guide',
    excerpt: 'Video advertising is the most powerful marketing format available to businesses today. Here\'s our complete guide to making video ads that convert.',
    category: 'Marketing',
    readTime: '10 min read',
    date: 'May 3, 2026'
  },
  {
    id: 14,
    slug: 'speed-up-video-editing-workflow',
    title: 'How to Speed Up Your Video Editing Workflow – 15 Time-Saving Tricks',
    excerpt: 'Time is money in the video editing world. Here are 15 proven tricks to speed up your workflow and become more efficient.',
    category: 'Productivity',
    readTime: '8 min read',
    date: 'May 2, 2026'
  },
  {
    id: 15,
    slug: 'why-business-needs-professional-video-editing',
    title: 'Why Your Business Needs Professional Video Editing – And Why DIY Isn\'t Always Enough',
    excerpt: 'There\'s a crucial difference between video that looks \'good enough\' and video that actually drives results for your business. Here\'s the honest case for professional editing.',
    category: 'Business Strategy',
    readTime: '9 min read',
    date: 'May 1, 2026'
  }
];

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Idyll Productions Blog
          </h1>
          <p className="font-inter text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Expert insights, tutorials, and industry knowledge on video editing, AI content creation, and digital storytelling
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="font-sf-pro text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="font-inter text-slate-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === number
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
