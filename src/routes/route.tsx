import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/login/login';
import Signup from '../components/signup/signup';
import Home from '../components/pages/home';
import PageNotFound from '../components/pageNotFound/pageNotFound';
import AllTemplates from '../components/pages/template/templatesMain';

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

  // Private Route component to protect routes
  const PrivateRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Default Route */}
        <Route  element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes inside Home */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        >
          {/* Nested Route inside Home */}
          <Route path="/templates/library" element={<AllTemplates />} />
        </Route>

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
