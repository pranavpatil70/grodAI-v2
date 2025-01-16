import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Wand2, ChevronDown } from 'lucide-react';
import { HeroButton } from './HeroButton';
import Features from './FeaturesSection'; // Adjust the path as necessary
import Footer from './Footer';
import RequestFeatures from './RequestFeature';

// Import custom fonts in your _app.js or similar:
// import '@fontsource/space-grotesk';
// import '@fontsource/syncopate';
// import '@fontsource/monument-extended';

const VideoPlayer = ({ videoId }) => {
  return (
    <div className="relative">
      {/* Video Container */}
      <motion.div 
        className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="AI Video Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </motion.div>
    </div>
  );
};

const GlowingButton = ({ children, primary }) => {
  return (
    <motion.button
      className={`relative px-8 py-4 rounded-full font-monument text-lg overflow-hidden ${
        primary ? 'text-white' : 'text-purple-300'
      }`}
      whileHover={{ 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      <motion.div
        className={`absolute inset-0 ${
          primary 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
            : 'bg-gradient-to-r from-purple-900/50 to-blue-900/50'
        }`}
        whileHover={{ scale: 1.1 }}
      />
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-xl"
        whileHover={{ opacity: 0.5 }}
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

const HeroSection = () => {
  const videoId = "Y8EPQ7oMpeo";
  const { scrollY } = useScroll();
  
  // Text content animations
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  
  // Video animations
  const videoScale = useTransform(scrollY, [100, 400], [0.8, 1]);
  const videoOpacity = useTransform(scrollY, [100, 400], [0, 1]);
  const videoY = useTransform(scrollY, [100, 400], [100, 0]);

  return (
    <div className="relative min-h-screen bg-gray-900 font-grotesk overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(98,0,255,0.1),rgba(0,0,0,0))]" />
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 pt-12">
        {/* Text Content */}
        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="font-syncopate text-sm text-purple-400 tracking-widest uppercase">
              AI-Powered Content Suite
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-poppins text-5xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200"
          >
            Complete Content Creation with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 mb-12 font-grotesk max-w-2xl"
          >
            Transform your content workflow with our powerful AI tools. Convert text to natural speech, 
            generate engaging scripts, summarize videos, and brainstorm creative ideas - all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <HeroButton primary>
              Try it Free <Wand2 className="w-5 h-5" />
            </HeroButton>
            <HeroButton>
              Watch Demo <ChevronDown className="w-5 h-5" />
            </HeroButton>
          </motion.div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          style={{ 
            opacity: videoOpacity, 
            scale: videoScale,
            y: videoY
          }}
          className="w-full max-w-3xl mx-auto mt-12"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-gray-300 mb-6 font-grotesk"
          >
            Watch this video to know more
          </motion.p>
          
          <motion.div
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: 2
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20"
          >
            <div className="relative aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="AI Video Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
            {/* Integrate Features Section */}
            <Features />

{/* Integrate Request Features Section */}
<RequestFeatures />

{/* Integrate Footer Section */}
<Footer />
    </div>
  );
};

export default HeroSection;