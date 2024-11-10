import React, { useState } from 'react';

const JuryTable = ({ currentJury, onEdit, adviserOptions }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(currentJury.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const jurys = currentJury.slice(indexOfFirstItem, indexOfLastItem);
    const formatearFecha = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    const elegirJurados = (jury) => {
        // Filtrar las opciones que no están en adviser ni coadviser
        const juradosDisponibles = adviserOptions.filter((adviser) => adviser.id !== jury.adviser?.id && adviser.id !== jury.coadviser?.id);

        // Elegir el primer jurado disponible o asignar null si no hay más
        const nuevoJurado = juradosDisponibles.length > 0 ? juradosDisponibles[0] : null;

        // Actualizar la asignación del jurado (puedes ajustar cómo se maneja esta asignación)
        if (nuevoJurado) {
            console.log(`Asignando jurado: ${nuevoJurado.firstNames} ${nuevoJurado.lastName}`);
        } else {
            console.log('No hay más jurados disponibles para asignar');
        }

        // Aquí podrías implementar una función `onAssign` o similar para actualizar la asignación
        // onAssign(jury.id, nuevoJurado);
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
                            <th>Presidente</th>
                            <th>Primer Miembro</th>
                            <th>Segundo Miembro</th>
                            <th>Accesitario</th>
                            <th>Asesor</th>
                            <th>Coasesor</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {jurys.length > 0 ? (
                            jurys.map((jury) => (
                                <tr key={jury.id}>
                                    <td>
                                        {jury.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} {jury.projectApprovalStepTwo.titleReservationStepOne.student.lastName}
                                        {jury.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {jury.projectApprovalStepTwo.titleReservationStepOne.studentTwo.firstNames} {jury.projectApprovalStepTwo.titleReservationStepOne.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {jury.projectApprovalStepTwo.titleReservationStepOne.student.studentCode || 'N/A'}
                                        {jury.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {jury.projectApprovalStepTwo.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{jury.projectApprovalStepTwo.titleReservationStepOne.student.career?.name || 'N/A'}</td>
                                    <td>{jury.president ? `${jury.president.firstNames || ' '} ${jury.president.lastName || ' '}` : 'N/A'}</td>
                                    <td>{jury.firstMember ? `${jury.firstMember.firstNames || ' '} ${jury.firstMember.lastName || ' '}` : 'N/A'}</td>
                                    <td>{jury.secondMember ? `${jury.secondMember.firstNames || ' '} ${jury.secondMember.lastName || ' '}` : 'N/A'}</td>
                                    <td>{jury.accessory ? `${jury.accessory.firstNames || ' '} ${jury.accessory.lastName || ' '}` : 'N/A'}</td>
                                    <td>
                                        {jury.projectApprovalStepTwo.adviser
                                            ? `${jury.projectApprovalStepTwo.adviser.firstNames || ' '} ${jury.projectApprovalStepTwo.adviser.lastName || ' '}`
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {jury.projectApprovalStepTwo.coadviser
                                            ? `${jury.projectApprovalStepTwo.coadviser.firstNames || ' '} ${jury.projectApprovalStepTwo.coadviser.lastName || ' '}`
                                            : 'N/A'}
                                    </td>
                                    <td>{formatearFecha(jury.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        <button onClick={() => onEdit(jury)} className="btn btn-sm btn-outline-primary">
                                            Editar
                                        </button>
                                        <button onClick={() => elegirJurados(jury)} className="btn btn-sm btn-outline-danger">
                                            Elegir Jurados
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

export default JuryTable;
