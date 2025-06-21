import { useState } from 'react'
// import reactLogo from './assets/vite.ico'
import viteLogo from '/vite.ico'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Footer from './components/Footer/Footer';
import Customers from './pages/customers';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTaskCreated = (task) => {
    setTasks(prev => [task, ...prev]);
  };

  return (
    <>
      <Navbar 
        onAdminLogin={undefined}
        // Pass admin login callback to SigninModal
        SigninModalProps={{
          onAdminSuccess: () => {
            setAdminLoggedIn(true);
            navigate('/admin');
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact onTaskCreated={handleTaskCreated} />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admin" element={adminLoggedIn ? <AdminDashboard tasks={tasks} onSignOut={() => { setAdminLoggedIn(false); navigate('/'); }} /> : null} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="container-fluid"></div>
      <Footer />
    </>
  );
}

export default App
