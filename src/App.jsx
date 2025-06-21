import { useState, useEffect, useRef } from 'react'
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
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage if available
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [notification, setNotification] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const tasksRef = useRef(tasks);

  // Keep a ref to tasks for cross-tab sync
  useEffect(() => { tasksRef.current = tasks; }, [tasks]);

  // Save to localStorage and broadcast to other tabs
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.dispatchEvent(new Event('tasks-updated'));
  }, [tasks]);

  // Listen for changes from other tabs
  useEffect(() => {
    const syncTasks = () => {
      const saved = localStorage.getItem('tasks');
      if (saved) setTasks(JSON.parse(saved));
    };
    window.addEventListener('storage', syncTasks);
    window.addEventListener('tasks-updated', syncTasks);
    return () => {
      window.removeEventListener('storage', syncTasks);
      window.removeEventListener('tasks-updated', syncTasks);
    };
  }, []);

  // Show notification for new task
  const handleTaskCreated = (task) => {
    setTasks(prev => [task, ...prev]);
    setNotification('New contact form submitted!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Optionally auto-redirect admin to dashboard on new task
  useEffect(() => {
    if (adminLoggedIn && location.pathname !== '/AdminDashboard') {
      navigate('/AdminDashboard');
    }
  }, [adminLoggedIn, location, navigate]);

  // Pass this to Navbar
  const handleAdminSuccess = () => {
    setAdminLoggedIn(true);
    navigate('/AdminDashboard');
  };

  // Only show Navbar if not on admin dashboard
  const isAdminDashboard = location.pathname.toLowerCase() === '/admindashboard';

  return (
    <>
      {notification && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 3000 }}>
          <div className="alert alert-info text-center m-0">{notification}</div>
        </div>
      )}
      {!isAdminDashboard && (
        <Navbar 
          SigninModalProps={{
            onAdminSuccess: handleAdminSuccess
          }}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact onTaskCreated={handleTaskCreated} />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/AdminDashboard" element={adminLoggedIn ? <AdminDashboard tasks={tasks} onSignOut={() => { setAdminLoggedIn(false); navigate('/'); }} /> : null} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="container-fluid"></div>
      <Footer />
    </>
  );
}

export default App
