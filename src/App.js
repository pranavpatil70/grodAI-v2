import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import TextToSpeech from './pages/TextToSpeech';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/text-to-speech" element={<PrivateRoute><TextToSpeech /></PrivateRoute>} />
          {/* Add other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
