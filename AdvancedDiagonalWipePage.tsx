// src/app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// --- DUMMY IMAGES (White Background) ---
const DUMMY_IMAGE_SIZE = "800x600";
const DUMMY_IMAGE_BG_COLOR = "0A0A0A"; // Dark BG for image placeholder to blend
const DUMMY_IMAGE_TEXT_COLOR = "05C15C"; // Green text
const FONT = "montserrat";

const dummyImage = (text: string, size: string = DUMMY_IMAGE_SIZE) => `https://placehold.co/${size}/${DUMMY_IMAGE_BG_COLOR}/${DUMMY_IMAGE_TEXT_COLOR}/png?text=${encodeURIComponent(text)}&font=${FONT}`;

const images = {
  hero: dummyImage("Innovate", "1200x800"),
  features: dummyImage("Dynamic Tech"),
  services: dummyImage("Our Services", "600x400"), // Smaller for cards
  process: dummyImage("Our Process"),
  vision: dummyImage("Future Vision", "1200x800"),
};

// --- INTERFACES ---
interface NavLink {
  href: string;
  label: string;
  icon?: string; // Optional icon for menu
}

interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  textSide: 'left' | 'right' | 'center';
  wipeDirection: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  bgColor?: string;
  textColor?: string;
  cta?: { text: string; href: string };
  content?: React.ReactNode;
}

// --- DATA ---
const navLinks: NavLink[] = [
  { href: '#hero', label: 'Home', icon: '🏠' },
  { href: '#features', label: 'Features', icon: '✨' },
  { href: '#services', label: 'Services', icon: '🛠️' },
  { href: '#process', label: 'Process', icon: '⚙️' },
  { href: '#vision', label: 'Vision', icon: '🚀' },
  { href: '#contact', label: 'Contact', icon: '📬' },
];

