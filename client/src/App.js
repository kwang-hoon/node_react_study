import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import LangingPage from './components/views/LandingPage/LangingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


function App() {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<LangingPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
