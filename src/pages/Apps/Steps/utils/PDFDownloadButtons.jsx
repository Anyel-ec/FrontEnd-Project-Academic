import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const PDFDownloadButton = ({ documents, fileName, label = 'Descargar PDF(s)' }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleDownload = async () => {
        setIsLoading(true);

        // Si es un único documento, descarga el PDF directamente
        if (!Array.isArray(documents)) {
            const blob = await pdf(documents.document).toBlob();
            saveAs(blob, fileName);
        } else {
            // Si son múltiples documentos, genera un archivo ZIP
            const zip = new JSZip();
            for (const { document, fileName } of documents) {
                const blob = await pdf(document).toBlob();
                zip.file(fileName, blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, `${fileName}.zip`);
        }

        setIsLoading(false);
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            className="btn btn-sm btn-outline-primary"
            disabled={isLoading}
        >
            {isLoading ? 'Cargando...' : label}
        </button>
    );
};

export default PDFDownloadButton;
