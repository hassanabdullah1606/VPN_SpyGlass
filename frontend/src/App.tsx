import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home/Home';
import Faq from './pages/FAQ/Faq';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import './styles/global.scss';

function App() {
  return (
    <div className="main">
      <Router> {/* Wrap your Routes in a BrowserRouter */}
        <Routes> {/* Use Routes component to define your routes */}
          <Route path="/" element={<Login />} /> {/* Define a route for Login */}
          <Route path="/settings" element={<Settings />} /> {/* Define a route for Settings */}
          <Route path="/faq" element={<Faq />} /> {/* Define a route for FAQ */}
          <Route path="/home" element={<Home />} /> {/* Define a route for Home */}
          <Route path="/signup" element={<Signup />} /> {/* Define a route for Signup */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
