import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogoutModal } from '../features/auth/components/logout/LogoutModal';

export const Home = () => {
  const { user } = useAuthStore();
  return <>{user ? <LogoutModal /> : <Link to={'/join'}>Home</Link>}</>;
};
