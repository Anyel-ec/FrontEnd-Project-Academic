import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Función para obtener el token de autenticación del localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const TitleUpload = ({ reservaId }) => {
    const [base64String, setBase64String] = useState(''); // Almacena el PDF en Base64
    const [pdfDocumentId, setPdfDocumentId] = useState(null); // Almacena el id del documento PDF desde la base de datos

    // Verifica que reservaId no sea undefined antes de usarlo
    useEffect(() => {
        if (!reservaId) {
            console.error('El ID de la reserva es indefinida.');
            return;
        }

        // Llamada al backend para obtener el PDF asociado si existe
        fetch(`http://localhost:8080/api/v1/pdfDocument/OneStep/${reservaId}/view`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`, // Asegúrate de enviar el token correcto
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al cargar la reservación.');
                }
                return response.json();
            })
            .then((data) => {
                if (data.pdfDocumentId) {
                    setPdfDocumentId(data.pdfDocumentId); // Actualiza el ID del PDF si existe
                    const base64PDF = `data:application/pdf;base64,${data.pdfData}`;
                    setBase64String(base64PDF); // Almacena el PDF en formato Base64
                } else {
                    setPdfDocumentId(null); // Si no hay PDF, lo marcamos como null
                }
            })
            .catch((error) => {
                console.error('Error al cargar la reservación:', error);
            });
    }, [reservaId]);
    const viewPDF = () => {
        if (pdfDocumentId) {
            // Si ya hay un PDF cargado, mostramos la vista previa
            Swal.fire({
                title: 'Vista Previa del PDF',
                // Usa un iframe en lugar de embed para mejor compatibilidad
                html: `<iframe src="${base64String}" width="100%" height="500px" style="border:none;"></iframe>`,
                confirmButtonText: 'Cerrar',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No hay PDF disponible',
                text: 'No se ha encontrado ningún PDF para esta reserva.',
            });
        }
    };

    return (
        <div className="flex gap-3 ">
            <button onClick={viewPDF} className="btn btn-sm btn-outline-secondary m-0">
                {pdfDocumentId ? 'Ver ' : 'No disponible'}
            </button>
        </div>
    );
};

export default TitleUpload;
