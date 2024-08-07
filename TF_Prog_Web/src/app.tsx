import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/login'; // Adjust the path as necessary
import Dashboard from './components/userinfo'; // Adjust the path as necessary
import Home from './components/home'; // Adjust the path as necessary
import Register from './components/register';
import Admin from './components/admin';

export function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={Cookies.get('loggedUser') ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </Router>
  );
}