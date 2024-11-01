// AppointmentTable.jsx
import React, { useState } from 'react';

const AppointmentTable = ({ currentProject, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 1;
    const totalPages = Math.ceil(currentProject.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const projects = currentProject.slice(indexOfFirstItem, indexOfLastItem);
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
                            <th>Asesor</th>
                            <th>Coasesor</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        {project.titleReservationStepOne.student.firstNames} {project.titleReservationStepOne.student.lastName}
                                        {project.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {project.titleReservationStepOne.studentTwo.firstNames} {project.titleReservationStepOne.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {project.titleReservationStepOne.student.studentCode || 'N/A'}
                                        {project.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {project.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{project.titleReservationStepOne.student.career?.name || 'N/A'}</td>
                                    <td>{project.titleReservationStepOne.title || 'Sin título'}</td>
                                    <td>{`${project.adviser.firstNames}  ${project.adviser.lastName}`}</td>
                                    <td>{project.coadviser ? `${project.coadviser.firstNames}  ${project.coadviser.lastName}` : 'N/A'}</td>
                                    <td>{formatearFecha(project.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        <button onClick={() => onEdit(project)} className="btn btn-sm btn-outline-primary">
                                            Editar
                                        </button>
                                        <button onClick={() => onDelete(project.id)} className="btn btn-sm btn-outline-danger">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-2 text-center">
                                    No hay proyectos disponibles
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

export default AppointmentTable;
