// components/Navbar.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 0);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isClient || loading) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Globe Icon */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Times of World
            </h1>
          </Link>
        
          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-white font-medium transition-colors"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-300 hover:text-white font-medium transition-colors"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              How It Works
            </button>
            
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/signin" 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}