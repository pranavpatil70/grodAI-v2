import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const avatars = [
  {
    id: 1,
    type: 'male',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&style=circle&backgroundColor=b6e3f4'
  },
  {
    id: 2,
    type: 'male',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max&style=circle&backgroundColor=c0aede'
  },
  {
    id: 3,
    type: 'female',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&style=circle&backgroundColor=ffdfbf'
  },
  {
    id: 4,
    type: 'female',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&style=circle&backgroundColor=ffd5dc'
  }
];

const AvatarSelector = ({ isOpen, onClose, onSelect, currentAvatar }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Choose Your Avatar</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {avatars.map((avatar) => (
                <motion.button
                  key={avatar.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(avatar)}
                  className={`p-4 rounded-xl border-2 ${
                    currentAvatar?.id === avatar.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <img
                    src={avatar.url}
                    alt={`Avatar ${avatar.id}`}
                    className="w-24 h-24 mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600 text-center">
                    {avatar.type === 'male' ? 'Male' : 'Female'} Avatar {avatar.id}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarSelector; 