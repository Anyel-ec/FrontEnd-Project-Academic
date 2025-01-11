import React, { useState } from 'react';
import Pagination from '../Pagination';
import { formatDate } from '../utils/Dates';

const PassageView = ({ expansions, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(expansions.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentExpansions = expansions.slice(indexOfFirstItem, indexOfLastItem);

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
                        {currentExpansions.length > 0 ? (
                            currentExpansions.map((expansion) => (
                                <tr key={expansion.id}>
                                    <td>
                                        {expansion?.titleReservationStepOne.student?.studentCode || 'N/A'}
                                        {expansion?.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {expansion?.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {expansion?.titleReservationStepOne.student?.firstNames ?? ''} {expansion?.titleReservationStepOne.student?.lastName ?? ''}
                                        {expansion?.titleReservationStepOne.studentTwo && (
                                            <p>
                                                {expansion?.titleReservationStepOne.studentTwo?.firstNames ?? ''} {expansion?.titleReservationStepOne.studentTwo?.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>
                                    <td>{expansion?.titleReservationStepOne.student.career.name}</td>
                                    <td>{expansion?.meetRequirements ? 'Sí' : 'No'}</td>
                                    <td>{expansion?.observation || 'N/A'}</td>
                                    <td>{formatDate(expansion?.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        <button
                                            onClick={() => onEdit(expansion)}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            onClick={() => onEdit(expansion)}
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
                                    No hay expansiones disponibles
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

export default PassageView;
