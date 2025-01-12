import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import TextToSpeech from './pages/TextToSpeech';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/text-to-speech" element={<PrivateRoute><TextToSpeech /></PrivateRoute>} />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
}

export default App;
