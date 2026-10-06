export interface PageSEO {
  path: string;
  title: string;
  description: string;
  canonical: string;
  schema?: object | object[];
}

export const SITE_URL = 'https://idyllproductions.com';

// ─── Shared Structured Data Schemas ──────────────────────────────────────────

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  "name": "Idyll Productions",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo-black.png`,
  "description": "Idyll Productions edits UGC ads, short form content and SaaS explainers. One day turnaround, from $15 per edit, 3 free revisions.",
  "email": "harsh@idyllproductions.com",
  "foundingDate": "2023",
  "sameAs": [
    "https://x.com/madebyidyll",
    "LINKEDIN_URL",
    "CLUTCH_URL"
  ],
  "founder": {
    "@type": "Person",
    "@id": `${SITE_URL}/team/harsh#person`,
    "name": "Harsh",
    "jobTitle": "Founder and CEO",
    "url": `${SITE_URL}/team/harsh`
  },
  "employee": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/team/harsh#person`,
      "name": "Harsh",
      "jobTitle": "Founder and CEO",
      "url": `${SITE_URL}/team/harsh`
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/team/rohit#person`,
      "name": "Rohit",
      "jobTitle": "COO",
      "url": `${SITE_URL}/team/rohit`
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/team/zada#person`,
      "name": "Zada",
      "jobTitle": "CSO",
      "url": `${SITE_URL}/team/zada`
    }
  ]
};

export const HARSH_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/team/harsh#person`,
  "name": "Harsh",
  "jobTitle": "Founder and CEO",
  "url": `${SITE_URL}/team/harsh`,
  "image": `${SITE_URL}/hero-bg.webp`,
  "worksFor": {
    "@id": `${SITE_URL}/#org`
  },
  "sameAs": [
    "https://x.com/madebyidyll",
    "HARSH_LINKEDIN_URL_PLACEHOLDER"
  ]
};

export const ROHIT_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/team/rohit#person`,
  "name": "Rohit",
  "jobTitle": "COO",
  "url": `${SITE_URL}/team/rohit`,
  "image": `${SITE_URL}/hero-bg.webp`,
  "worksFor": {
    "@id": `${SITE_URL}/#org`
  }
};

export const ZADA_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/team/zada#person`,
  "name": "Zada",
  "jobTitle": "CSO",
  "url": `${SITE_URL}/team/zada`,
  "image": `${SITE_URL}/hero-bg.webp`,
  "worksFor": {
    "@id": `${SITE_URL}/#org`
  }
};

export const ABOUT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  "url": `${SITE_URL}/about`,
  "name": "About Idyll Productions | Creative Studio & Team",
  "description": "Learn about Idyll Productions and meet our team: Harsh (Founder & CEO), Rohit (COO), and Zada (CSO).",
  "mainEntity": {
    "@id": `${SITE_URL}/#org`
  }
};

// ─── Route to SEO Mapping ───────────────────────────────────────────────────

