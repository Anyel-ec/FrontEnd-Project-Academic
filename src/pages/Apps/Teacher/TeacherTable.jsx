import React, { useState } from 'react';
import Pagination from '../Steps/Pagination';
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
                                        <td colSpan="10">
                                            {' '}
                                            {/* Aumenta el colSpan para incluir la columna de iconos */}
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

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default TeacherTable;
