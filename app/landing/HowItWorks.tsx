import { useState, useEffect } from 'react';
import { UserPlus, Sliders, Newspaper } from 'lucide-react';

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Sign Up',
      desc: 'Create your free account in seconds and set up your preferences.',
      badge: 'Step One',
      icon: UserPlus,
    },
    {
      number: '2',
      title: 'Customize',
      desc: 'Choose your topics of interest and let our AI learn your preferences.',
      badge: 'Step Two',
      icon: Sliders,
    },
    {
      number: '3',
      title: 'Stay Informed',
      desc: 'Receive curated news updates tailored specifically for you, every day.',
      badge: 'Step Three',
      icon: Newspaper,
    },
  ];

  return (
    <div className="min-h-screen via-gray-800 to-gray-900 flex items-center justify-center p-8">
      <style>{`
        .flip-card {
          perspective: 1000px;
          width: 350px;
          height: 400px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 1);
        }

        .flip-card-front {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(31, 41, 55, 0.9));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border: 1px solid rgba(107, 114, 128, 0.3);
        }

        .flip-card-back {
          background: linear-gradient(135deg, rgba(68, 128, 239, 0.1), rgba(9, 41, 70, 0.48));
          background-color: rgba(26, 4, 59, 0.95);
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full">
        <h2 
          className={`text-6xl md:text-7xl font-bold text-center text-white mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          How It Works
        </h2>
        
        <div className="flex justify-center items-stretch gap-8 flex-wrap">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className={`flip-card transition-all duration-700`}
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="flip-card-inner">
                  {/* Front of Card */}
                  <div className="flip-card-front">
                    <div className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                      <span 
                        className="text-xs font-semibold text-white uppercase tracking-wider" 
                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                      >
                        {step.badge}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <Icon className="w-20 h-20 text-orange-400" />
                    </div>
                    
                    <h3 
                      className="text-3xl font-bold text-white mb-4" 
                      style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    >
                      {step.title}
                    </h3>
                    
                    <p 
                      className="text-gray-300 text-center text-base leading-relaxed" 
                      style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Back of Card */}
                  <div className="flip-card-back">
                    <div 
                      className="text-8xl font-bold mb-6" 
                      style={{ 
                        background: 'linear-gradient(135deg, #ff9966, #ff5e62)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Times New Roman', Times, serif"
                      }}
                    >
                      {step.number}
                    </div>
                    
                    <h3 
                      className="text-4xl font-bold text-white mb-4" 
                      style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    >
                      {step.title}
                    </h3>
                    
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4"></div>
                    
                    <p 
                      className="text-gray-200 text-center text-base leading-relaxed" 
                      style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
        </div>
      </div>
    </div>
  );
}