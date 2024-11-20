import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ThesisService from '../../../../api/constancyThesisService';
import { showObservations } from '../utils/ShowObservations';

const ThesisUpload = ({ thesisId, meetsRequirements, observations }) => {
    const [pdfDocumentId, setPdfDocumentId] = useState(null);

    useEffect(() => {
        if (!thesisId) {
            console.error('El ID de la tesis es undefined.');
            return;
        }
        // Llamada al backend para verificar si hay un PDF asociado
        ThesisService.viewPdfDocument(thesisId)
            .then((pdfData) => {
                if (pdfData) {
                    setPdfDocumentId(true); // Indica que el PDF está cargado
                } else {
                    setPdfDocumentId(null);
                }
            })
            .catch((error) => {
                console.error('Error al cargar el documento de la tesis:', error);
            });
    }, [thesisId]);

    const uploadFile = () => {
        Swal.fire({
            title: 'Seleccionar un archivo PDF',
            html: `
                <div class="custom-file-wrapper">
                    <button type="button" class="bg-green-700 custom-file-button">Seleccionar archivo</button>
                    <input id="fileInput" type="file" class="custom-file-input" accept="application/pdf" />
                    <span id="fileName" class="custom-file-text">Ningún archivo seleccionado</span>
                </div>
            `,
            confirmButtonText: 'Cargar',
            showCancelButton: true,
            didOpen: () => {
                const fileInput = document.getElementById('fileInput');
                const fileName = document.getElementById('fileName');
                const customFileButton = document.querySelector('.custom-file-button');

                customFileButton.addEventListener('click', () => {
                    fileInput.click();
                });

                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    fileName.textContent = file ? file.name : 'Ningún archivo seleccionado';
                });
            },
            preConfirm: () => {
                const fileInput = document.getElementById('fileInput');
                const file = fileInput.files[0];
                if (!file) {
                    Swal.showValidationMessage('Debes seleccionar un archivo');
                } else if (file.type !== 'application/pdf') {
                    Swal.showValidationMessage('El archivo debe ser un PDF');
                } else if (file.size > 1048576) {
                    // 1MB
                    Swal.showValidationMessage('El archivo no debe superar los 1 MB');
                } else {
                    return file;
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedFile = result.value;

                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64PDF = e.target.result.split(',')[1];
                    ThesisService.uploadPdfDocument(thesisId, base64PDF)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Archivo cargado con éxito',
                                text: 'El archivo ha sido guardado correctamente.',
                            });
                            setPdfDocumentId(true);
                        })
                        .catch((error) => {
                            console.error('Error al subir el archivo:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `No se pudo cargar el archivo: ${error.message}`,
                            });
                        });
                };
                reader.onerror = () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al leer el archivo PDF.',
                    });
                };
                reader.readAsDataURL(selectedFile);
            }
        });
    };

    const viewPDF = () => {
        ThesisService.viewPdfDocument(thesisId)
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

    const deletePDF = () => {
        ThesisService.deletePdfDocument(thesisId)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'PDF eliminado',
                    text: 'El archivo PDF ha sido eliminado con éxito.',
                });
                setPdfDocumentId(null);
            })
            .catch((error) => {
                console.error('Error al eliminar el PDF:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `No se pudo eliminar el archivo: ${error.message}`,
                });
            });
    };

    return (
        <div className="flex gap-3 justify-center">
            {pdfDocumentId && (
                <button onClick={viewPDF} className="btn btn-sm btn-outline-primary m-0">
                    Ver
                </button>
            )}
            {!meetsRequirements && (
                <>
                    <button onClick={uploadFile} className="btn btn-sm btn-outline-secondary m-0">
                        {pdfDocumentId ? 'Actualizar' : 'Subir'}
                    </button>
                    {pdfDocumentId && (
                        <button onClick={deletePDF} className="btn btn-sm btn-outline-danger m-0">
                            Eliminar
                        </button>
                    )}
                </>
            )}
            <button className="btn btn-sm btn-outline-success m-0" onClick={()=>showObservations(observations)}>Observaciones</button>
        </div>
    );
};

export default ThesisUpload;
