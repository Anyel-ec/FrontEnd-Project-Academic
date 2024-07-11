import React, { useState, useEffect } from 'react';
import { IconUser } from './IconImports';
import { getAllStudents } from './api'; // Asegúrate de que la ruta sea correcta


const UserList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getAllStudents()
            .then(data => {
                setStudents(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Student Code</th>
                        <th>DNI</th>
                        <th>First Names</th>
                        <th>Last Name</th>
                        <th>Middle Name</th>
                        <th>Birth Date</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.studentCode}</td>
                            <td>{student.dni}</td>
                            <td>{student.firstNames}</td>
                            <td>{student.lastName}</td>
                            <td>{student.middleName}</td>
                            <td>{student.birthDate}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.address}</td>
                            <td className="flex gap-4 items-center justify-center">
                                {/* Example actions */}
                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(student.id)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