export const PAGE_SEO_MAP: Record<string, PageSEO> = {
  '/': {
    path: '/',
    title: 'Idyll Productions | UGC Video Editing for SaaS Brands',
    description: 'Idyll Productions edits UGC ads, short form content and SaaS explainers. One day turnaround, from $15 per edit, 3 free revisions.',
    canonical: `${SITE_URL}/`,
    schema: ORGANIZATION_SCHEMA,
  },
  '/ugc-video-editing': {
    path: '/ugc-video-editing',
    title: 'UGC Video Editing Service | From $15 per Edit | Idyll',
    description: 'We turn raw creator footage into ready to run UGC ads with hooks, captions and motion graphics. One day turnaround.',
    canonical: `${SITE_URL}/ugc-video-editing`,
  },
  '/services': {
    path: '/services',
    title: 'Video Editing Services | Idyll Productions',
    description: 'Explore video editing services from Idyll Productions: UGC ads, SaaS explainers, short form clips, and motion graphics with fast turnaround.',
    canonical: `${SITE_URL}/services`,
  },
  '/pricing': {
    path: '/pricing',
    title: 'UGC Editing Pricing | From $15 per Edit | Idyll',
    description: 'Transparent video editing pricing from $15 per edit. Fast one day turnaround, 3 free revisions, and dedicated editing for SaaS and creator brands.',
    canonical: `${SITE_URL}/pricing`,
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Idyll Productions',
    description: 'Contact Idyll Productions for high-performing UGC video ads, SaaS explainers, and short-form editing. Book a call or send a message today.',
    canonical: `${SITE_URL}/contact`,
  },
  '/blog': {
    path: '/blog',
    title: 'UGC Editing Guides for SaaS | Idyll Productions Blog',
    description: 'Actionable guides, tips, and insights on video editing, content strategy, storytelling, and audience retention for creators and brands.',
    canonical: `${SITE_URL}/blog`,
  },
  '/team/harsh': {
    path: '/team/harsh',
    title: 'Harsh, Founder and CEO of Idyll Productions',
    description: 'Harsh is the Founder and CEO of Idyll Productions, spearheading creative strategy, UGC ad performance, and video editing excellence for SaaS brands.',
    canonical: `${SITE_URL}/team/harsh`,
    schema: HARSH_PERSON_SCHEMA,
  },
  '/team/rohit': {
    path: '/team/rohit',
    title: 'Rohit, COO of Idyll Productions',
    description: 'Rohit is the Chief Operating Officer of Idyll Productions, managing operations, workflow automation, and rapid one-day turnaround delivery.',
    canonical: `${SITE_URL}/team/rohit`,
    schema: ROHIT_PERSON_SCHEMA,
  },
  '/team/zada': {
    path: '/team/zada',
    title: 'Zada, CSO of Idyll Productions',
    description: 'Zada is the Chief Sales Officer of Idyll Productions, leading client relationships, partnerships, and brand growth for modern SaaS teams.',
    canonical: `${SITE_URL}/team/zada`,
    schema: ZADA_PERSON_SCHEMA,
  },
  '/about': {
    path: '/about',
    title: 'About Us | Idyll Productions',
    description: 'Learn about Idyll Productions. We are a remote creative studio focused on video editing, motion design, and storytelling for creators and brands.',
    canonical: `${SITE_URL}/about`,
    schema: ABOUT_PAGE_SCHEMA,
  },
  '/socials': {
    path: '/socials',
    title: 'Socials & Community | Idyll Productions',
    description: 'Follow Idyll Productions across Instagram, YouTube, X (Twitter), Discord, and LinkedIn. Behind-the-scenes content and creative insights.',
    canonical: `${SITE_URL}/socials`,
  },
  '/ugc': {
    path: '/ugc',
    title: 'UGC Video Editing Service | From $15 per Edit | Idyll',
    description: 'High-converting UGC video ads and creator-led content designed to scale paid social campaigns on TikTok, Instagram, and YouTube.',
    canonical: `${SITE_URL}/ugc`,
  },
  '/apply': {
    path: '/apply',
    title: 'Join Our Team | Video Editor Application | Idyll Productions',
    description: 'Apply to join Idyll Productions as a professional video editor. Work on high-impact projects for top creators, SaaS companies, and brands.',
    canonical: `${SITE_URL}/apply`,
  },
  '/brand-book': {
    path: '/brand-book',
    title: 'Brand Guidelines & Identity Standards | Idyll Productions',
    description: 'Official brand book, visual guidelines, identity standards, and creative principles of Idyll Productions.',
    canonical: `${SITE_URL}/brand-book`,
  },
  '/blog/top-10-video-editing-mistakes': {
    path: '/blog/top-10-video-editing-mistakes',
    title: 'Top 10 Video Editing Mistakes Beginners Make | Idyll Productions',
    description: 'Learning video editing is exciting – but it is easy to fall into bad habits. Discover the top 10 editing mistakes beginners make and how to fix them.',
    canonical: `${SITE_URL}/blog/top-10-video-editing-mistakes`,
  },
};

export const NOT_FOUND_SEO: PageSEO = {
  path: '/404',
  title: '404 - Page Not Found | Idyll Productions',
  description: 'The page you are looking for does not exist or has been moved. Explore Idyll Productions video editing services and portfolio.',
  canonical: `${SITE_URL}/404`,
};

export function getPageSEO(pathname: string): PageSEO {
  // Normalize pathname: remove trailing slash if not root
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return PAGE_SEO_MAP[cleanPath] || NOT_FOUND_SEO;
}
