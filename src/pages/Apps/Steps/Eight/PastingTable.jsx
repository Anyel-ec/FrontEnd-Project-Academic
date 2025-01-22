import React, { useState } from 'react';
import Pagination from '../Pagination';
import Swal from 'sweetalert2';
import PdfEightCN from '../pdfSteps/PdfEightCN';
import PDFDownloadButton from '../utils/PDFDownloadButtons';
import { formatDate } from '../utils/Dates';
const PastingTable = ({ pastings, onEdit, info }) => {
    console.log(pastings);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(pastings?.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotification = pastings?.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
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
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentNotification?.length > 0 ? (
                            currentNotification.map((pasting) => (
                                <tr key={pasting?.id}>
                                    <td>
                                        {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.firstNames} {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.lastName}
                                        {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <span className="font-bold"> - </span>
                                                <br />
                                                {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames} {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                        {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                                <>
                                                    <br />
                                                    {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                                </>
                                            )}
                                    </td>
                                    <td>
                                        {pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student.career?.name || 'N/A'}
                                    </td>
                                    <td>{pasting?.meetRequirements ? 'Sí' : 'No'}</td>

                                    <td>{formatDate(pasting?.updatedAt)}</td>

                                    <td className="flex gap-4 items-center justify-center">
                                        {
                                            pasting.meetRequirements ? (
                                                <PDFDownloadButton
                                                    documents={{
                                                        document: <PdfEightCN pasting={pasting} info={info} />,
                                                        fileName: `pasting_${pasting.id}.pdf`,
                                                    }}
                                                    fileName={`pasting_${pasting.id}`}
                                                    label="Descargar PDF"
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => onEdit(pasting)}
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

export default PastingTable;
