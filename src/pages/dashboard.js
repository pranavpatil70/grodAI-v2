import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Calendar, BarChart2, Inbox, 
  Plus, Mic, FileText, Youtube, 
  Lightbulb, LogOut, ChevronDown,
  FolderPlus
} from 'lucide-react';
import ProjectModal from '../components/ProjectModal';
import AvatarSelector from '../components/AvatarSelector';
import TextToSpeech from '../components/TextToSpeech';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Project Modal */}
      <ProjectModal 
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onAdd={handleAddProject}
      />

      {/* Avatar Selector */}
      <AvatarSelector
        isOpen={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        onSelect={setSelectedAvatar}
        currentAvatar={selectedAvatar}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 mb-8 hover:bg-gray-50 p-2 rounded-lg w-full"
            >
              {selectedAvatar ? (
                <img 
                  src={selectedAvatar.url}
                  alt="Selected Avatar"
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
              ) : user?.photoURL ? (
                <img 
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-medium">
                    {user?.displayName?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-left">
                <h2 className="font-semibold text-sm">{user?.displayName}</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
            </button>

            {/* Profile Menu */}
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40"
              >
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-medium text-sm">{user?.displayName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowAvatarSelector(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Change Avatar
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {[
              { icon: Home, label: "Home", path: "/", active: location.pathname === "/" },
              { icon: Mic, label: "Text to Speech", path: "/text-to-speech", active: location.pathname === "/text-to-speech" },
              { icon: FileText, label: "Script Generator" },
              { icon: Youtube, label: "Video Summarizer" },
              { icon: Lightbulb, label: "Brainstormer" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                  item.active 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <TextToSpeech />
        
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-2xl font-semibold mt-1">
              Hello, {user?.displayName?.split(' ')[0]}
            </h1>
            <p className="text-gray-500 mt-1">Welcome to your workspace</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowProjectModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </motion.button>
        </header>

        {/* Projects Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Recent Projects</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <FolderPlus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first project to get started with our AI features
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowProjectModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Project
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                    <h3 className="font-medium">{project.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Created {project.createdAt.toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 