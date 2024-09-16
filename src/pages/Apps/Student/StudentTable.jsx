import React, { useState } from 'react';

const StudentTable = ({ students, onEdit, onDelete }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 10; // Estudiantes por página

    const totalPages = Math.ceil(students.length / itemsPerPage); // Número total de páginas

    // Obtener estudiantes para la página actual
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

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
                            <th>Código</th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Carrera</th>
                            <th>Correo</th>
                            <th>Celular</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student) => (
                            <React.Fragment key={student.id}>
                                <tr>
                                    <td onClick={() => handleRowClick(student.id)} style={{ cursor: 'pointer' }}>
                                        <p className="text-xl">{expandedRow === student.id ? '-' : '+'}</p>
                                    </td>
                                    <td>{student.studentCode}</td>
                                    <td>{student.dni}</td>
                                    <td>{student.firstNames}</td>
                                    <td>
                                        {student.lastName} {student.middleName}
                                    </td>
                                    <td>{student.career?.name || 'Sin asignar'}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>
                                        <div className="flex gap-4 items-center justify-center">
                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => onEdit(student)}>
                                                Editar
                                            </button>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(student)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedRow === student.id && (
                                    <tr className="expanded-row">
                                        <td colSpan="10">
                                            <div className="p-3 flex gap-5">
                                                <strong>Dirección:</strong> {student.address || 'No disponible'}
                                                <strong>Fecha de Nacimiento:</strong> {student.birthDate || 'No disponible'}
                                                <strong>Género:</strong> {student.gender === true ? 'Masculino' : 'Femenino'}
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

export default StudentTable;
