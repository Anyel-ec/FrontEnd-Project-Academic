import axios from 'axios';
import Swal from 'sweetalert2';
import AppEnvironments from '../config/AppEnvironments';

const AUTH_API_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/auth/login`;
const USER_API_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/obtener/`;
const UPDATE_PASSWORD_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/actualizar-contrasena/`;
const UPDATE_FIRST_ACCESS_URL = `${AppEnvironments.baseUrl}api/v1/usuarios/actualizar-primer-acceso/`;

const login = async (username, password) => {
    try {
        const response = await axios.post(AUTH_API_URL, { username, password });
        if (response.data.success) {
            const token = response.data.result;
            console.log('Token recibido:', token);
            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            // Verificar los datos del usuario
            const userResponse = await axios.get(`${USER_API_URL}${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Datos del usuario:', userResponse.data);
            console.log('Datos del usuario:', userResponse.data.result.firstLogin);

            if (userResponse.data.success) {
                const { password: _, ...userWithoutPassword } = userResponse.data.result;
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                return true;
            } else {
                throw new Error('No se pudieron obtener los datos del usuario.');
            }
        } 
    } catch (error) {
        console.error('Error en AuthService.login:', error);
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al iniciar sesión.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        return false;
    }
};


const actualizarContrasena = async (username, newPassword) => {
    try {
        const response = await axios.post(`${UPDATE_PASSWORD_URL}${username}`, { password: newPassword }); // Cambia `newPassword` a `password`
        return response.data;
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
        return response.data;
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
