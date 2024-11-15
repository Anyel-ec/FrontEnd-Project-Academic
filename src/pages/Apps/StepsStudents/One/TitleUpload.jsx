import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AppEnvironments from '../../../../config/AppEnvironments';
import '../../../../assets/css/file-upload-preview.css';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const PDFONE_API_URL = `${AppEnvironments.baseUrl}api/v1/pdfDocument/OneStep/`;
const TITLERESERVATION_API_URL = `${AppEnvironments.baseUrl}api/v1/reservas_titulo/`;

const TitleUpload = ({ reservaId }) => {
    const [pdfDocumentId, setPdfDocumentId] = useState(null);

    useEffect(() => {
        if (!reservaId) {
            console.error('El ID de la reserva es undefined.');
            return;
        }

        // Llamada al backend para verificar si hay un PDF asociado
        fetch(`${PDFONE_API_URL}${reservaId}/view`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
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
                if (data && data.pdfDocumentId) {
                    setPdfDocumentId(data.pdfDocumentId);
                } else {
                    setPdfDocumentId(null);
                }
            })
            .catch((error) => {
                console.error('Error al cargar la reservación:', error);
            });
    }, [reservaId]);

    const uploadFile = () => {
        Swal.fire({
            title: 'Seleccionar un archivo PDF',
            html: `
                <div class="custom-file-wrapper">
                    <button type="button" class="custom-file-button">Seleccionar archivo</button>
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
                } else if (file.size > 1048576) { // 1MB
                    Swal.showValidationMessage('El archivo no debe superar los 1 MB');
                } else {
                    return file;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedFile = result.value;

                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64PDF = e.target.result.split(',')[1]; // Remueve el prefijo `data:application/pdf;base64,`

                    sendFileToBackend(base64PDF);
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

    const sendFileToBackend = (base64Data) => {
        const documentData = {
            pdfData: base64Data
        };

        fetch(`${TITLERESERVATION_API_URL}${reservaId}/uploadPdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(documentData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo cargado con éxito',
                    text: 'El archivo ha sido guardado correctamente.',
                });
                setPdfDocumentId(true); // Marca el PDF como cargado
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

    const viewPDF = () => {
        // Llama al backend para obtener el PDF en base64 y mostrarlo en una vista previa
        fetch(`${PDFONE_API_URL}${reservaId}/view`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const base64PDF = `data:application/pdf;base64,${data.pdfData}`;

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
        fetch(`${PDFONE_API_URL}${reservaId}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el PDF');
                }
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
        <div className="flex gap-3">
            <button onClick={uploadFile} className="btn btn-sm btn-outline-secondary m-0">
                {pdfDocumentId ? 'Actualizar' : 'Subir'}
            </button>
            {pdfDocumentId && (
                <>
                    <button onClick={viewPDF} className="btn btn-sm btn-outline-primary m-0">
                        Ver
                    </button>
                    <button onClick={deletePDF} className="btn btn-sm btn-outline-danger m-0">
                        Eliminar
                    </button>
                </>
            )}
        </div>
    );
};

export default TitleUpload;
