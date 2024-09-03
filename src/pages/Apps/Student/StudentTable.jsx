const StudentTable = ({ students, onEdit, onDelete }) => {
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Carrera</th>
                            <th>Correo</th>
                            <th>Celular</th>
                            <th>Género</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.studentCode}</td>
                                <td>{student.dni}</td>
                                <td>{student.firstNames}</td>
                                <td>{student.lastName} {student.middleName}</td>
                                <td>{student.career?.name || "Sin asignar"}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.gender === true? "Masculino" : "Femenino"}</td> 
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;
