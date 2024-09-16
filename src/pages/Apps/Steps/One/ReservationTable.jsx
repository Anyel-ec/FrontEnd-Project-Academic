import React, { useState } from 'react';

const ReservationTable = ({ titleReservations, apiError, onEdit, onDelete }) => {
    // Estado para controlar la página actual y el tamaño de la página
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Número de elementos por página

    // Calcular el índice del último y primer elemento de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = titleReservations.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(titleReservations.length / itemsPerPage);

    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            <th>Estudiante</th>
                            <th>Proyecto</th>
                            <th>Observaciones</th>
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReservations.length > 0 ? (
                            currentReservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>{reservation.student.studentCode}</td>
                                    <td>{reservation.meetsRequirements ? 'Sí' : 'No'}</td>
                                    <td>
                                        {reservation.student.firstNames ?? ''} {reservation.student.lastName ?? ''}
                                    </td>
                                    <td>{reservation.project ? 'Sí' : 'No'}</td>
                                    <td>{reservation.observations ?? 'Ninguna'}</td>
                                    <td>{reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>{reservation.updatedAt ? new Date(reservation.updatedAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <div className="flex gap-4 items-center justify-center">
                                            {/* Pasa toda la reservación para edición, no solo el ID */}
                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => onEdit(reservation.id)}>
                                                Editar
                                            </button>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(reservation.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-2 text-center">
                                    No hay reservaciones disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center mt-4">
                <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-4">
                    {/* Botón Anterior */}
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

                    {/* Botones de páginas */}
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

                    {/* Botón Siguiente */}
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
