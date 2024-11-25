import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReservationService from '../../../../api/titleReservationsService';

const TitleUpload = ({ reservaId }) => {
    const [pdfDocumentId, setPdfDocumentId] = useState(null); // Maneja el estado inicial como `null`

    useEffect(() => {
        if (!reservaId) {
            console.error('El ID de la reserva es undefined.');
            return;
        }
        // Llamada al backend para verificar si hay un PDF asociado
        ReservationService.viewPdf(reservaId)
            .then((pdfData) => {
                if (pdfData) {
                    setPdfDocumentId(true); // Indica que el PDF está disponible
                } else {
                    setPdfDocumentId(false); // No hay PDF disponible
                }
            })
            .catch((error) => {
                console.error('Error al cargar la reservación:', error);
                setPdfDocumentId(false); // Manejar el error como "No disponible"
            });
    }, [reservaId]);

    const viewPDF = () => {
        ReservationService.viewPdf(reservaId)
            .then((pdfData) => {
                const base64PDF = `data:application/pdf;base64,${pdfData}`;

                Swal.fire({
                    title: 'Vista Previa del PDF',
                    html: `<iframe src="${base64PDF}" width="100%" height="500px" style="border:none;"></iframe>`,
                    width: '600px',
                    confirmButtonText: 'Cerrar',
                });
            })
            .catch((error) => {
                console.error('Error al obtener el PDF:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo para la vista previa.',
                });
            });
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={viewPDF}
                className="btn btn-sm btn-outline-secondary m-0 w-[5rem]"
                disabled={!pdfDocumentId} // Deshabilitar si no hay PDF
            >
                {pdfDocumentId === null
                    ? 'Cargando...' // Mientras se verifica el PDF
                    : pdfDocumentId
                    ? 'Ver PDF' // PDF disponible
                    : 'No disponible'}{' '}
                {/* No hay PDF */}
            </button>
        </div>
    );
};

export default TitleUpload;
