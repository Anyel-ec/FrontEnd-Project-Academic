import React, { useState } from 'react';

const ApprovalTable = ({ projectApprovals, apiError, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(projectApprovals.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projectApprovals.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentProjects)
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
                            <th>Asesor</th>
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        {project.titleReservationStepOne.student?.studentCode || 'N/A'}
                                        {project.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {project.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{project.titleReservationStepOne.meetsRequirements ? 'Sí' : 'No'}</td>
                                    <td>
                                        {project.titleReservationStepOne.student?.firstNames ?? ''} {project.titleReservationStepOne.student?.lastName ?? ''}
                                        {project.titleReservationStepOne.studentTwo && (
                                            <p>
                                                {project.titleReservationStepOne.studentTwo?.firstNames ?? ''} {project.titleReservationStepOne.studentTwo?.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>
                                    <td>{project.titleReservationStepOne.student?.career?.name || 'N/A'}</td>
                                    <td>{project.titleReservationStepOne.project ? 'Sí' : 'No'}</td>
                                    <td>{project.observations || 'Ninguna'}</td>
                                    <td>{project.titleReservationStepOne.projectSimilarity}</td>
                                    <td>{project.adviser || 'Ninguno'}</td>
                                    <td>{new Date(project.createdAt).toLocaleString()}</td>
                                    <td>{new Date(project.updatedAt).toLocaleString()}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        {project.meetsRequirements ? (
                                            <button className="btn btn-sm btn-outline-primary">Descargar Comprobante</button>
                                        ) : (
                                            <>
                                                <button onClick={() => onEdit(project)} className="btn btn-sm btn-outline-primary">
                                                    Editar
                                                </button>
                                                <button onClick={() => onDelete(project.id)} className="btn btn-sm btn-outline-danger">
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="px-4 py-2 text-center">
                                    No hay proyectos disponibles para aprobación
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

export default ApprovalTable;
