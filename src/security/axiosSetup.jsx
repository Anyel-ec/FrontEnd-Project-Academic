import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';  // Importación correcta

const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000;

   // console.log('Token Exp:', exp);  // Verificar la expiración del token
   // console.log('Current Time:', now);

    return exp < now;
};

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
   // console.log('Interceptor is called');  // Verificar si el interceptor está siendo llamado
    if (token && isTokenExpired()) {
        Swal.close();  // Cerrar cualquier alerta abierta antes de mostrar la nueva
        Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha caducado. Por favor, inicia sesión nuevamente.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,  // Prevenir que el usuario cierre la alerta haciendo clic afuera
            allowEscapeKey: false,  // Prevenir que el usuario cierre la alerta presionando la tecla Escape
            allowEnterKey: false  // Prevenir que el usuario cierre la alerta presionando Enter
        }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth/inicio-sesion';
        });

        return Promise.reject(new Error('Sesión expirada'));
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Swal.close();  // Cerrar cualquier alerta abierta antes de mostrar la nueva
            Swal.fire({
                title: 'Sesión expirada',
                text: 'Tu sesión ha caducado. Por favor, inicia sesión nuevamente.',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,  // Prevenir que el usuario cierre la alerta haciendo clic afuera
                allowEscapeKey: false,  // Prevenir que el usuario cierre la alerta presionando la tecla Escape
                allowEnterKey: false  // Prevenir que el usuario cierre la alerta presionando Enter
            }).then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/auth/inicio-sesion';
            });
        }
        return Promise.reject(error);
    }
);

export default axios;
