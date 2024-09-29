import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Función para obtener el token de autenticación del localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

const TitleUpload = ({ reservaId }) => {
    const [file, setFile] = useState(null); // Almacena el archivo seleccionado
    const [base64String, setBase64String] = useState(''); // Almacena el PDF en Base64
    const [pdfDocumentId, setPdfDocumentId] = useState(null); // Almacena el id del documento PDF desde la base de datos

    // Verifica que reservaId no sea undefined antes de usarlo
    useEffect(() => {
        if (!reservaId) {
            console.error('El ID de la reserva es undefined.');
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
                if (!data.pdfDocumentId) {
                    setPdfDocumentId(null); // Si no hay PDF, lo marcamos como null
                } else {
                    setPdfDocumentId(data.pdfDocumentId); // Actualiza el ID del PDF si existe
                }
            })
            .catch((error) => {
                console.error('Error al cargar la reservación:', error);
            });
    }, [reservaId]);

    const uploadFile = () => {
        if (pdfDocumentId) {
            // Si ya hay un PDF cargado, mostramos la vista previa
            fetch(`http://localhost:8080/api/v1/pdfDocument/OneStep/${reservaId}/view`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`, // Asegúrate de enviar el token correcto
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const base64PDF = `data:application/pdf;base64,${data.pdfData}`;
                    setBase64String(base64PDF);

                    Swal.fire({
                        title: 'Vista Previa del PDF',
                        html: `<embed src="${base64PDF}" type="application/pdf" width="100%" height="500px" />`,
                        confirmButtonText: 'Cerrar',
                    });
                })
                .catch((error) => {
                    console.error('Error al obtener el PDF:', error);
                });
        } else {
            // Si no hay PDF, permitir al usuario subir uno
            Swal.fire({
                title: 'Seleccionar un archivo PDF',
                input: 'file',
                inputAttributes: {
                    accept: 'application/pdf',
                },
                confirmButtonText: 'Cargar',
                showCancelButton: true,
                preConfirm: (file) => {
                    if (!file) {
                        Swal.showValidationMessage('Debes seleccionar un archivo');
                    } else {
                        return file;
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedFile = result.value;
                    setFile(selectedFile); // Guarda el archivo seleccionado

                    // Convierte el archivo a Base64 para la vista previa
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64PDF = e.target.result;
                        setBase64String(base64PDF); // Guarda el PDF en formato Base64

                        // Muestra la vista previa del PDF
                        Swal.fire({
                            title: 'Vista Previa del PDF',
                            html: `<embed src="${base64PDF}" type="application/pdf" width="100%" height="500px" />`,
                            confirmButtonText: 'Enviar',
                            showCancelButton: true,
                        }).then((previewResult) => {
                            if (previewResult.isConfirmed) {
                                // Si el usuario confirma, enviar el archivo al backend
                                sendFileToBackend(base64PDF);
                            }
                        });
                    };
                    reader.readAsDataURL(selectedFile); // Lee el archivo como base64
                }
            });
        }
    };

    // Función para enviar el archivo en base64 al servidor
    const sendFileToBackend = (base64Data) => {
        const documentData = {
            pdfData: base64Data.split(',')[1], // Quita el prefijo "data:application/pdf;base64,"
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        fetch(`http://localhost:8080/api/v1/pdfDocument/OneStep/${reservaId}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`, // Envía el token de autenticación
            },
            body: JSON.stringify(documentData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo cargado con éxito',
                    text: 'El archivo ha sido guardado correctamente.',
                });
                // Actualizar el id del PDF document sin necesidad de recargar la página
                setPdfDocumentId(data.pdfDocumentId);
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

    // Función para eliminar el archivo PDF del servidor
    const deletePDF = () => {
        fetch(`http://localhost:8080/api/v1/pdfDocument/OneStep/${reservaId}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`, // Asegúrate de enviar el token correcto
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
                setPdfDocumentId(null); // Limpiar el ID del documento PDF sin recargar la página
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
                {pdfDocumentId ? 'Ver' : 'Subir'}
            </button>
            {pdfDocumentId && (
                <button onClick={deletePDF} className="btn btn-sm btn-outline-danger m-0 ">
                    Eliminar
                </button>
            )}
        </div>
    );
};

export default TitleUpload;
