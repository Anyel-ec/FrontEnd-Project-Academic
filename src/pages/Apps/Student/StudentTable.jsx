import React, { useState } from 'react';

const StudentTable = ({ students, onEdit, onDelete }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th> {/* Columna para los iconos */}
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
                        {students.map((student) => (
                            <React.Fragment key={student.id}>
                                <tr>
                                    <td onClick={() => handleRowClick(student.id)} style={{ cursor: 'pointer' }}>
                                        <p className='text-xl' >  {expandedRow === student.id ? "-" : "+"}</p>
                                    </td>
                                    <td>{student.studentCode}</td>
                                    <td>{student.dni}</td>
                                    <td>{student.firstNames}</td>
                                    <td>{student.lastName} {student.middleName}</td>
                                    <td>{student.career?.name || "Sin asignar"}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                   
                                    <td>
                                        <div className="flex gap-4 items-center justify-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onEdit(student)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete(student)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedRow === student.id && (
                                    <tr className="expanded-row">
                                        <td colSpan="10"> {/* Aumenta el colSpan para incluir la columna de iconos */}
                                            <div className="p-3 flex flex-col">
                                                {/* Información adicional */}
                                                <strong>Dirección:</strong> {student.address || 'No disponible'}
                                                <strong>Fecha de Nacimiento:</strong> {student.birthDate || 'No disponible'}
                                                <strong>Género:</strong> {student.gender === true ? "Masculino" : "Femenino"}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;
