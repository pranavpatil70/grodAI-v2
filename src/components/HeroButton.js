import { motion } from "framer-motion";
import { useAuth } from '../config/contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroButton = ({ children, primary, onClick }) => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={primary ? handleGoogleSignIn : onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      className={`group relative px-8 py-4 rounded-full font-semibold text-lg ${
        primary 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
          : 'bg-purple-900/50 text-purple-300'
      } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      <span className="flex items-center gap-2">
        {isLoading ? 'Signing in...' : children}
      </span>
    </motion.button>
  );
}; 