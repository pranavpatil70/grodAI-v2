import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, Download, 
  Volume2, Languages, Settings,
  Loader, Save
} from 'lucide-react';
import { Polly } from '../config/aws-config';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('Aditi'); // Default Hindi voice
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [speechRate, setSpeechRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const audioRef = useRef(null);

  const voices = {
    'en-US': [
      { id: 'Joanna', name: 'Joanna (Female)' },
      { id: 'Matthew', name: 'Matthew (Male)' },
      { id: 'Salli', name: 'Salli (Female)' }
    ],
    'hi-IN': [
      { id: 'Aditi', name: 'Aditi (Female)' }
    ]
  };

  const synthesizeSpeech = async () => {
    if (!text) return;

    try {
      setIsLoading(true);

      const params = {
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: selectedVoice,
        LanguageCode: selectedLanguage,
        Engine: 'neural',
        SpeechMarkTypes: ['sentence', 'word'],
        TextType: 'text',
        SampleRate: '22050'
      };

      const response = await Polly.synthesizeSpeech(params).promise();
      const uInt8Array = new Uint8Array(response.AudioStream);
      const blob = new Blob([uInt8Array.buffer], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.playbackRate = speechRate;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = async () => {
    if (!text) return;

    try {
      setIsLoading(true);
      const params = {
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: selectedVoice,
        LanguageCode: selectedLanguage,
        Engine: 'neural'
      };

      const response = await Polly.synthesizeSpeech(params).promise();
      const uInt8Array = new Uint8Array(response.AudioStream);
      const blob = new Blob([uInt8Array.buffer], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'speech.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Text to Speech</h2>
        
        {/* Language and Voice Selection */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setSelectedVoice(voices[e.target.value][0].id);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {voices[selectedLanguage].map(voice => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Voice Settings */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speech Rate
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pitch
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={synthesizeSpeech}
          disabled={isLoading || !text}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
          Convert to Speech
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayPause}
          disabled={isLoading || !text}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isLoading || !text}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Download className="w-5 h-5" />
        </motion.button>
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default TextToSpeech; 