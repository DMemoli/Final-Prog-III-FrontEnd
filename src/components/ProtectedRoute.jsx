import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Se obtiene el token de sessionStorage
  const token = sessionStorage.getItem('token');

  // Si no hay token, redirige al login, de lo contrario renderiza las rutas hijas
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
