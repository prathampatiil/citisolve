// screens/AdminRegister.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';

export default function AdminRegister({ navigation }) {
  return (
    <AuthForm
      type="register"
      role="Admin"
      onSubmit={() => navigation.replace('AdminDrawer')}
    />
  );
}
