"use client";

import { createClient } from "@/lib/client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Mail, Lock, User, Globe } from "lucide-react";
import WireframeDottedGlobe from "@/components/ui/wireframe-dotted-globe";

// Floating Particles Component
const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      private canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// Animated Form Field Component
interface AnimatedFormFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
  required?: boolean;
}

const AnimatedFormField = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  showToggle,
  onToggle,
  showPassword,
  required
}: AnimatedFormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="relative group">
      <div
        className="relative overflow-hidden rounded-lg border border-white/20 bg-white/5 transition-all duration-300 ease-in-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 transition-colors duration-200 group-focus-within:text-white">
          {icon}
        </div>
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full bg-transparent pl-10 pr-12 py-3 text-white placeholder:text-white/40 focus:outline-none"
          placeholder=""
        />
        
        <label className={`absolute left-10 transition-all duration-200 ease-in-out pointer-events-none ${
          isFocused || value 
            ? 'top-2 text-xs text-white font-medium' 
            : 'top-1/2 -translate-y-1/2 text-sm text-white/50'
        }`} style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          {placeholder}
        </label>

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
            }}
          />
        )}
      </div>
    </div>
  );
};

// Main Sign In Component
export default function SigninPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  async function handleAuth(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email, 
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + '/dashboard'// Make sure to use NEXT_PUBLIC_ prefix
  }
});
        if (error) throw error;
        setMessage("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password});
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error("Error during authentication:", error);
      setMessage(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      <FloatingParticles />
      
      {/* Left Side - Globe */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="text-center w-full">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Globe className="w-7 h-7 text-black" />
              </div>
              <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Times of World
              </h1>
            </div>
            <p className="text-xl text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Your Personalized AI Newsletter
            </p>
          </div>
          
          {/* Wireframe Dotted Globe */}
          <div className="relative flex items-center justify-center" style={{ height: '600px' }}>
            <div className="relative" style={{ opacity: 1, pointerEvents: 'auto' }}>
              <WireframeDottedGlobe 
                width={600} 
                height={600}
                className="relative"
              />
            </div>
          </div>
          
          <p className="mt-8 text-white/50 text-sm" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Times of World
                </h1>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
              </p>
            </div>

            {message && (
              <div className="mb-6 bg-white/10 border border-white/20 text-white text-sm p-3 rounded-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {message}
              </div>
            )}

            <div className="space-y-6">
              <AnimatedFormField
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                required
              />

              <AnimatedFormField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                showToggle
                onToggle={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
                required
              />

              {!isSignUp && (
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm text-white hover:underline"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                onClick={handleAuth}
                disabled={isSubmitting}
                className="w-full relative group bg-white text-black py-3 px-4 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </span>
                
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/70" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-white hover:underline font-semibold"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}