const sectionsData: SectionData[] = [
  {
    id: 'hero',
    title: 'Innovate with Unrivaled Precision',
    description:
      'Dive into the future with solutions crafted for tomorrow. We merge breakthrough technology with inspired creativity to forge unparalleled digital experiences.',
    imageUrl: images.hero,
    imageAlt: 'Abstract representation of innovation and code',
    textSide: 'left',
    wipeDirection: 'top-left',
    cta: { text: 'Discover Our Edge', href: '#features' },
  },
  {
    id: 'features',
    title: 'Dynamic Capabilities Unleashed',
    subtitle: 'Engineered for Excellence, Designed for You',
    description:
      'Our platform is a symphony of power and adaptability. Experience a suite of features that seamlessly integrate and elevate your performance to new heights.',
    imageUrl: images.features,
    imageAlt: 'Sleek display of modern electronic components',
    textSide: 'right',
    wipeDirection: 'top-right',
    bgColor: '#101010',
  },
  {
    id: 'services',
    title: 'Tailored Services, Transformative Outcomes',
    description: 'From concept to execution, we offer a comprehensive range of services to bring your vision to life.',
    textSide: 'center',
    wipeDirection: 'bottom-left',
    bgColor: '#080808',
    content: (
      <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[
          { title: 'Strategy & Consulting', icon: '💡', desc: 'Expert insights for impactful digital roadmaps.' },
          { title: 'UX/UI Design', icon: '🎨', desc: 'Intuitive interfaces that captivate and convert.' },
          { title: 'Web & App Development', icon: '💻', desc: 'Robust and scalable solutions, built to perform.' },
        ].map((service, i) => (
          <div key={service.title} className={`service-card bg-neutral-800/70 p-6 rounded-xl shadow-xl border border-green-500/10 transition-all duration-300 hover:border-green-500/50 hover:shadow-green-500/20 hover:transform hover:-translate-y-2 animate-fadeInUp`} style={{ animationDelay: `${0.9 + i * 0.15}s`, willChange: 'transform, box-shadow, border-color' }}>
            <div className="text-green-400 text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-100">{service.title}</h3>
            <p className="text-slate-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'process',
    title: 'Our Streamlined & Agile Process',
    description:
      'We follow a meticulous and agile process: Discover, Design, Develop, Deploy, and Iterate. This ensures quality, efficiency, and client satisfaction at every stage.',
    imageUrl: images.process,
    imageAlt: 'Diagram of a streamlined development process',
    textSide: 'left',
    wipeDirection: 'bottom-right',
    bgColor: '#121212',
  },
  {
    id: 'vision',
    title: 'Charting the Course for a Bold Future',
    subtitle: 'Innovation is Our Compass, Progress Our Destination',
    description:
      "Embark with us on a journey to redefine boundaries. Our unwavering commitment is to pioneer next-generation advancements and craft experiences that resonate and transform industries.",
    imageUrl: images.vision,
    imageAlt: 'A visionary and futuristic cityscape at dusk',
    textSide: 'right',
    wipeDirection: 'top-left',
    cta: { text: "Let's Build Tomorrow", href: '#contact' },
  },
  {
    id: 'contact', // Simple contact section
    title: 'Connect With Us',
    description: "Ready to start your next project or have a question? We're here to help.",
    textSide: 'center',
    wipeDirection: 'bottom-left',
    bgColor: '#0F0F0F',
    content: (
        <form className="mt-8 max-w-xl mx-auto animate-fadeInUp" style={{ animationDelay: '1s'}}>
            <div className="grid grid-cols-1 gap-6">
                <input type="text" placeholder="Your Name" className="contact-input" />
                <input type="email" placeholder="Your Email" className="contact-input" />
                <textarea placeholder="Your Message" rows={4} className="contact-input"></textarea>
                <button type="submit" className="px-8 py-3 bg-green-500 text-black font-semibold rounded-lg shadow-lg hover:bg-green-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 self-center mx-auto">
                    Send Message
                </button>
            </div>
        </form>
    )
  }
];

// --- COMPONENT ---
const AdvancedDiagonalWipePage: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null); // Ref for menu overlay

  // Scroll observer for sections
  useEffect(() => {
    const observerOptions = { root: null, threshold: 0.25, rootMargin: "-10% 0px -35% 0px" };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionElement = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          sectionElement.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const currentSectionRefs = sectionRefs.current;
    currentSectionRefs.forEach((ref) => {
      if (ref) sectionObserver.observe(ref);
    });

    return () => {
      currentSectionRefs.forEach((ref) => {
        if (ref) sectionObserver.unobserve(ref);
      });
    };
  }, []);

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 30) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on link click
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Smooth scroll with a slight offset for the fixed header
      const headerOffset = headerRef.current?.offsetHeight || 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }; // Cleanup
  }, [isMenuOpen]);


  // Subtle Parallax for Hero Image
  useEffect(() => {
    const heroImage = document.querySelector<HTMLElement>('#hero .animated-image-container img');
    if (!heroImage) return;

    const handleHeroParallax = () => {
      const scrollY = window.scrollY;
      // Apply a very subtle parallax, ensure it only affects hero image when it's somewhat in view
      if (scrollY < window.innerHeight) { // Only when hero section is near top
        heroImage.style.transform = `translateY(${scrollY * 0.05}px) scale(1.05)`; // Slower factor, keeps hover scale
      }
    };
    window.addEventListener('scroll', handleHeroParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleHeroParallax);
  }, []);


  return (
    <>
      <style jsx global>{`
        :root {
          --color-primary-green: #05c15c; /* Vibrant Green */
          --color-secondary-green: #04a84f; /* Slightly Darker Green */
          --color-dark-bg: #0A0A0A; /* Main Dark Background */
          --color-dark-bg-alt: #0D0D0D; /* Slightly Lighter Dark */
          --color-text-light: #E5E7EB; /* Tailwind gray-200 */
          --color-text-medium: #9CA3AF; /* Tailwind gray-400 */
          --header-height-initial: 80px;
          --header-height-scrolled: 65px;
          --easing-slick: cubic-bezier(0.25, 1, 0.5, 1); /* Smooth and responsive */
          --easing-dramatic: cubic-bezier(0.77, 0, 0.18, 1); /* For section wipes */
        }
        html { scroll-behavior: smooth; }
        body {
          background-color: var(--color-dark-bg);
          color: var(--color-text-light);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overscroll-behavior-y: contain; /* Better scroll control */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* --- KEYFRAMES --- */
        @keyframes diagonalWipeTopLeft {
          0% { clip-path: polygon(-5% -5%, 5% -5%, -5% 5%, -5% -5%); opacity: 1; transform: translate(-2%, -2%); }
          50% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; transform: translate(0, 0); }
          100% { clip-path: polygon(95% 105%, 105% 105%, 105% 95%, 95% 105%); opacity: 1; transform: translate(2%, 2%); }
        }
        @keyframes diagonalWipeTopRight {
          0% { clip-path: polygon(95% -5%, 105% -5%, 105% 5%, 95% -5%); opacity: 1; transform: translate(2%, -2%);}
          50% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; transform: translate(0, 0);}
          100% { clip-path: polygon(-5% 105%, 5% 105%, -5% 95%, -5% 105%); opacity: 1; transform: translate(-2%, 2%);}
        }
        @keyframes diagonalWipeBottomLeft {
          0% { clip-path: polygon(-5% 95%, 5% 105%, -5% 105%, -5% 95%); opacity: 1; transform: translate(-2%, 2%);}
          50% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; transform: translate(0, 0);}
          100% { clip-path: polygon(95% -5%, 105% -5%, 105% 5%, 95% -5%); opacity: 1; transform: translate(2%, -2%);}
        }
        @keyframes diagonalWipeBottomRight {
          0% { clip-path: polygon(95% 95%, 105% 95%, 105% 105%, 95% 95%); opacity: 1; transform: translate(2%, 2%);}
          50% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; transform: translate(0, 0);}
          100% { clip-path: polygon(-5% -5%, 5% -5%, -5% 5%, -5% -5%); opacity: 1; transform: translate(-2%, -2%);}
        }

        @keyframes menuWipeOpen { /* From top-right for menu */
          0% { clip-path: circle(0% at calc(100% - 40px) 40px); } /* Start near hamburger */
          100% { clip-path: circle(150% at calc(100% - 40px) 40px); } /* Expand beyond screen */
        }
        @keyframes menuWipeClose { /* To top-right for menu */
          0% { clip-path: circle(150% at calc(100% - 40px) 40px); }
          100% { clip-path: circle(0% at calc(100% - 40px) 40px); }
        }

        @keyframes fadeInText { /* General text fade in */
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes titleCharReveal { /* Title character animation */
          0% { opacity: 0; transform: translateY(15px) rotateX(-30deg) skewY(5deg); }
          60% { opacity: 0.8; transform: translateY(-2px) rotateX(5deg) skewY(-1deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg) skewY(0deg); }
        }
        @keyframes fadeInImage {
          0% { opacity: 0; transform: scale(1.1) rotate(-2deg); filter: contrast(0.8) saturate(0.7); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); filter: contrast(1) saturate(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* --- GLOBAL STYLES & RESETS --- */
        .container-custom { width: 100%; max-width: 1320px; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }
        @media (min-width: 768px) { .container-custom { padding-left: 2rem; padding-right: 2rem; } }
        @media (min-width: 1280px) { .container-custom { padding-left: 2.5rem; padding-right: 2.5rem; } }


        /* --- HEADER & NAV --- */
        .site-header {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
          transition: background-color 0.4s var(--easing-slick), box-shadow 0.4s var(--easing-slick), height 0.4s var(--easing-slick);
          height: var(--header-height-initial);
          will-change: background-color, box-shadow, height;
        }
        .site-header.scrolled {
          background-color: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          height: var(--header-height-scrolled);
        }
        .header-content { display: flex; justify-content: space-between; align-items: center; height: 100%; }
        .logo { font-size: 1.8rem; font-weight: 800; color: var(--color-primary-green); letter-spacing: -0.5px; transition: transform 0.3s var(--easing-slick); }
        .logo:hover { transform: scale(1.05); }
        
        .hamburger-btn {
          z-index: 1010; /* Above mobile menu overlay */
          background: none; border: none; padding: 0.5rem; cursor: pointer;
          display: flex; flex-direction: column; justify-content: space-around;
          width: 32px; height: 26px; /* Fixed size for consistent line spacing */
          transition: transform 0.3s var(--easing-slick);
        }
        .hamburger-btn:hover { transform: scale(1.1); }
        .hamburger-line {
          display: block; width: 100%; height: 3px; background-color: var(--color-text-light);
          border-radius: 3px; transition: transform 0.35s var(--easing-slick), opacity 0.25s ease;
          transform-origin: center;
          will-change: transform, opacity;
        }
        .hamburger-btn.open .line-1 { transform: translateY(calc(26px / 2 - 3px / 2)) rotate(45deg); } /* Calculate dynamic translation */
        .hamburger-btn.open .line-2 { transform: scaleX(0); opacity: 0; }
        .hamburger-btn.open .line-3 { transform: translateY(calc(-26px / 2 + 3px / 2)) rotate(-45deg); }

        .nav-menu-overlay { /* Replaces nav-mobile-overlay for clarity */
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh; /* Ensure full viewport */
          background-color: var(--color-dark-bg-alt);
          border-left: 2px solid var(--color-primary-green); /* Green accent */
          z-index: 999;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          opacity: 0;
          pointer-events: none;
          animation-fill-mode: forwards; /* Keep final state of animation */
          will-change: clip-path, opacity;
        }
        .nav-menu-overlay.open-anim {
          animation: menuWipeOpen 0.7s var(--easing-slick) forwards;
          opacity: 1; pointer-events: auto;
        }
        .nav-menu-overlay.close-anim {
          animation: menuWipeClose 0.6s var(--easing-slick) forwards;
          opacity: 0; pointer-events: none; /* Ensure it's non-interactive when closing */
        }
        .nav-menu ul { list-style: none; padding: 0; text-align: center; }
        .nav-menu li { margin-bottom: 1.2rem; opacity: 0; transform: translateX(-30px); }
        .nav-menu-overlay.open-anim li {
          animation: fadeInText 0.5s var(--easing-slick) forwards;
        }
        .nav-menu a {
          font-size: clamp(1.5rem, 5vw, 2.2rem); /* Responsive font size */
          color: var(--color-text-light); font-weight: 600; text-decoration: none;
          padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.75rem;
          transition: color 0.3s, transform 0.3s var(--easing-slick);
        }
        .nav-menu a:hover { color: var(--color-primary-green); transform: translateX(5px) scale(1.03); }
        .nav-menu a .menu-icon { font-size: 1.2em; /* Relative to link font size */ }

        /* --- SECTION STYLING --- */
        .wipe-section {
          position: relative; min-height: 100vh;
          padding-top: calc(var(--header-height-initial) + 2rem); /* Ensure content below header */
          padding-bottom: 4rem;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; /* Critical for clip-path */
          will-change: background-color;
        }
        .wipe-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-color: var(--color-primary-green);
          z-index: 20; opacity: 0; pointer-events: none;
          will-change: clip-path, transform, opacity;
        }
        /* Applying the wipe animations */
        .wipe-section.is-visible .wipe-overlay-tl { animation: diagonalWipeTopLeft 1.4s var(--easing-dramatic) forwards; }
        .wipe-section.is-visible .wipe-overlay-tr { animation: diagonalWipeTopRight 1.4s var(--easing-dramatic) forwards; }
        .wipe-section.is-visible .wipe-overlay-bl { animation: diagonalWipeBottomLeft 1.4s var(--easing-dramatic) forwards; }
        .wipe-section.is-visible .wipe-overlay-br { animation: diagonalWipeBottomRight 1.4s var(--easing-dramatic) forwards; }

        .section-content-wrapper {
          position: relative; z-index: 10; opacity: 0;
          transition: opacity 0.7s var(--easing-slick) 0.8s; /* Delay after wipe (wipe duration / 2 + small buffer) */
          will-change: opacity;
        }
        .wipe-section.is-visible .section-content-wrapper { opacity: 1; }

        .section-title-char {
          display: inline-block; opacity: 0; transform-origin: bottom center;
          will-change: opacity, transform;
        }
        .wipe-section.is-visible .section-title-char { animation: titleCharReveal 0.8s var(--easing-slick) forwards; }
        
        .section-subtitle, .section-description, .section-cta, .service-card, .contact-input, form button {
          opacity: 0; will-change: opacity, transform;
        }
        .wipe-section.is-visible .section-subtitle { animation: fadeInText 0.7s var(--easing-slick) forwards; animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.2s); }
        .wipe-section.is-visible .section-description { animation: fadeInText 0.7s var(--easing-slick) forwards; animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.4s); }
        .wipe-section.is-visible .section-cta { animation: fadeInUp 0.6s var(--easing-slick) forwards; animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.6s); }
        
        /* Specific for service cards within .is-visible section */
        .wipe-section.is-visible .service-card { animation-name: fadeInUp; animation-duration: 0.6s; animation-timing-function: var(--easing-slick); animation-fill-mode: forwards; }
        /* Initial delay for service cards container, then individual delays handled by inline style */
        .wipe-section.is-visible .grid { animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.5s); }
        
        .animated-image-container {
          opacity: 0; will-change: opacity, transform, filter;
          border-radius: 1rem; /* Tailwind rounded-xl */
          box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 40px rgba(var(--color-primary-green-rgb), 0.1);
        }
        .wipe-section.is-visible .animated-image-container {
          animation: fadeInImage 1.3s var(--easing-slick) forwards calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.3s);
        }
        .animated-image-container img {
          transition: transform 0.6s var(--easing-slick); /* For parallax and hover */
          border-radius: 1rem; /* Match container */
        }
        .animated-image-container:hover img { transform: scale(1.05) translateY(-5px); }
        
        .contact-input {
            background-color: rgba(255,255,255,0.05);
            border: 1px solid rgba(var(--color-primary-green-rgb), 0.3);
            border-radius: 0.5rem; padding: 0.75rem 1rem; color: var(--color-text-light);
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        .contact-input:focus {
            outline: none; border-color: var(--color-primary-green);
            box-shadow: 0 0 0 3px rgba(var(--color-primary-green-rgb), 0.2);
        }
        .wipe-section.is-visible form input, .wipe-section.is-visible form textarea, .wipe-section.is-visible form button {
            animation-name: fadeInUp; animation-duration: 0.6s; animation-timing-function: var(--easing-slick); animation-fill-mode: forwards;
        }
        /* Stagger form elements */
        .wipe-section.is-visible form input:nth-child(1) { animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.5s); }
        .wipe-section.is-visible form input:nth-child(2) { animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.6s); }
        .wipe-section.is-visible form textarea { animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.7s); }
        .wipe-section.is-visible form button { animation-delay: calc(0.8s + ${sectionsData[0].title.length * 0.02}s + 0.8s); }


        /* --- MEDIA QUERIES (Tailwind lg is 1024px) --- */
        @media (max-width: 767px) { /* md breakpoint for single column content */
           .section-content-grid {
             grid-template-columns: 1fr !important; /* Force single column */
           }
           /* Ensure text is naturally before image on mobile if it's not centered */
           .section-content-grid > div:not([class*="lg:col-span-2"]) { order: initial !important; }
           .section-content-grid > .animated-image-container { margin-top: 2.5rem; }
           .section-title { font-size: clamp(2.2rem, 7vw, 3rem) !important; }
           .section-subtitle { font-size: clamp(1.1rem, 4vw, 1.25rem) !important; }
           .nav-menu a { font-size: clamp(1.4rem, 6vw, 1.8rem); }
        }
        
        /* Add RGB version of primary green for box-shadows with alpha */
        :root { --color-primary-green-rgb: 5, 193, 92; }

      `}</style>

      <header ref={headerRef} className="site-header">
        <div className="container-custom header-content">
          <a href="#hero" className="logo" onClick={(e) => handleNavLinkClick(e, '#hero')}>WIPE.IO</a>
          <button 
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu-overlay"
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>
      </header>

      <div 
        id="nav-menu-overlay"
        ref={menuOverlayRef}
        className={`nav-menu-overlay ${isMenuOpen ? 'open-anim' : (menuOverlayRef.current?.classList.contains('open-anim') ? 'close-anim' : '')}`}
        // The logic above ensures close-anim only runs if it was previously open-anim
      >
        <nav className="nav-menu">
          <ul style={{padding:0}}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${isMenuOpen ? i * 0.07 + 0.3 : 0}s`}}>
                <a href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)}>
                  {link.icon && <span className="menu-icon mr-3">{link.icon}</span>}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <main className="w-full">
        {sectionsData.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className="wipe-section"
            style={{ 
              backgroundColor: section.bgColor || 'var(--color-dark-bg)',
              color: section.textColor || 'var(--color-text-light)',
            }}
          >
            <div
              className={`wipe-overlay ${
                section.wipeDirection === 'top-left' ? 'wipe-overlay-tl' :
                section.wipeDirection === 'top-right' ? 'wipe-overlay-tr' :
                section.wipeDirection === 'bottom-left' ? 'wipe-overlay-bl' :
                'wipe-overlay-br'
              }`}
            />

            <div className="section-content-wrapper container-custom py-10 lg:py-16 w-full"> {/* Reduced padding a bit */}
              <div className={`grid grid-cols-1 ${section.imageUrl && section.textSide !== 'center' ? 'md:grid-cols-2' : ''} gap-10 lg:gap-16 items-center section-content-grid`}>
                
                <div className={`space-y-4 md:space-y-6 
                  ${section.textSide === 'left' && section.imageUrl ? 'md:order-1' : ''}
                  ${section.textSide === 'right' && section.imageUrl ? 'md:order-2' : ''}
                  ${section.textSide === 'center' ? 'md:col-span-2 text-center' : ''}
                `}>
                  <h2 className="section-title text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
                    {section.title.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="section-title-char"
                        style={{ animationDelay: `${0.8 + charIndex * 0.025}s` }} // Faster stagger
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h2>
                  {section.subtitle && (
                    <p className="section-subtitle text-lg lg:text-xl text-green-400 font-medium">
                      {section.subtitle}
                    </p>
                  )}
                  <p className="section-description text-md lg:text-lg text-slate-300/90 leading-relaxed max-w-xl ${section.textSide === 'center' ? 'mx-auto' : ''}`">
                    {section.description}
                  </p>
                  {section.cta && (
                    <a
                      href={section.cta.href}
                      onClick={(e) => section.cta?.href.startsWith('#') && handleNavLinkClick(e, section.cta.href)}
                      className="section-cta mt-5 md:mt-8 inline-block px-7 py-3 sm:px-8 sm:py-3.5 bg-green-500 text-black font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:bg-green-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                    >
                      {section.cta.text}
                    </a>
                  )}
                  {section.content}
                </div>

                {section.imageUrl && section.textSide !== 'center' && (
                  <div
                    className={`animated-image-container relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px]
                      ${section.textSide === 'left' ? 'md:order-2' : 'md:order-1'}`}
                  >
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt || section.title}
                      layout="fill"
                      objectFit="cover"
                      priority={index < 2} // Prioritize first two images
                      unoptimized={true} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/0 pointer-events-none"></div>
                    <div className="absolute inset-0 border-2 border-green-600/20 rounded-xl pointer-events-none group-hover:border-green-500/40 transition-colors duration-300"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="text-center py-12 md:py-16 bg-neutral-950 text-slate-500 border-t border-neutral-800/70">
        <div className="container-custom">
          <a href="#hero" className="logo text-2xl mb-4 !text-slate-600 hover:!text-slate-500 transition-colors" onClick={(e) => handleNavLinkClick(e, '#hero')}>WIPE.IO</a>
          <nav className="mb-6">
            <ul className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
              {navLinks.map(link => (
                <li key={`footer-${link.href}`}>
                  <a href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="text-sm text-slate-400 hover:text-green-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} Advanced Wipes Inc. Crafted with Precision.</p>
        </div>
      </footer>
    </>
  );
};

export default AdvancedDiagonalWipePage;
