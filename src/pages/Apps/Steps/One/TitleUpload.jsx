import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Función para obtener el token de autenticación del localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const TitleUpload = ({ reservaId }) => {
    const [pdfExists, setPdfExists] = useState(null); // true si existe, false si no, null mientras carga

    useEffect(() => {
        if (!reservaId) {
            console.error('El ID de la reserva es indefinido.');
            return;
        }

        // Hacer una petición para verificar si el PDF existe sin cargarlo completamente
        fetch(`http://localhost:8080/api/v1/pdfDocument/OneStep/${reservaId}/exists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    setPdfExists(false);
                } else {
                    throw new Error('Error al verificar la existencia del PDF.');
                }
            })
            .then((data) => {
                if (data && data.exists) {
                    setPdfExists(true);
                } else {
                    setPdfExists(false);
                }
            })
            .catch((error) => {
                console.error('Error al verificar la existencia del PDF:', error);
                setPdfExists(false);
            });
    }, [reservaId]);

    const viewPDF = () => {
        if (!reservaId) {
            Swal.fire({
                icon: 'error',
                title: 'ID de reserva inválido',
                text: 'No se ha proporcionado un ID de reserva válido.',
            });
            return;
        }

        // Llamada al backend para obtener el PDF asociado cuando se presiona el botón
        fetch(`http://localhost:8080/api/v1/pdfDocument/OneStep/${reservaId}/view`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al cargar el PDF.');
                }
                return response.json();
            })
            .then((data) => {
                if (data.pdfDocumentId && data.pdfData) {
                    const base64PDF = `data:application/pdf;base64,${data.pdfData}`;

                    // Mostrar la vista previa del PDF
                    Swal.fire({
                        title: 'Vista Previa del PDF',
                        html: `<iframe src="${base64PDF}" width="100%" height="500px" style="border:none;"></iframe>`,
                        confirmButtonText: 'Cerrar',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'No hay PDF disponible',
                        text: 'No se ha encontrado ningún PDF para esta reserva.',
                    });
                }
            })
            .catch((error) => {
                console.error('Error al cargar el PDF:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el PDF',
                    text: 'Hubo un problema al cargar el PDF.',
                });
            });
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={viewPDF}
                className="btn btn-sm btn-outline-secondary m-0 w-[5rem]"
                disabled={!pdfExists}
            >
                {pdfExists === null ? 'Cargando...' : pdfExists ? 'Ver PDF' : 'No disponible'}
            </button>
        </div>
    );
};

export default TitleUpload;
    