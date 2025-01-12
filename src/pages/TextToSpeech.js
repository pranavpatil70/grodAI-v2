import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Save, Play, Download, Loader } from 'lucide-react';
import { projectService } from '../services/projectService';
import { cpanelStorage } from '../services/cpanelStorage';

const TextToSpeech = () => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!user || !audioUrl) return;
    
    setSaving(true);
    try {
      // Convert blob URL to File object
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const file = new File([blob], `tts-${Date.now()}.mp3`, { type: 'audio/mpeg' });

      // Upload to cPanel storage
      const fileUrl = await cpanelStorage.uploadFile(file);

      // Save project details to Firebase
      await projectService.createProject(user.uid, {
        type: 'text-to-speech',
        title: text.substring(0, 50) + '...',
        content: text,
        audioUrl: fileUrl,
        createdAt: new Date()
      });

    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Text to Speech Generator</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-40 p-4 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateSpeech}
            disabled={loading || !text.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Generate Speech
          </motion.button>

          {audioUrl && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProject}
                disabled={saving || !user}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save as Project
              </motion.button>

              <motion.a
                href={audioUrl}
                download="speech.mp3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.a>
            </>
          )}
        </div>

        {audioUrl && (
          <div className="mt-6">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech; 