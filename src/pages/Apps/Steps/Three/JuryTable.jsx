import React, { useState } from 'react';
import teacherService from '../../../../api/teacherService';

const JuryTable = ({ currentJury, onEdit, adviserOptions,onSave }) => {
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

    const elegirJurados = async (jury) => {
        const careerId = jury.projectApprovalStepTwo.adviser.career.id;

        try {
            const allAdvisers = await teacherService.getTeachersByCareer(careerId);
            console.log('Todos los docentes obtenidos:', allAdvisers);

            // Extraer los nombres de los asesores seleccionados de la interfaz
            const selectedAdvisers = [
                jury.projectApprovalStepTwo.adviser?.firstNames + ' ' + jury.projectApprovalStepTwo.adviser?.lastName,
                jury.projectApprovalStepTwo.coadviser?.firstNames + ' ' + jury.projectApprovalStepTwo.coadviser?.lastName,
            ].filter((name) => name); // Filtrar undefined o nombres vacíos

            // Normalizar y filtrar los docentes que no están seleccionados
            const normalize = (str) => str.toLowerCase().trim();
            const availableAdvisers = allAdvisers.filter((adviser) => !selectedAdvisers.map(normalize).includes(normalize(adviser.firstNames + ' ' + adviser.lastName)));

            console.log('Docentes disponibles:', availableAdvisers);

            // Seleccionar aleatoriamente los jurados
            const randomSelection = {};
            const roles = ['president', 'firstMember', 'secondMember', 'accessory']; // Los roles a asignar

            roles.forEach((role) => {
                if (availableAdvisers.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableAdvisers.length); // Índice aleatorio
                    randomSelection[role] = { id: availableAdvisers[randomIndex].id };
                    availableAdvisers.splice(randomIndex, 1); // Remover para evitar duplicados
                } else {
                    randomSelection[role] = null; // Si no hay suficientes docentes
                }
            });

            // Imprimir en consola los jurados seleccionados
            console.log('Jurados seleccionados:', {
                president: randomSelection['president'],
                firstMember: randomSelection['firstMember'],
                secondMember: randomSelection['secondMember'],
                accessory: randomSelection['accessory'],
            });

            // Devolver el objeto con los jurados seleccionados
            return {
                president: randomSelection['president'],
                firstMember: randomSelection['firstMember'],
                secondMember: randomSelection['secondMember'],
                accessory: randomSelection['accessory'],
            };
        } catch (error) {
            console.error('Error al obtener los docentes:', error);
            return {
                president: null,
                firstMember: null,
                secondMember: null,
                accessory: null,
            };
        }
    };
    const handleRandomJurySelection = async (jury) => {
        const selectedJurors = await elegirJurados(jury);
        if (onSave) {
            onSave(selectedJurors, jury.id); // Asumiendo que `jury.id` es el ID del proyecto
        }
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
                                        <button onClick={() => handleRandomJurySelection(jury)} className="btn btn-sm btn-outline-danger">
                                            Elegir Jurados
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
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
