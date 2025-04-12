import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import StressRelief from './pages/StressRelief';
import Calendar from './pages/Calendar';
import Progress from './pages/Progress';
import Emergency from './pages/Emergency';
import GameLibrary from './pages/GameLibrary';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/games" element={<GameLibrary />} />
            <Route path="/" element={<Chat />} />
            <Route path="/stress-relief" element={<StressRelief />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;