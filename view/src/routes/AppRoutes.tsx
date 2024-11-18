import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/LoginForm/RegisterForm';
import { Receitas } from '../pages/Receitas/Receitas';
import { Salario } from '../pages/Salario/Salario';

export const AppRoutes: React.FC = () => {
  return (

    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registrar" element={<RegisterForm />} />
      <Route path="/home" element={<Receitas />} />
      <Route path="/salario" element={<Salario />} />
      {/* <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Route> */}
    </Routes>
  );
};