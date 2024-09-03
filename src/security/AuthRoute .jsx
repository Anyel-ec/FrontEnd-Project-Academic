import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const AuthRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Si el usuario ya está autenticado, redirigir a la página de inicio
        return <Navigate to="/" />;
    }

    // Si el usuario no está autenticado, permitir acceso al contenido de inicio de sesión
    return children;
};

export default AuthRoute;
