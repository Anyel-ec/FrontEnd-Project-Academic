import axios from 'axios';
import Swal from 'sweetalert2';
import AppEnvironments from '../config/AppEnvironments';

const AUTH_API_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/auth/login`;
const USER_API_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/obtener/`;
const UPDATE_PASSWORD_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/actualizar-contrasena/`;
const UPDATE_FIRST_ACCESS_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/actualizar-primer-acceso/`;

const login = async (username, password) => {
    try {
        const response = await axios.post(AUTH_API_URL, {
            username: username,
            password: password
        });
        if (response.data.respuesta) {
            const token = response.data.mensaje;
            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            // Ahora obtener los datos del usuario
            const userResponse = await axios.get(`${USER_API_URL}${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (userResponse.data.respuesta) {
                const userData = userResponse.data.resultado;
                // Excluir la contraseña
                const { password, ...userWithoutPassword } = userData;

                // Guardar los datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                console.log("Datos del usuario guardados en localStorage", userWithoutPassword);

                // Verificar si es el primer inicio de sesión y si el rol es "estudiante"
                if (userWithoutPassword.firstLogin && userWithoutPassword.rol.name === 'estudiante') {
                    // Redirigir a la página de cambio de contraseña
                    window.location.href = '/auth/cambiar-contrasena';
                    console.log(userWithoutPassword);
                    return false; // Evitar redirecciones adicionales
                }

                return true;
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron obtener los datos del usuario.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                return false;
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: response.data.mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return false;
        }
    } catch (error) {
        console.error("Error al hacer login", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al intentar iniciar sesión.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

const actualizarContrasena = async (username, newPassword) => {
    try {
        const response = await axios.post(`${UPDATE_PASSWORD_URL}${username}`, { password: newPassword }); // Cambia `newPassword` a `password`
        return response.data; // Asegúrate de devolver todo el objeto de respuesta
    } catch (error) {
        console.error("Error al actualizar la contraseña", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al intentar actualizar la contraseña.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

const updateFirstAccess = async (username) => {
    try {
        const response = await axios.put(`${UPDATE_FIRST_ACCESS_URL}${username}`);
        return response.data; // Asegúrate de devolver todo el objeto de respuesta
    } catch (error) {
        console.error("Error al actualizar el primer acceso", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al intentar actualizar el primer acceso.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};

export default {
    login,
    actualizarContrasena,
    updateFirstAccess
};
