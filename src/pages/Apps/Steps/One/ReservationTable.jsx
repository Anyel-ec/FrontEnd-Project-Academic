import React, { useState } from 'react';
import Pagination from '../Pagination';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfOne from '../pdfSteps/PdfOne';
import TitleUpload from './TitleUpload'; 
import { getYear, formatDate } from '../utils/Dates';
const ReservationTable = ({ titleReservations, selectedCareer, apiError, onEdit, onDelete, searchTerm }) => {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const getDownloadButton = (reservation) => {
        const fileName = `constancia-${reservation.id}-${getYear()}.pdf`;

        return (
            <PDFDownloadLink document={<PdfOne reservation={reservation} />} fileName={fileName}>
                {({ loading }) =>
                    loading ? (
                        'Cargando documento...'
                    ) : (
                        <button className="btn btn-sm btn-outline-primary">Descargar Comprobante</button>
                    )
                }
            </PDFDownloadLink>
        );
    };

    const getActionButtons = (reservation) => (
        <>
            <button onClick={() => onEdit(reservation)} className="btn btn-sm btn-outline-primary">
                Editar
            </button>
            <button onClick={() => onDelete(reservation.id)} className="btn btn-sm btn-outline-danger">
                Eliminar
            </button>
        </>
    );

    const filteredByCareer =
        selectedCareer?.value
            ? titleReservations.filter((reservation) => reservation.student.career.id === selectedCareer.value)
            : titleReservations;

    const normalizedSearchTerm = searchTerm
        .normalize('NFD')
        // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const filteredReservations = filteredByCareer.filter(
        (reservation) =>
            reservation.student.studentCode.toLowerCase().includes(normalizedSearchTerm) ||
            `${reservation.student.firstNames} ${reservation.student.lastName}`
                .normalize('NFD')
                // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .includes(normalizedSearchTerm) ||
            (reservation.studentTwo &&
                (reservation.studentTwo.studentCode.toLowerCase().includes(normalizedSearchTerm) ||
                    `${reservation.studentTwo.firstNames} ${reservation.studentTwo.lastName}`
                        .normalize('NFD')
                        // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                        .includes(normalizedSearchTerm)))
    );

    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            {apiError && <div className="text-danger">{apiError}</div>}
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cumple Requisitos</th>
                            <th>Estudiante(s)</th>
                            <th>Carrera</th>
                            <th>Proyecto</th>
                            <th>Observaciones</th>
                            <th>Similitud</th>
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th className="!text-center">PDF</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReservations.length > 0 ? (
                            currentReservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>
                                        {reservation.student?.studentCode || 'N/A'}
                                        {reservation.studentTwo && (
                                            <>
                                                <br />
                                                {reservation.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{reservation.meetsRequirements ? 'Sí' : 'No'}</td>
                                    <td>
                                        {reservation.student?.firstNames ?? ''} {reservation.student?.lastName ?? ''}
                                        {reservation.studentTwo && (
                                            <p>
                                                {reservation.studentTwo?.firstNames ?? ''} {reservation.studentTwo?.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>
                                    <td>{reservation.student?.career?.name || 'N/A'}</td>
                                    <td>{reservation.project ? 'Sí' : 'No'}</td>
                                    <td>{reservation.observations || 'Ninguna'}</td>
                                    <td>{reservation.projectSimilarity}%</td>
                                    <td>{formatDate(reservation.createdAt)}</td>
                                    <td>{formatDate(reservation.updatedAt)}</td>
                                    <td>
                                        <TitleUpload reservaId={reservation.id} meetsRequirements={reservation.meetsRequirements} />
                                    </td>
                                    <td className="flex gap-4 items-center justify-center">
                                        {reservation.meetsRequirements
                                            ? getDownloadButton(reservation)
                                            : getActionButtons(reservation)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    No hay reservaciones disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default ReservationTable;
