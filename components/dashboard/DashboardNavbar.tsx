"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Globe, LogOut, User } from "lucide-react";

export function DashboardNavbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) return null;

  return (
    <header className="w-full bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <h1 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Times of World
            </h1>
          </Link>
        
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg">
              <User className="w-4 h-4 text-white/70" />
              <span 
                className="text-sm text-white/90"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                {user.email}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}