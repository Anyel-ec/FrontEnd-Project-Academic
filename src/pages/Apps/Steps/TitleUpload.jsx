import React, { useState } from 'react';
import Swal from 'sweetalert2';

const TitleUpload = () => {
    const [file, setFile] = useState(null); // State to store the file

    // Function to upload the file and convert it to base64
    const uploadFile = () => {
        Swal.fire({
            title: 'Seleccionar un archivo PDF',
            input: 'file', // Input tipo file
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
                setFile(selectedFile);

                // Convertir el archivo a base64 y mostrar la vista previa
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64String = e.target.result;

                    // Mostrar la vista previa del PDF en otra alerta
                    Swal.fire({
                        title: 'Vista Previa del PDF',
                        html: `<embed src="${base64String}" type="application/pdf" width="100%" height="500px"/>`,
                        confirmButtonText: 'Cerrar',
                    });

                    // Send the file data to the backend
                    sendFileToBackend(base64String);
                };
                reader.readAsDataURL(selectedFile); // Read file as base64
            }
        });
    };

    // Function to send file data to backend
    const sendFileToBackend = (base64Data) => {
        const documentData = {
            pdfData: base64Data.split(',')[1], // Extract base64 string without prefix
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        fetch('localhost:8080/api/pdfDocument/OneStep/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(documentData),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo cargado con éxito',
                    text: 'El archivo ha sido guardado correctamente.',
                });
            })
            .catch((error) => {
                console.error('Error al subir el archivo:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo.',
                });
            });
    };

    return (
        <button onClick={uploadFile} className="btn btn-sm btn-outline-secondary m-0">
            Subir
        </button>
    );
};

export default TitleUpload;
