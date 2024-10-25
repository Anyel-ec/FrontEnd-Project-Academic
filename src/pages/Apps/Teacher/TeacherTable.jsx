import React, { useState } from 'react';

const TeacherTable = ({ teachers, onEdit, onDelete }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 10; // Elementos por página

    const totalPages = Math.ceil(teachers.length / itemsPerPage); // Total de páginas

    // Obtener los profesores para la página actual
    const indexOfLastTeacher = currentPage * itemsPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
    const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    // Funciones para cambiar de página
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>DNI</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo Institucional</th>
                            <th>Celular</th>
                            <th>Carrera</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTeachers.map((teacher) => (
                            <React.Fragment key={teacher.id}>
                                <tr>
                                    <td onClick={() => handleRowClick(teacher.id)} style={{ cursor: 'pointer' }}>
                                        <p className="text-xl"> {expandedRow === teacher.id ? '-' : '+'}</p>
                                    </td>
                                    <td>{teacher.dni}</td>
                                    <td>{teacher.firstNames}</td>
                                    <td>
                                        {teacher.lastName} {teacher.middleName}
                                    </td>

                                    <td>{teacher.institutionalEmail}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.career?.name || 'Sin asignar'}</td>
                                    <td>
                                        <div className="flex gap-4 items-center justify-center">
                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => onEdit(teacher)}>
                                                Editar
                                            </button>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(teacher)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedRow === teacher.id && (
                                    <tr className="expanded-row">
                                        <td colSpan="10"> {/* Aumenta el colSpan para incluir la columna de iconos */}
                                            <div className="p-3">
                                                {/* Información adicional */}
                                                <strong>Dirección:</strong> {teacher.address || 'No disponible'}
                                                <br />
                                                <strong>Fecha de Nacimiento:</strong> {teacher.birthDate || 'No disponible'}
                                                {/* Otros detalles adicionales */}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
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
                            className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </li>

                    {/* Números de página */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1}>
                            <button
                                type="button"
                                className={`flex justify-center font-semibold px-3.5 py-2 rounded transition ${
                                    currentPage === index + 1
                                        ? 'bg-primary text-white'
                                        : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    {/* Botón Siguiente */}
                    <li>
                        <button
                            type="button"
                            className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TeacherTable;
