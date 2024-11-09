import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import EditEmployee from './pages/EditEmployee';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './pages/Navbar';
// import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute> <CreateEmployee /> </ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

    </>
  );
};

export default App;