import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para rutas protegidas solo para administradores
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Redirigir a la página de inicio de sesión si no hay datos del usuario
        return <Navigate to="/auth/inicio-sesion" />;
    }

    if (user.rol?.name !== 'admin') {
        // Redirigir a la página principal si el usuario no es admin
        return <Navigate to="/" />;
    }

    // Si el usuario es admin, permitir acceso al contenido protegido
    return children;
};

// Componente para rutas protegidas solo para estudiantes
const StudentRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Redirigir a la página de inicio de sesión si no hay datos del usuario
        return <Navigate to="/auth/inicio-sesion" />;
    }

    if (user.rol?.name !== 'estudiante') {
        // Redirigir a la página principal si el usuario no es estudiante
        return <Navigate to="/" />;
    }

    // Si el usuario es estudiante, permitir acceso al contenido protegido
    return children;
};

export { ProtectedRoute, StudentRoute };