import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FinoRiseLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#0ea5e9" />
      <g transform="translate(8,8)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          fill="white"
        />
      </g>
    </svg>
  );
}

export default function Header() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // List of section IDs to track
      const sections = ['features', 'simulations', 'rewards', 'learning-paths'];
      const scrollPosition = window.scrollY + 100; // Header height (80px) + buffer

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection(''); // Clear active state if at top/hero
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FinoRiseLogo />
          <span className="text-xl font-bold text-white tracking-tight">FinoRise</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className={`transition-colors text-sm font-medium ${activeSection === 'features' ? 'text-[#0ea5e9]' : 'text-slate-300 hover:text-[#0ea5e9]'}`}
          >
            Features
          </a>
          <a 
            href="#simulations" 
            className={`transition-colors text-sm font-medium ${activeSection === 'simulations' ? 'text-[#0ea5e9]' : 'text-slate-300 hover:text-[#0ea5e9]'}`}
          >
            Simulations
          </a>
          <a 
            href="#rewards" 
            className={`transition-colors text-sm font-medium ${activeSection === 'rewards' ? 'text-[#0ea5e9]' : 'text-slate-300 hover:text-[#0ea5e9]'}`}
          >
            Rewards
          </a>
          <a 
            href="#learning-paths" 
            className={`transition-colors text-sm font-medium ${activeSection === 'learning-paths' ? 'text-[#0ea5e9]' : 'text-slate-300 hover:text-[#0ea5e9]'}`}
          >
            Paths
          </a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link 
            to="/auth/login" 
            className="text-white hover:text-[#0ea5e9] transition-colors text-xs md:text-sm font-semibold uppercase tracking-wider"
          >
            Login
          </Link>
          <Link 
            to="/auth/register" 
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition shadow-lg hover:shadow-xl uppercase tracking-wider"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}