import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus, ArrowRight } from 'lucide-react';

const RequestFeature = () => {
  const handleRequestFeature = () => {
    window.location.href = 'mailto:pranav@grodai.in?subject=Feature Request for GrodAI&body=Hi, I would like to request a new feature...';
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900" />
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block p-3 rounded-full bg-purple-500/20 mb-6">
            <MessageSquarePlus className="w-6 h-6 text-purple-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Missing a Feature?
          </h2>
          
          <p className="text-gray-400 text-lg mb-8">
            We're constantly improving our platform. Let us know what features would help your workflow, 
            and we'll prioritize building them.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <motion.button
              onClick={handleRequestFeature}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-200"
            >
              Request a Feature
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
            
            <p className="text-gray-400 text-sm">
              Your feedback helps shape our product roadmap
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RequestFeature; 