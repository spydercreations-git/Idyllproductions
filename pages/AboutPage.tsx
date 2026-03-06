import React from 'react';
import { Users, Target, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real Team",
      description: "Experienced professionals who understand content creation and audience engagement."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Clear Process",
      description: "Transparent workflow with regular updates and structured feedback rounds."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Results",
      description: "Track record of helping creators and brands grow their audiences through better content."
    }
  ];

  const team = [
    {
      name: "Harsh Pawar",
      role: "CEO - CHIEF EXECUTIVE OFFICER",
      description: "Founder & Owner. Visionary leader driving the creative direction and strategic growth of Idyll Productions."
    },
    {
      name: "Rohit Gaikwad",
      role: "COO - CHIEF OPERATING OFFICER",
      description: "Operations expert who operates all teams and ensures smooth project delivery and coordination."
    },
    {
      name: "Snow",
      role: "CEM - CHIEF EDITING MANAGER",
      description: "Editing manager who handles our talented editors and ensures top-quality video production."
    },
    {
      name: "Smita",
      role: "CSO - CHIEF SALES OFFICER",
      description: "Our sales officer who handles our great clients and builds lasting business relationships."
    },
    {
      name: "Void",
      role: "CCO - CHIEF COMMERCIAL OFFICER",
      description: "Commercial manager handling client management and business development strategies."
    },
    {
      name: "Vishal",
      role: "CIO - CHIEF INFORMATION OFFICER",
      description: "Information manager and database saver, handling all technical data and systems."
    },
    {
      name: "Mansi",
      role: "CFO - CHIEF FINANCIAL OFFICER",
      description: "Financial manager who handles all payments and financial operations of the company."
    },
    {
      name: "Parth",
      role: "CDO - CHIEF DATA OFFICER",
      description: "Manages the industrial software for internal databases and ensures data integrity across all systems."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            About Idyll Productions
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We are a genuine creative studio focused on editing, storytelling, and long term growth with creators and brands. No fancy words, no complicated processes. Just honest work that delivers results.
          </p>
        </div>
      </section>

      {/* Who We Are & What We Do */}
      <section className="py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Who We Are */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Who We Are</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Idyll Productions is a creative studio that specializes in video editing and storytelling. We partner with content creators, brands, and businesses to create videos that actually perform and connect with audiences.
                </p>
                <p>
                  We believe in transparency and building real relationships with our clients. Our approach is simple: understand what you need, deliver quality work on time, and help you grow your audience through better content.
                </p>
                <p>
                  With a production net worth around 5 million to 10 million rupees, we have the resources and experience to handle projects of any scale. We are real, transparent, and serious about our work.
                </p>
              </div>
            </div>

            {/* What We Do */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What We Do</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  We edit videos for YouTube creators, short form content for social media, product videos for e-commerce, SaaS companies, and gaming content that keeps viewers engaged. We also produce original films and cinematic advertisements when projects call for it.
                </p>
                <p>
                  Our team uses professional tools and proven workflows to ensure every project meets high standards. We focus on clean storytelling, strategic pacing, and platform specific optimization.
                </p>
                <p>
                  We manage everything through Notion for clear communication and transparent progress tracking. No confusion, no delays, just smooth collaboration from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-slate-100"
                >
                  <div className="text-slate-900">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900">Our Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-slate-900"
                >
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{member.name}</h3>
                <p className="text-sm font-bold mb-3 text-slate-900">
                  {member.role}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}

            {/* Our Editors Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-slate-900"
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Our Editors</h3>
              <p className="text-sm font-bold mb-3 text-slate-900">
                20+ HIGH SKILLED EDITORS
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                A talented team of 20+ professional editors working with us to deliver exceptional content every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you create content that connects with your audience and drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@idyllproductions.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: '#111111',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#222222';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111111';
              }}
            >
              Book a Call
            </a>
            <a
              href="mailto:contact@idyllproductions.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: '#111111',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#222222';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111111';
              }}
            >
              Start Convo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
