"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import WireframeDottedGlobe from "@/components/ui/wireframe-dotted-globe";
import { CheckCircle, Circle } from "lucide-react";

const categories = [
  {
    id: "technology",
    name: "Technology",
    description: "Latest tech news and innovations",
  },
  {
    id: "business",
    name: "Business",
    description: "Business trends and market updates",
  },
  { id: "sports", name: "Sports", description: "Sports news and highlights" },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, TV, and celebrity news",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific discoveries and research",
  },
  { id: "health", name: "Health", description: "Health and wellness updates" },
  {
    id: "politics",
    name: "Politics",
    description: "Political news and current events",
  },
  {
    id: "environment",
    name: "Environment",
    description: "Climate and environmental news",
  },
];

const frequencyOptions = [
  { id: "daily", name: "Daily", description: "Every day" },
  { id: "weekly", name: "Weekly", description: "Once a week" },
  { id: "biweekly", name: "Bi-weekly", description: "Twice a week" },
];

export default function SelectPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("weekly");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      alert("Please select at least one category");
      return;
    }

    if (!user || !user.email) {
      alert("Please sign in to continue");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/user-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          categories: selectedCategories,
          frequency: selectedFrequency,
          email: user.email,
          is_active: true,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save preferences");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert(error instanceof Error ? error.message : "Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="opacity-10 blur-sm scale-150">
                  <WireframeDottedGlobe/>
                </div>
              </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Customize Your Newsletter
          </h1>
          <p className="text-xl text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Select your interests and delivery frequency to start receiving personalized newsletters
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {/* Categories Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Choose Your Categories
            </h2>
            <p className="text-white/70 mb-8 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Select the topics you'd like to see in your personalized newsletter
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`relative flex items-start p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedCategories.includes(category.id)
                      ? "border-white bg-white/10"
                      : "border-white/20 hover:border-white/40 bg-white/5"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <div className="flex items-center h-6">
                    {selectedCategories.includes(category.id) ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Circle className="w-6 h-6 text-white/40" />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-semibold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {category.name}
                    </div>
                    <div className="text-sm text-white/60" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {category.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="text-base text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              {selectedCategories.length} categor{selectedCategories.length !== 1 ? "ies" : "y"} selected
            </div>
          </div>

          {/* Frequency Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Delivery Frequency
            </h2>
            <p className="text-white/70 mb-8 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              How often would you like to receive your newsletter?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {frequencyOptions.map((frequency) => (
                <label
                  key={frequency.id}
                  className={`relative flex items-start p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedFrequency === frequency.id
                      ? "border-white bg-white/10"
                      : "border-white/20 hover:border-white/40 bg-white/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    className="sr-only"
                    checked={selectedFrequency === frequency.id}
                    onChange={() => setSelectedFrequency(frequency.id)}
                  />
                  <div className="flex items-center h-6">
                    <div
                      className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                        selectedFrequency === frequency.id
                          ? "border-white bg-white"
                          : "border-white/40"
                      }`}
                    >
                      {selectedFrequency === frequency.id && (
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-semibold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {frequency.name}
                    </div>
                    <div className="text-sm text-white/60" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {frequency.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="text-base text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              {selectedCategories.length} categor{selectedCategories.length !== 1 ? "ies" : "y"} selected • {selectedFrequency} delivery
            </div>
            <button
              onClick={handleSavePreferences}
              disabled={selectedCategories.length === 0 || isSaving}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                selectedCategories.length === 0 || isSaving
                  ? "bg-white/20 text-white/40 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}