import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/login/login';
import Signup from '../components/signup/signup';
import Home from '../components/pages/home';
import PageNotFound from '../components/pageNotFound/pageNotFound';
import AllTemplates from '../components/pages/template/templatesMain';
import { useNavigate } from 'react-router-dom'; // Add useNavigate if not already imported

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const safeRoute = localStorage.getItem('isAuthenticated');
    if (safeRoute === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ children }:PrivateRouteProps) => {
    const isAuthenticated=true;
    return isAuthenticated ? <>{children}
    </> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path="" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home  />
          </PrivateRoute>
        } >

          
        </Route>
         <Route path="/templates/library" element={<AllTemplates/>} />
         <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
