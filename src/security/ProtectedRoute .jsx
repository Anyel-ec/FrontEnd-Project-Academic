import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Si no hay datos del usuario, redirigir a /auth/inicio-sesion
        return <Navigate to="/auth/inicio-sesion" />;
    }

    if (user.rol.name !== 'admin') {
        // Si el usuario no es admin, redirigir a una página de acceso denegado o a la página principal
        return <Navigate to="/" />;
    }

    // Si hay datos del usuario, permitir acceso al contenido protegido
    return children;
};

export default ProtectedRoute;
