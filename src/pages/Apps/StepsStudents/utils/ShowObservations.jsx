import Swal from 'sweetalert2';

/**
 * Muestra una alerta con las observaciones.
 * @param {string|null} observations - Las observaciones a mostrar.
 */
export const showObservations = (observations) => {
    if (observations) {
        Swal.fire({
            title: 'Observaciones',
            text: observations,
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });
    } else {
        Swal.fire({
            title: 'Sin Observaciones',
            text: 'No se han encontrado observaciones asociadas.',
            icon: 'success',
            confirmButtonText: 'Cerrar',
        });
    }
};