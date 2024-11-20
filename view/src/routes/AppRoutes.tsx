import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/LoginForm/RegisterForm';
import { Salario } from '../pages/Salario/Salario';
import { Principal } from '../pages/Principal/Principal';
import { Taxas } from '../pages/Taxas/Taxas';

export const AppRoutes: React.FC = () => {
  return (

    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registrar" element={<RegisterForm />} />
      <Route path="/home" element={<Principal />} />
      <Route path="/salario" element={<Salario />} />
      <Route path="/taxas" element={<Taxas />} />
      {/* <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Route> */}
    </Routes>
  );
};