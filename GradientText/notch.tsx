import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

const Particles = dynamic(() => import("react-tsparticles").then((m) => m.default), { ssr: false });
const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), { ssr: false });
const Tilt = dynamic(() => import("react-parallax-tilt").then((m) => m.default), { ssr: false });

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2 },
  }),
};

interface Feature {
  title: string;
  description: string;
  lottieUrl: string;
}

const features: Feature[] = [
  {
    title: "Fast Performance",
    description: "Experience lightning-quick load times and seamless browsing.",
    lottieUrl: "https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json",
  },
  {
    title: "Secure by Design",
    description: "Top-tier security built into every layer of our product.",
    lottieUrl: "https://assets4.lottiefiles.com/packages/lf20_myejiggj.json",
  },
  {
    title: "Intuitive UI",
    description: "An interface so easy you already know how to use it.",
    lottieUrl: "https://assets3.lottiefiles.com/packages/lf20_touohxv0.json",
  },
];

interface Testimonial {
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "This product transformed our workflow and doubled conversions.",
    author: "Jordan, Growth Lead",
  },
  {
    quote: "The animations and UX feel world-class. Our team loves it!",
    author: "Avery, Product Manager",
  },
];

interface Plan {
  tier: string;
  price: string;
  features: string[];
  highlight?: boolean;
  color?: string;
}

const plans: Plan[] = [
  {
    tier: "Starter",
    price: "$19/mo",
    features: ["Basic analytics", "Email support", "Single user"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    tier: "Pro",
    price: "$49/mo",
    features: ["Advanced analytics", "Priority support", "Up to 5 users"],
    highlight: true,
    color: "from-pink-500 to-yellow-400",
  },
  {
    tier: "Enterprise",
    price: "Custom",
    features: ["Full analytics", "Dedicated support", "Unlimited users"],
    color: "from-green-400 to-teal-500",
  },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#cta" },
];

// Custom cursor colors
const cursorColors = [
  "bg-gradient-to-br from-pink-500 to-yellow-400",
  "bg-gradient-to-br from-cyan-400 to-blue-500",
  "bg-gradient-to-br from-green-400 to-teal-500",
  "bg-gradient-to-br from-purple-500 to-pink-500",
];

const floatingShapes = [
  { className: "w-24 h-24 bg-gradient-to-br from-pink-500 to-yellow-400 opacity-30 blur-2xl rounded-full absolute top-32 left-10 animate-pulse-slow" },
  { className: "w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20 blur-2xl rounded-full absolute top-1/2 right-10 animate-pulse-slow" },
  { className: "w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 opacity-20 blur-2xl rounded-full absolute bottom-24 left-1/3 animate-pulse-slow" },
  { className: "w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-2xl rounded-full absolute bottom-10 right-1/4 animate-pulse-slow" },
];

// Custom Cursor Component
const CoolCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const enter = (e: Event) => {
      setHovering(true);
      setColorIdx((idx) => (idx + 1) % cursorColors.length);
    };
    const leave = (e: Event) => setHovering(false);
    const hoverables = document.querySelectorAll(".cursor-hoverable");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [colorIdx]);

  return (
    <div
      ref={cursorRef}
      style={{
        left: pos.x - (hovering ? 32 : 16),
        top: pos.y - (hovering ? 32 : 16),
        pointerEvents: "none",
        zIndex: 50,
      }}
      className={`fixed transition-all duration-200 ease-out ${hovering ? "w-16 h-16" : "w-8 h-8"} ${cursorColors[colorIdx]} ${hovering ? "opacity-80 scale-110" : "opacity-60"} rounded-full mix-blend-difference shadow-2xl`}
    />
  );
};

// Notch Navbar
const NotchNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex justify-center items-center h-20 bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="relative flex items-center w-full max-w-6xl px-6">
        {/* Logo */}
        <motion.a
          href="#"
          className="text-2xl font-extrabold tracking-tight text-white flex items-center cursor-pointer"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="bg-gradient-to-br from-pink-500 to-yellow-400 bg-clip-text text-transparent mr-2">notch</span>
          <span className="hidden md:inline text-gray-400 font-light">site</span>
        </motion.a>
        {/* Notch SVG */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="block">
            <path d="M0 0 Q40 40 80 0" stroke="#222" strokeWidth="4" fill="none" />
            <path d="M10 0 Q40 30 70 0" stroke="#333" strokeWidth="2" fill="none" />
          </svg>
        </div>
        {/* Nav Links */}
        <div className="flex-1 flex justify-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative px-2 py-1 text-white font-medium cursor-pointer cursor-hoverable"
              whileHover={{ color: "#f472b6", scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5, type: "spring" }}
            >
              {link.label}
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
                whileHover={{ scaleX: 1 }}
              />
            </motion.a>
          ))}
        </div>
        {/* CTA Button */}
        <motion.a
          href="#pricing"
          className="ml-auto bg-gradient-to-br from-pink-500 to-yellow-400 text-black font-bold px-5 py-2 rounded-lg shadow-lg cursor-pointer cursor-hoverable hover:scale-105 transition-transform"
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Get Started
        </motion.a>
      </div>
    </nav>
  );
};

