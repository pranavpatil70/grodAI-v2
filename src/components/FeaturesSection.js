import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, FileText, Youtube, Lightbulb } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay
      }}
      className="group relative p-6 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 transform-gpu hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] cursor-pointer"
    >
      <div className="flex flex-col items-center text-center space-y-4 relative z-10">
        <motion.div 
          className="p-3 rounded-full bg-purple-500/20 group-hover:scale-110 transition-transform duration-200"
        >
          <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-200" />
        </motion.div>
        <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
          {description}
        </p>
      </div>

      {/* Glow effect overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-purple-600/20 via-purple-400/5 to-transparent opacity-0 rounded-2xl transition-opacity duration-200 group-hover:opacity-100"
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.8, 0.9, 1]);

  const features = [
    {
      icon: Mic,
      title: "Text to Speech",
      description: "Convert any text into natural-sounding speech with multiple voice options and language support. Perfect for content creation and accessibility.",
      delay: 0.2
    },
    {
      icon: FileText,
      title: "Text to Script",
      description: "Transform your ideas into well-structured scripts. Ideal for video creators, podcasters, and presenters looking to streamline their content creation.",
      delay: 0.3
    },
    {
      icon: Youtube,
      title: "YouTube Video Summarizer",
      description: "Get concise summaries of YouTube videos instantly. Save time and extract key insights from long-form content efficiently.",
      delay: 0.4
    },
    {
      icon: Lightbulb,
      title: "Ideas Brainstormer",
      description: "Generate creative ideas and overcome writer's block with our AI-powered brainstorming tool. Perfect for content creators and writers.",
      delay: 0.5
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900" />
      
      <motion.div 
        className="relative container mx-auto px-6"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for Content Creators
          </h2>
          <p className="text-gray-400">
            Explore our suite of AI-powered tools designed to enhance your content creation workflow
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Try For Free Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-200"
          >
            <span className="flex items-center gap-2">
              Try All Features Free <span className="text-purple-200">→</span>
            </span>
          </motion.button>
          {/* <p className="text-gray-400 mt-4 text-sm">
            No credit card required • 14-day free trial
          </p> */}
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-0 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
};

export default FeaturesSection; 