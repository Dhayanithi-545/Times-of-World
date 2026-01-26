"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { 
  Zap, 
  Mail, 
  Bell, 
  Globe, 
  Moon, 
  Smartphone, 
  Video, 
  UserPlus, 
  Settings, 
  Rss, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';

const SplashCursor = dynamic(() => import('@/components/SplashCursor'), {
  ssr: false,
});

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative scroll-smooth">
      <SplashCursor />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div className="text-center space-y-8 max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            Times of World
          </h1>
          <p className="text-xl text-muted-foreground">
            Experience the future of news. AI-powered, personalized, and curated 
            just for you. Stay informed without the noise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/signin">
              <Button size="lg" className="px-8 py-6 text-lg rounded-full">
                Get Started
                <Zap className="ml-2 h-5 w-5 fill-current" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full" asChild>
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to stay ahead</h2>
            <p className="mt-4 text-muted-foreground">Cutting-edge features for the modern reader.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-blue-500" />}
              title="AI Personalization"
              description="Get news recommendations based on your unique interests and reading habits."
            />
            <FeatureCard 
              icon={<Mail className="w-6 h-6 text-purple-500" />}
              title="Daily Digest"
              description="Curated news summaries delivered straight to your inbox every morning."
            />
            <FeatureCard 
              icon={<Bell className="w-6 h-6 text-red-500" />}
              title="Breaking News"
              description="Stay updated with real-time notifications for stories that matter most."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-green-500" />}
              title="Multi-Source"
              description="Access news from trusted global sources all in one centralized platform."
            />
            <FeatureCard 
              icon={<Smartphone className="w-6 h-6 text-orange-500" />}
              title="Responsive Design"
              description="A seamless reading experience across mobile, tablet, and desktop."
            />
            <FeatureCard 
              icon={<Video className="w-6 h-6 text-indigo-500" />}
              title="Video News"
              description="Engaging video content paired with traditional in-depth articles."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Step number="1" icon={<UserPlus />} title="Sign Up" desc="Create your personalized account." />
            <Step number="2" icon={<Settings />} title="Set Preferences" desc="Choose your favorite topics." />
            <Step number="3" icon={<Rss />} title="Get Curated" desc="AI generates your custom feed." />
            <Step number="4" icon={<BookOpen />} title="Read & Share" desc="Save articles and alert friends." />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50/50 relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Simple Pricing</h2>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-2">Lifetime Access</h3>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-5xl font-extrabold">$0</span>
              <span className="text-muted-foreground text-lg">/ forever</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Providing high-quality information shouldnt have a price tag. 
              Enjoy full access to all our AI features at no cost
            </p>
            <ul className="space-y-4 mb-10 text-left">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5"/> Full AI Personalization</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5"/> Unlimited Daily Digests</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5"/> Global Source Access</li>
            </ul>
            <Link href="/signin" className="w-full">
              <Button className="w-full py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700">
                Join Now
              </Button>
            </Link>
            <p className="mt-6 text-sm italic text-gray-400">
               ❤️ by Dhayanithi
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t text-center text-muted-foreground relative z-10">
        <p>© 2024 Times of World. Built with Next.js & AI.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Step({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-blue-600 font-bold text-sm mb-1">STEP {number}</span>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}