import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronRight,
  FiPlus,
  FiCheckCircle,
  FiArrowRight,
  FiLogIn,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from 'react-icons/fi';
import { FaAirbnb, FaStripe, FaAmazon, FaTwitch, FaGoogle, FaFigma } from 'react-icons/fa';

// --- Tailwind Color Palette Mapping (Approximation of original theme) ---
// bg-gray-950: #0B0A10
// bg-gray-900: #16151D (cardBackground)
// from-purple-600: #6A5AF9 (primaryGradientStart)
// to-fuchsia-500: #A855F7 (primaryGradientEnd)
// bg-indigo-600: #4A4DE8 (loginButtonBg)
// text-emerald-500: #10B981 (accentGreen)
// text-gray-400: #A0A0B8 (textSecondary)
// text-gray-500: #6B7280 (textTertiary)
// border-white/10: rgba(255, 255, 255, 0.1)
// border-white/5: rgba(255, 255, 255, 0.05)
// text-yellow-400: #FFD700

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const arcVariants = (delay: number) => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: delay,
            duration: 0.8,
            ease: "circOut"
        }
    }
});

const LandingPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("Home");

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    { q: "How long does it take to onboard my team?", a: "Onboarding is designed to be quick and intuitive. Most teams are up and running within a day, and full integration can be achieved in under a week." },
    { q: "Is Workly really free to use?", a: "Yes, Workly offers a generous free forever plan for small teams and individuals. Paid plans unlock advanced features and higher limits." },
    { q: "Is my data secure on Workly?", a: "Absolutely. We use industry-standard encryption, regular backups, and robust security protocols to ensure your data is always safe and private." },
    { q: "Can I integrate Workly with my existing tools?", a: "Yes! Workly offers a wide range of integrations with popular tools like Slack, GitHub, Google Workspace, and many more. We're always adding new integrations." },
    { q: "Can I cancel or change my plan at any time?", a: "Yes, you can upgrade, downgrade, or cancel your plan at any time directly from your account settings. No long-term contracts required." },
  ];

  const navItems = ["Home", "About us", "Testimonials", "Pricing"];

  const arcColors = [
    'border-purple-600',
    'border-purple-600/70',
    'border-purple-600/50',
    'border-purple-600/30',
  ];

  return (
    <div className="bg-gray-950 text-white font-sans overflow-x-hidden relative">
      {/* Subtle background gradient effect */}
      <div className="absolute top-0 left-0 right-0 h-[500px] md:h-[800px] bg-gradient-to-b from-indigo-600/15 to-transparent z-0 pointer-events-none" />

      {/* Header */}
      <motion.header
        className="flex justify-between items-center px-4 py-3 sticky top-0 bg-gray-950/80 backdrop-blur-md z-50 max-w-7xl mx-auto"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div className="text-3xl font-bold text-white cursor-pointer" variants={itemVariants}>Workly</motion.div>
        <motion.nav className="hidden md:flex gap-4" variants={staggerContainerVariants}>
          {navItems.map((item) => (
            <motion.a
              key={item}
              href="#"
              className={`relative px-3 py-2 rounded-md transition-colors duration-300 ${activeNav === item ? 'text-white font-semibold bg-white/10' : 'text-gray-400'}`}
              onClick={() => setActiveNav(item)}
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              {item}
              {activeNav === item && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-500" />
              )}
            </motion.a>
          ))}
        </motion.nav>
        <motion.button
          className="px-4 py-2 rounded-md font-semibold text-sm border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login <FiLogIn />
        </motion.button>
      </motion.header>

      {/* Hero Section */}
      <motion.section className="px-4 py-10 md:py-16 max-w-7xl mx-auto relative z-10">
        <div className="text-center pt-8 pb-10 relative">
          {/* Hero Arcs Container */}
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-full max-w-xl h-64 md:h-96 z-[-1] opacity-70 overflow-hidden">
            {[64, 80, 96, 112].map((size, i) => (
              <motion.div
                key={size}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-${size} h-${size / 2} rounded-full border-t-4 border-x-4 border-b-0 ${arcColors[i % arcColors.length]} shadow-lg shadow-purple-600/30`}
                variants={arcVariants(i * 0.15 + 0.5)}
                initial="initial"
                animate="animate"
              />
            ))}
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 max-w-3xl mx-auto tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Workspace That Remembers Everything for You
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Workly keeps tasks, messages, and docs in one place. Always searchable, synced, and up to date so nothing gets lost.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <motion.button
              className="px-5 py-2.5 rounded-md font-semibold text-base border border-white/10 bg-white/10 text-gray-400 transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-white/15 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore <FiChevronRight />
            </motion.button>
            <motion.button
              className="px-5 py-2.5 rounded-md font-semibold text-base border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.div
            className="w-full max-w-4xl h-72 md:h-96 bg-gray-900 border border-gray-800 rounded-xl mx-auto flex items-center justify-center text-xl text-gray-500 shadow-2xl shadow-black/50 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
          >
            App Dashboard Preview
          </motion.div>
        </div>
      </motion.section>

      {/* Trusted By Section */}
      <motion.section
        className="px-4 py-8 md:py-12 max-w-7xl mx-auto relative z-10 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="text-gray-400" variants={itemVariants}>Trusted by businesses worldwide:</motion.p>
        <motion.div className="flex flex-wrap justify-center items-center gap-8 mt-6"
          variants={staggerContainerVariants}
        >
          {[FaAirbnb, FaFigma, FaStripe, FaGoogle, FiGithub, FaAmazon, FaTwitch].map((Icon, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -3, scale: 1.1 }}>
              <Icon className="text-gray-500 text-3xl transition-colors duration-300 hover:text-gray-400" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section 1 */}
      <motion.section
        className="px-4 py-12 md:py-16 max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center">
          <span className="inline-block bg-emerald-900/20 text-emerald-500 px-3 py-1 rounded-md text-xs font-medium mb-4">Our Benefits</span>
        </div>
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight" variants={itemVariants}>
          Think Less About the Tool.<br />Focus on the Work
        </motion.h2>
        <motion.p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed" variants={itemVariants}>
          The all-in-one toolkit to keep your team organized, efficient, and connected.
        </motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          variants={staggerContainerVariants}
        >
          {[ 
            { title: "Team Workflow", desc: "Assign tasks and set priorities in real time for smoother collaboration.", graphic: "Kanban Board / Task List UI" },
            { title: "Cloud Backup", desc: "Your projects are safely stored in the cloud, always up-to-date and recoverable.", graphic: "Cloud Icon with Sync Arrows" },
            { title: "All-in-One Search", desc: "Quickly find tasks, messages, and docs with a single search across your workspace.", graphic: "Search Bar UI with Results" },
            { title: "App Integrations", desc: "Seamlessly connect your favorite tools for a smooth and unified experience.", graphic: "Grid of App Logos" },
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-600/20 hover:border-purple-600"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-base text-gray-400 leading-relaxed">{feature.desc}</p>
              <div className="h-40 rounded-lg bg-black/20 flex items-center justify-center mt-4 border border-dashed border-gray-700 text-gray-500 text-sm">
                {feature.graphic}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="px-4 py-12 md:py-16 max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight" variants={itemVariants}>
          Get Set Up in Minutes,<br />Start Moving Fast
        </motion.h2>
        <motion.div className="mt-16 relative flex flex-col md:flex-row justify-around items-center md:items-start px-4 gap-12 md:gap-0">
            <motion.svg className="absolute top-6 left-1/2 -translate-x-1/2 w-2/3 h-1 overflow-visible z-0 hidden md:block" viewBox="0 0 200 4" preserveAspectRatio="none">
                <motion.path
                    d="M 0 2 Q 50 2, 100 2 T 200 2"
                    stroke="#6A5AF9"
                    strokeWidth="3"
                    fill="transparent"
                    initial={{ pathLength: 0, pathOffset: 1 }}
                    whileInView={{ pathLength: 1, pathOffset: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    viewport={{ once: true }}
                />
            </motion.svg>
          {[ 
            { num: "1", title: "Join & Build Team", desc: "Invite your team members and set up your organization structure." },
            { num: "2", title: "Create Project", desc: "Start your first project, define tasks, and set milestones." },
            { num: "3", title: "Track Progress", desc: "Monitor progress, collaborate effectively, and achieve your goals." },
          ].map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center text-center max-w-xs relative">
              <motion.div className="w-12 h-12 rounded-full border-2 border-purple-600 flex items-center justify-center text-xl font-semibold text-white mb-4 bg-gray-900 shadow-md shadow-purple-600/20">
                {step.num}
              </motion.div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-base text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

       {/* Testimonials Section */}
       <motion.section
        className="px-4 py-12 md:py-16 max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight" variants={itemVariants}>
          Teams That Switched to Workly<br />Don't Look Back
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          variants={staggerContainerVariants}
        >
          {[ 
            { name: "Sarah L.", title: "Project Manager", avatar: "SL", quote: "Workly has revolutionized how our team collaborates. Everything is streamlined and so much easier to manage!" },
            { name: "Mike R.", title: "Lead Developer", avatar: "MR", quote: "The integrations are seamless and the search functionality is incredibly powerful. A huge productivity boost for us." },
            { name: "Jessica P.", title: "Marketing Director", avatar: "JP", quote: "Finally, a tool that understands the needs of a dynamic marketing team. We're more organized than ever." },
          ].map((testimonial, i) => (
            <motion.div key={i} variants={itemVariants}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 mr-4 flex items-center justify-center text-sm font-semibold">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.title}</div>
                </div>
              </div>
              <div className="text-yellow-400 mb-3 text-sm">★★★★★</div>
              <div className="text-base text-gray-400 leading-relaxed italic">"{testimonial.quote}"</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className="px-4 py-12 md:py-16 max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight" variants={itemVariants}>Plans Made for Teams of All Sizes</motion.h2>
        <motion.p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed" variants={itemVariants}>Choose the perfect plan that fits your team's needs and budget. Start for free!</motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-stretch"
          variants={staggerContainerVariants}
        >
          {[ 
            { name: "Starter", price: "$0", desc: "For individuals & small teams", features: ["Up to 5 users", "Basic task management", "1GB storage", "Community support"], recommended: false },
            { name: "Pro", price: "$9", desc: "For growing teams", features: ["Up to 50 users", "Advanced task management", "Unlimited projects", "50GB storage", "Priority support", "Integrations"], recommended: true },
            { name: "Enterprise", price: "$19", desc: "For large organizations", features: ["Unlimited users", "Custom workflows", "1TB storage", "Dedicated support", "SSO & advanced security"], recommended: false },
          ].map((plan, i) => (
            <motion.div key={i} variants={itemVariants}
              className={`bg-gray-900 border border-gray-800 rounded-3xl p-6 text-center flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${plan.recommended ? 'border-purple-600 shadow-2xl shadow-purple-600/40 scale-105 bg-gradient-to-b from-gray-900 to-purple-600/20 hover:scale-107' : 'hover:scale-102 hover:shadow-purple-600/20 hover:border-purple-600'}`}
            >
                <div>
                    <div className="text-base text-gray-400 font-medium mb-2">{plan.name}</div>
                    <div className="text-5xl font-bold mb-1">
                        {plan.price}<span className="text-base text-gray-400 font-normal">{plan.name !== "Starter" && "/user/mo"}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                    <ul className="list-none p-0 my-6 text-left flex-grow">
                    {plan.features.map((feature, fi) => (
                        <li key={fi} className="text-base text-gray-400 mb-3 flex items-center">
                            <FiCheckCircle className="text-emerald-500 mr-2 min-w-[16px]" /> {feature}
                        </li>
                    ))}
                    </ul>
                </div>
              <button
                className={`w-full mt-4 px-5 py-2.5 rounded-md font-semibold text-base border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 ${plan.recommended ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95'}`}
                disabled={plan.recommended}
              >
                {plan.recommended ? 'Current Plan' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="px-4 py-12 md:py-16 max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight" variants={itemVariants}>Everything You Need To Know<br />Before Getting Started</motion.h2>
        <motion.div className="max-w-3xl mx-auto mt-12"
          variants={staggerContainerVariants}
        >
          {faqData.map((faq, i) => (
            <motion.div key={i} variants={itemVariants}
              className="bg-gray-900 border border-gray-800 rounded-lg mb-4 overflow-hidden"
            >
              <div
                className="p-4 md:p-5 flex justify-between items-center cursor-pointer font-medium"
                onClick={() => toggleFaq(i)}
              >
                {faq.q}
                <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}>
                  <FiPlus className="text-gray-400" />
                </motion.div>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-4 pb-4 md:px-5 md:pb-5 text-gray-400 text-base leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="px-4 py-12 md:py-16 max-w-7xl mx-auto relative z-10 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 md:h-96 opacity-30 overflow-hidden z-[-1]">
            {[80, 96, 112].map((size, i) => (
              <motion.div
                key={size}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-${size} h-${size / 2} rounded-full border-t-4 border-x-4 border-b-0 border-purple-600/30 shadow-lg shadow-purple-600/20`}
                variants={arcVariants(i * 0.15)}
                initial="initial"
                animate="animate"
              />
            ))}
          </motion.div>
        <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight" variants={itemVariants}>Ready to Get Things Done?</motion.h2>
        <motion.p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed" variants={itemVariants}>Join thousands of teams improving their productivity with Workly.</motion.p>
        <motion.button
          className="px-6 py-3 rounded-md font-semibold text-lg border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Free Trial <FiArrowRight />
        </motion.button>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 py-10 md:py-16 px-4 border-t border-gray-800"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <motion.div className="col-span-2 md:col-span-1" variants={itemVariants}>
            <div className="text-3xl font-bold text-white mb-4">Workly</div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Quality and thoughtfully designed workspace for modern teams.
            </p>
            <button className="mt-4 px-4 py-2.5 rounded-md font-semibold text-sm border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95">
              Get Started
            </button>
          </motion.div>
          {['Product', 'Company', 'Support', 'Features'].map(title => (
             <motion.div key={title} variants={itemVariants}>
                <h4 className="text-base font-semibold mb-4 text-white">{title}</h4>
                <ul className="list-none p-0 m-0">
                  {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map(link => (
                    <li key={link} className="mb-3"><a href="#" className="text-sm text-gray-400 hover:text-white hover:underline">{link}</a></li>
                  ))}
                </ul>
             </motion.div>
          ))}
        </div>
        <motion.div className="text-center mt-12 pt-6 border-t border-gray-800 text-gray-500 text-sm max-w-7xl mx-auto"
          variants={itemVariants}
        >
            <div className="flex justify-center gap-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white"><FiTwitter className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FiLinkedin className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FiInstagram className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FiGithub className="text-lg" /></a>
            </div>
            © {new Date().getFullYear()} Workly. All rights reserved. Built with passion.
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
