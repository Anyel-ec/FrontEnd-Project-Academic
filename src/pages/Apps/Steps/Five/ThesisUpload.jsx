import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ThesisService from '../../../../api/constancyThesisService';
    
const ThesisUpload = ({ thesisId }) => {
    const [pdfExists, setPdfExists] = useState(null);

    useEffect(() => {
        const checkPDFExists = async () => {
            if (!thesisId) {
                console.error('El ID de la reserva es indefinido.');
                return;
            }
            try {
                // Usar el método del módulo para verificar la existencia del PDF
                const exists = await ThesisService.viewPdfDocument(thesisId);
                setPdfExists(Boolean(exists));
            } catch (error) {
                console.error('Error al verificar la existencia del PDF:', error);
                setPdfExists(false);
            }
        };

        checkPDFExists();
    }, [thesisId]);

    const viewPDF = async () => {
        if (!thesisId) {
            Swal.fire({
                icon: 'error',
                title: 'ID de reserva inválido',
                text: 'No se ha proporcionado un ID de reserva válido.',
            });
            return;
        }

        try {
            // Usar el método del módulo para obtener el PDF en base64
            const pdfData = await ThesisService.viewPdfDocument(thesisId);

            if (pdfData) {
                const base64PDF = `data:application/pdf;base64,${pdfData}`;

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
        } catch (error) {
            console.error('Error al cargar el PDF:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar el PDF',
                text: 'Hubo un problema al cargar el PDF.',
            });
        }
    };

    return (
        <div className="flex gap-3">
            <button onClick={viewPDF} className="btn btn-sm btn-outline-secondary m-0 w-[5rem]" disabled={pdfExists === false}>
                {pdfExists === null ? 'Cargando...' : pdfExists ? 'Ver PDF' : 'No disponible'}
            </button>
        </div>
    );
};

export default ThesisUpload;
