// app/landing/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import { Zap, Shield, Brain, ArrowRight, Globe } from 'lucide-react';
import WireframeDottedGlobe from '@/components/ui/wireframe-dotted-globe';
import ContactLinksCard from './ContactLinksCard';
import HowItWorksSection from './HowItWorks';

const SplashCursor = dynamic(() => import('@/components/SplashCursor'), {
  ssr: false,
});

const AnimatedShaderBackground = dynamic(() => import('@/components/ui/animated-shader-background'), {
  ssr: false,
});

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    'how-it-works': false,
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setIsVisible((prev) => ({ ...prev, [id]: true }));
        }
      });
    }, observerOptions);

    const sections = ['hero', 'features', 'how-it-works'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {/* SplashCursor effect */}
      <SplashCursor />
      
      {/* Fixed Background */}
      <div className="fixed inset-0 w-full h-full bg-[#0a0a1a] z-0">
        <AnimatedShaderBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative h-screen w-full flex items-center justify-center snap-start snap-always"
      >
        <div 
          className={`text-center space-y-8 max-w-4xl px-4 transition-all duration-1000 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 
            className="text-8xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Times of World
          </h1>
          <p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Your daily dose of AI-curated news and analysis. Experience intelligent journalism powered by cutting-edge technology.
          </p>
          <div className="flex gap-4 justify-center mt-12">
            <Link 
              href="/signin"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="relative h-screen w-full flex items-center justify-center snap-start snap-always"
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 
            className={`text-6xl font-bold text-center text-white mb-20 transition-all duration-1000 delay-100 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Features
          </h2>
          
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              {
                icon: Zap,
                title: 'AI-Powered Curation',
                desc: 'Advanced algorithms curate the most relevant news from trusted sources worldwide.',
                gradientFrom: '#ffbc00',
                gradientTo: '#ff0058',
              },
              {
                icon: Shield,
                title: 'Real-Time Updates',
                desc: 'Stay ahead with breaking news and real-time updates delivered instantly.',
                gradientFrom: '#03a9f4',
                gradientTo: '#ff0058',
              },
              {
                icon: Brain,
                title: 'Personalized Experience',
                desc: 'Customize your feed and receive tailored content recommendations.',
                gradientFrom: '#4dff03',
                gradientTo: '#00d0ff',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group relative w-[320px] h-[400px] transition-all duration-700 delay-${idx * 100} ${
                  isVisible.features ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                {/* Skewed gradient panels */}
                <span
                  className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                  style={{
                    background: `linear-gradient(315deg, ${feature.gradientFrom}, ${feature.gradientTo})`,
                  }}
                />
                <span
                  className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                  style={{
                    background: `linear-gradient(315deg, ${feature.gradientFrom}, ${feature.gradientTo})`,
                  }}
                />

                {/* Animated blurs */}
                <span className="pointer-events-none absolute inset-0 z-10">
                  <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                  <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                </span>

                {/* Content */}
                <div className="relative z-20 left-0 p-[20px_40px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[60px_40px] border border-white/10">
                  <feature.icon className="w-12 h-12 mb-4" />
                  <h2 className="text-2xl mb-4 font-bold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{feature.title}</h2>
                  <p className="text-base leading-relaxed mb-4 text-gray-300" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        id="how-it-works" 
        className="relative h-screen w-full flex items-center justify-center snap-start snap-always"
      >
        {/* <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 
            className={`text-6xl font-bold text-center text-white mb-20 transition-all duration-1000 delay-100 ${
              isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            How It Works
          </h2>
          
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              {
                number: '1',
                title: 'Sign Up',
                desc: 'Create your free account in seconds and set up your preferences.',
                badge: 'Step One',
              },
              {
                number: '2',
                title: 'Customize',
                desc: 'Choose your topics of interest and let our AI learn your preferences.',
                badge: 'Step Two',
              },
              {
                number: '3',
                title: 'Stay Informed',
                desc: 'Receive curated news updates tailored specifically for you, every day.',
                badge: 'Step Three',
              },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`card transition-all duration-700 delay-${idx * 100} ${
                  isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="content">
                  <div className="back">
                    <div className="back-content">
                      <div className="text-6xl font-bold mb-4" style={{ 
                        background: 'linear-gradient(90deg, #ff9966, #ff5e62)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        {step.number}
                      </div>
                      <strong className="text-xl" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{step.title}</strong>
                    </div>
                  </div>
                  <div className="front">
                    <div className="front-content">
                      <div className="badge">
                        <span className="text-xs" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{step.badge}</span>
                      </div>
                      <div className="description">
                        <div className="title">
                          <p className="title-text text-lg font-bold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            {step.title}
                          </p>
                        </div>
                        <p className="card-footer text-sm mt-3 text-gray-300" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <HowItWorksSection />

      </section>

      {/* Footer */}
      
            <footer className="relative min-h-[40vh] w-full flex items-center justify-between px-30 py-1 snap-start bg-black/80 border-t border-white/10">
  
  {/* LEFT : Logo + Title + Globe */}
  <div className="relative flex flex-col gap-9 max-w-[50%] pl-30 pt-40">
    <Link
      href="/"
      className="flex items-center gap-6 hover:opacity-80 transition-opacity"
    >
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <Globe className="w-14 h-14 text-black" />
      </div>

      <h1
        className="text-5xl font-bold text-white leading-none"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        Times of World
      </h1>
    </Link>

    {/* Globe strictly under logo */}
    <div className="ml-8 scale-[0.7] origin-top-left -mt-2">
      <WireframeDottedGlobe position="left" />
    </div>
  </div>
{/* RIGHT : Navigation and Info */}
  <ContactLinksCard />
</footer>

    </div>
  );
}