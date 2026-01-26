"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import WireframeDottedGlobe from "@/components/ui/wireframe-dotted-globe";
import { CheckCircle, XCircle, Calendar, Mail, Settings } from "lucide-react";

interface UserPreferences {
  categories: string[];
  frequency: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetch("/api/user-preferences")
      .then((response) => {
        if (response && response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setPreferences(data);
        }
      })
      .catch(() => {
        router.replace("/subscribe");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const handleUpdatePreferences = () => {
    router.push("/select");
  };

  const handleDeactivateNewsletter = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/user-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: false }),
      });

      if (response.ok) {
        setPreferences((prev) => (prev ? { ...prev, is_active: false } : null));
        alert("Newsletter deactivated successfully");
      }
    } catch (error) {
      console.error("Error deactivating newsletter:", error);
      alert("Failed to deactivate newsletter");
    }
  };

  const handleActivateNewsletter = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/user-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: true }),
      });

      if (response.ok) {
        setPreferences((prev) => (prev ? { ...prev, is_active: true } : null));
        alert("Newsletter activated successfully");
      }
    } catch (error) {
      console.error("Error activating newsletter:", error);
      alert("Failed to activate newsletter");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Static Blurred Globe Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-30 blur-sm scale-150">
            <WireframeDottedGlobe />
          </div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            {user && (
  <h1
    className="text-5xl font-bold text-white mb-4"
    style={{ fontFamily: "'Times New Roman', Times, serif" }}
  >
    {(() => {
      const email = user.email || "";
      const username = email.split("@")[0];
      // Replace dots and numbers with spaces
      const formattedName = username.replace(/[\d.]+/g, " ").toUpperCase().trim();
      return `WELCOME ${formattedName}`;
    })()}
  </h1>
)}
            <p className="text-xl text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Manage your personalized newsletter preferences
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Current Preferences Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Current Preferences
              </h2>

              {preferences ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      <Settings className="w-5 h-5" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {preferences.categories.map((category) => (
                        <span
                          key={category}
                          className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full text-sm font-medium"
                          style={{ fontFamily: "'Times New Roman', Times, serif" }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      <Calendar className="w-5 h-5" />
                      Frequency
                    </h3>
                    <p className="text-white/70 capitalize text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {preferences.frequency}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      <Mail className="w-5 h-5" />
                      Email
                    </h3>
                    <p className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {preferences.email}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-3" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      Status
                    </h3>
                    <div className="flex items-center gap-2">
                      {preferences.is_active ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        {preferences.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-3" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      Created
                    </h3>
                    <p className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {new Date(preferences.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60 mb-4 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    No preferences set yet
                  </p>
                  <Link
                    href="/select"
                    className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg text-black bg-white hover:bg-gray-200 transition-all"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    Set Up Newsletter
                  </Link>
                </div>
              )}
            </div>

            {/* Actions Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Actions
              </h2>

              <div className="space-y-4">
                <button
                  onClick={handleUpdatePreferences}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black text-base font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  <Settings className="w-5 h-5" />
                  Update Preferences
                </button>

                {preferences && (
                  <>
                    {preferences.is_active ? (
                      <button
                        onClick={handleDeactivateNewsletter}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/10 text-red-400 border border-red-500/30 text-base font-semibold rounded-lg hover:bg-red-500/20 transition-all"
                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                      >
                        <XCircle className="w-5 h-5" />
                        Pause Newsletter
                      </button>
                    ) : (
                      <button
                        onClick={handleActivateNewsletter}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500/10 text-green-400 border border-green-500/30 text-base font-semibold rounded-lg hover:bg-green-500/20 transition-all"
                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        Resume Newsletter
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              How it works
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>1</span>
                </div>
                <p className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Your newsletter is automatically generated based on your selected categories
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>2</span>
                </div>
                <p className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Newsletters are delivered to your email at 9 AM according to your chosen frequency
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>3</span>
                </div>
                <p className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  You can pause or resume your newsletter at any time
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>4</span>
                </div>
                <p className="text-white/70 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Update your preferences anytime to change categories or frequency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}