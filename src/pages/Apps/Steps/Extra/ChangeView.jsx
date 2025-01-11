import React, { useState } from 'react';
import Pagination from '../Pagination';
import { formatDate } from '../utils/Dates';

const ChangeView = ({ change, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(change.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentChange = change.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Cumple Requisitos</th>
                            <th>Observación</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentChange.length > 0 ? (
                            currentChange.map((change) => (
                                <tr key={change.id}>
                                    <td>
                                        {change?.titleReservationStepOne.student?.studentCode || 'N/A'}
                                        {change?.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {change?.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {change?.titleReservationStepOne.student?.firstNames ?? ''} {change?.titleReservationStepOne.student?.lastName ?? ''}
                                        {change?.titleReservationStepOne.studentTwo && (
                                            <p>
                                                {change?.titleReservationStepOne.studentTwo?.firstNames ?? ''} {change?.titleReservationStepOne.studentTwo?.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>
                                    <td>{change?.titleReservationStepOne.student.career.name}</td>
                                    <td>{change?.meetRequirements ? 'Sí' : 'No'}</td>
                                    <td>{change?.observation || 'N/A'}</td>
                                    <td>{formatDate(change?.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        <button
                                            onClick={() => onEdit(change)}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            onClick={() => onEdit(change)}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-2 text-center">
                                    No hay cambios de asesores disponibles
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

export default ChangeView;