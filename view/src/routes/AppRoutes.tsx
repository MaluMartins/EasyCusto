import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/LoginForm/RegisterForm';

export const AppRoutes: React.FC = () => {
  return (

    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registrar" element={<RegisterForm />} />
      {/* <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Route> */}
    </Routes>
  );
};