const LandingPage: React.FC = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 400], [0, 150]);
  const [lottieData, setLottieData] = useState<(object | null)[]>(Array(features.length).fill(null));

  useEffect(() => {
    features.forEach((feature, idx) => {
      fetch(feature.lottieUrl)
        .then((res) => res.json())
        .then((data) =>
          setLottieData((prev) => {
            const clone = [...prev];
            clone[idx] = data;
            return clone;
          })
        )
        .catch(() => undefined);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particlesInit = useCallback(async (engine: unknown) => {
    const { loadSlim } = await import("tsparticles-slim");
    // @ts-ignore
    await loadSlim(engine);
  }, []);

  // For colorful 3D hover effect
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardCursor, setCardCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <>
      <CoolCursor />
      <NotchNavbar />
      <main className="bg-black text-white font-sans leading-relaxed min-h-screen relative overflow-x-hidden">
        {/* Floating shapes */}
        {floatingShapes.map((shape, idx) => (
          <div key={idx} className={shape.className} />
        ))}
        {/* HERO */}
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden px-6 text-center">
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            init={particlesInit}
            options={{
              background: { color: { value: "#000000" } },
              fpsLimit: 60,
              particles: {
                number: { value: 60, density: { enable: true, area: 800 } },
                color: { value: "#ffffff" },
                opacity: { value: 0.12 },
                size: { value: 3, random: true },
                move: { enable: true, speed: 0.5 },
                links: { enable: false },
              },
              fullScreen: { enable: false },
            }}
          />
          <motion.div
            style={{ y: yParallax }}
            className="relative z-10 max-w-3xl"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-br from-pink-500 via-yellow-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Futuristic Experiences, Delivered Today
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl mb-8 opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              A premium template packed with award-winning animations and rock-solid performance.
            </motion.p>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-br from-pink-500 to-yellow-400 text-black font-semibold px-6 py-3 rounded-md transition-colors shadow-lg cursor-pointer cursor-hoverable"
            >
              Get Started
            </motion.a>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-br from-pink-500 to-yellow-400 bg-clip-text text-transparent"
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Features That Shine
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center text-center bg-gray-900/60 rounded-xl p-8 shadow-lg backdrop-blur-lg border border-gray-800 hover:scale-105 transition-transform cursor-pointer cursor-hoverable"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(255, 0, 128, 0.15)" }}
              >
                <div className="w-24 h-24 mb-6">
                  {lottieData[idx] ? (
                    <Lottie animationData={lottieData[idx]!} loop autoplay />
                  ) : (
                    <div className="w-24 h-24 bg-gray-800 rounded-md animate-pulse" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-br from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 bg-gray-900 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              variants={heroVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Loved by Teams Everywhere
            </motion.h2>
            <div className="space-y-12">
              {testimonials.map((t, idx) => (
                <motion.blockquote
                  key={t.author}
                  className="bg-black/80 border border-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-lg"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <p className="text-lg mb-4">“{t.quote}”</p>
                  <cite className="text-sm opacity-70">— {t.author}</cite>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-br from-green-400 to-teal-500 bg-clip-text text-transparent"
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Flexible Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={plan.tier}
                className="relative"
                onMouseMove={e => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  setHoveredCard(idx);
                  setCardCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Colorful cursor area effect */}
                {hoveredCard === idx && (
                  <motion.div
                    className={`pointer-events-none absolute z-10 rounded-full opacity-70 ${plan.color} blur-2xl`}
                    style={{
                      left: cardCursor.x - 80,
                      top: cardCursor.y - 80,
                      width: 160,
                      height: 160,
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <Tilt
                  tiltMaxAngleX={18}
                  tiltMaxAngleY={18}
                  glareEnable={true}
                  glareMaxOpacity={0.18}
                  glareColor="#fff"
                  glarePosition="all"
                  className="w-full"
                >
                  <motion.div
                    className={`relative p-8 rounded-2xl border w-full flex flex-col h-full bg-gradient-to-br ${plan.color} bg-clip-padding backdrop-blur-xl bg-opacity-80 border-gray-800 shadow-2xl transition-all duration-300 cursor-pointer cursor-hoverable ${plan.highlight ? "scale-105 ring-2 ring-pink-400" : "hover:scale-105"}`}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(255, 0, 128, 0.15)" }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-black drop-shadow-lg">{plan.tier}</h3>
                    <p className="text-3xl font-bold mb-6 text-black drop-shadow-lg">{plan.price}</p>
                    <ul className="space-y-2 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start text-black/90">
                          <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-block text-center font-semibold px-4 py-2 rounded-md bg-black text-white shadow-lg cursor-pointer cursor-hoverable ${plan.highlight ? "ring-2 ring-pink-400" : ""}`}
                    >
                      Choose {plan.tier}
                    </motion.a>
                  </motion.div>
                </Tilt>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-24 bg-gray-900 px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-br from-pink-500 to-yellow-400 bg-clip-text text-transparent"
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Ready to level up your product?
          </motion.h2>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-br from-pink-500 to-yellow-400 text-black font-semibold px-8 py-4 rounded-md shadow-lg cursor-pointer cursor-hoverable"
          >
            Get Started Now
          </motion.a>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-6 text-center text-sm bg-black border-t border-gray-800">
          © {new Date().getFullYear()} Notch Site. All rights reserved.
        </footer>
      </main>
      {/* Custom styles for floating shapes animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default LandingPage;
