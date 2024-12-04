import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import ThesisUpload from './ThesisUpload';
import Swal from 'sweetalert2';
import { formatDate } from '../utils/Dates';
const ThesisTable = ({ thesis, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(thesis.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentThesis = thesis.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
    console.log(currentThesis);
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante(s)</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Cumple Requisitos</th>
                            <th>Última Actualización</th>
                            <th>PDF</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentThesis.length > 0 ? (
                            currentThesis.map((thesis) => (
                                <tr key={thesis.id}>
                                    <td>
                                        {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.firstNames} {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.lastName}
                                        {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <span className='font-bold'> - </span><br />{thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames} {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                        {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <br />
                                                {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.career?.name || 'N/A'}</td>
                                    <td>{thesis?.meetsRequirements ? 'Sí' : 'No'}</td>
                                    <td>{formatDate(thesis?.updatedAt)}</td>
                                    <td>
                                        <ThesisUpload thesisId={thesis.id} />
                                    </td>
                                    <td className="flex gap-4 items-center justify-center">
                                        {
                                            thesis.meetsRequirements ? (
                                                <button
                                                    onClick={() =>
                                                        Swal.fire("Paso Completado", "Constancia de tesis exitosa.", "success")
                                                    }
                                                    className="btn btn-sm btn-outline-info"
                                                >
                                                    Completado
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => onEdit(thesis)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Editar
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    No hay campos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

ThesisTable.propTypes = {
    thesis: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default ThesisTable;
