// src/components/AlumnoList.js
import React from 'react';

const AlumnoList = ({ items, onEdit, onDelete }) => {
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Student Code</th>
                            <th>DNI</th>
                            <th>First Names</th>
                            <th>Last Name</th>
                            <th>Middle Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th className="!text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((alumno) => (
                            <tr key={alumno.id}>
                                <td>{alumno.studentCode}</td>
                                <td>{alumno.dni}</td>
                                <td>{alumno.firstNames}</td>
                                <td>{alumno.lastName}</td>
                                <td>{alumno.middleName}</td>
                                <td>{alumno.email}</td>
                                <td>{alumno.phone}</td>
                                <td>{alumno.address}</td>
                                <td>
                                    <div className="flex gap-4 items-center justify-center">
                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => onEdit(alumno)}>Edit</button>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(alumno)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlumnoList;
