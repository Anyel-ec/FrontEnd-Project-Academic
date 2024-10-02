import React, { useState } from 'react';
import TitleUpload from './TitleUpload'; // Asegúrate de que el path de importación es correcto

const ReservationTable = ({ titleReservations, apiError, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfDataMap, setPdfDataMap] = useState({}); // Mapea cada reserva a su PDF en base64

    const itemsPerPage = 4;
    const totalPages = Math.ceil(titleReservations.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = titleReservations.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const handlePDFUploadSuccess = (reservationId, base64Data) => {
        setPdfDataMap((prev) => ({
            ...prev,
            [reservationId]: base64Data, // Mapea el PDF a la reserva correspondiente
        }));
        console.log('PDF cargado y convertido a Base64 para la reserva:', reservationId);
    };

    const handlePDFUploadFailure = (error) => {
        console.error('Error al cargar el PDF:', error);
    };

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
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th className='!text-center'>PDF</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentReservations.length > 0 ? (
                        currentReservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>
                                    {reservation.student.studentCode}{' '}
                                    {reservation.studentTwo && (
                                        <>
                                            <br />
                                            {reservation.studentTwo.studentCode}
                                        </>
                                    )}
                                </td>

                                <td>{reservation.meetsRequirements ? 'Sí' : 'No'}</td>
                                <td>
                                    {reservation.student.firstNames ?? ''} {reservation.student.lastName ?? ''}
                                    {reservation.studentTwo && (
                                        <p>
                                            {reservation.studentTwo.firstNames ?? ''} {reservation.studentTwo.lastName ?? ''}
                                        </p>
                                    )}
                                </td>

                                <td>{reservation.student.career.name}</td>
                                <td>{reservation.project ? 'Sí' : 'No'}</td>
                                <td>{reservation.observations || 'Ninguna'}</td>
                                <td>{new Date(reservation.createdAt).toLocaleString()}</td>
                                <td>{new Date(reservation.updatedAt).toLocaleString()}</td>
                                <td className='gap-4'>
                                    {pdfDataMap[reservation.id] ? (
                                        <a href={`data:application/pdf;base64,${pdfDataMap[reservation.id]}`} target="_blank" rel="noopener noreferrer" className="">
                                            Ver
                                        </a>
                                    ) : (
                                        <TitleUpload
                                            reservaId={reservation.id} // Pasa el ID de la reservación al componente de carga
                                            onUploadSuccess={(base64Data) => handlePDFUploadSuccess(reservation.id, base64Data)} // Mapea el PDF a la reservación correspondiente
                                            onUploadFailure={handlePDFUploadFailure}
                                        />
                                    )}
                                </td>
                                <td className="flex gap-4 items-center justify-center">
                                    {/* <button onClick={() => onEdit(reservation.id)} className="btn btn-sm btn-outline-primary">
                                        Editar
                                    </button> */}
                                    <button onClick={() => onDelete(reservation.id)} className="btn btn-sm btn-outline-danger">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="px-4 py-2 text-center">
                                No hay reservaciones disponibles
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center mt-4">
                <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-4">
                    <li>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1}>
                            <button
                                type="button"
                                onClick={() => handlePageChange(index + 1)}
                                className={`flex justify-center font-semibold px-3.5 py-2 rounded transition ${
                                    currentPage === index + 1
                                        ? 'bg-primary text-white dark:bg-primary dark:text-white-light'
                                        : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ReservationTable;
