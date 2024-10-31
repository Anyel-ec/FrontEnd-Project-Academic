import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ApprovalTable = ({ reservacionesEstudiantes, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 1;
    const totalPages = Math.ceil(reservacionesEstudiantes.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = reservacionesEstudiantes.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const formatearFecha = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiantes</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Proyecto de Tesis</th>
                            <th>Similitud</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentReservations.length > 0 ? (
                            currentReservations.map((reservacion) => (
                                <tr key={reservacion.id}>
                                    <td>
                                        {reservacion.student.firstNames} {reservacion.student.lastName}
                                        {reservacion.studentTwo && (
                                            <>
                                                <br />
                                                {reservacion.studentTwo.firstNames} {reservacion.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {reservacion.student.studentCode || 'N/A'}
                                        {reservacion.studentTwo && (
                                            <>
                                                <br />
                                                {reservacion.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{reservacion.student.career?.name || 'N/A'}</td>
                                    <td>{reservacion.title || 'Sin título'}</td>
                                    <td>{`${reservacion.projectSimilarity || 0}%`}</td>
                                    <td>{formatearFecha(reservacion.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        <button onClick={() => onEdit(reservacion)} className="btn btn-sm btn-outline-primary">
                                            Editar
                                        </button>
                                        <button onClick={() => onDelete(reservacion.id)} className="btn btn-sm btn-outline-danger">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-2 text-center">
                                    No hay reservaciones disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center mt-4">
                <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-4">
                    <li>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                        >
                            &lt;
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
                            &gt;
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

ApprovalTable.propTypes = {
    reservacionesEstudiantes: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default ApprovalTable;
