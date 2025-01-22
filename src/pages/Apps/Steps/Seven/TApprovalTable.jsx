import React, { useState } from 'react';
import PDFDownloadButton from '../utils/PDFDownloadButtons';
import PdfSevenC from '../pdfSteps/PdfSevenC';
import Pagination from '../Pagination';
import { formatDate } from '../utils/Dates';

const TApprovalTable = ({ tapprovals, onEdit, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(tapprovals?.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTApproval = tapprovals?.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
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
                        {currentTApproval?.length > 0 ? (
                            currentTApproval.map((tapproval) => (
                                <tr key={tapproval?.id}>
                                    <td>
                                        {
                                            tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                                                ?.student.firstNames
                                        }{' '}
                                        {
                                            tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                                                ?.student.lastName
                                        }
                                        {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                                            ?.studentTwo && (
                                                <>
                                                    <span className="font-bold"> - </span>
                                                    <br />
                                                    {
                                                        tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                            ?.titleReservationStepOne?.studentTwo.firstNames
                                                    }{' '}
                                                    {
                                                        tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                            ?.titleReservationStepOne?.studentTwo.lastName
                                                    }
                                                </>
                                            )}
                                    </td>
                                    <td>
                                        {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                                            ?.student?.studentCode || 'N/A'}
                                        {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                                            ?.studentTwo && (
                                                <>
                                                    <br />
                                                    {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                        ?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                                </>
                                            )}
                                    </td>
                                    <td>
                                        {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne
                                            ?.student.career?.name || 'N/A'}
                                    </td>
                                    <td>{tapproval?.meetRequirements ? 'Sí' : 'No'}</td>

                                    <td>{formatDate(tapproval?.updatedAt)}</td>

                                    <td className="flex gap-4 items-center justify-center">
                                        {
                                            tapproval.meetRequirements ? (
                                                <PDFDownloadButton
                                                documents={{
                                                    document: <PdfSevenC tapproval={tapproval} info={info}/>,
                                                    fileName: `tapproval_${tapproval.id}.pdf`,
                                                }}
                                                fileName={`tapproval_${tapproval.id}`}
                                                label="Descargar PDF"
                                            />
                                            ) : (
                                                <button
                                                    onClick={() => onEdit(tapproval)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Editar
                                                </button>
                                            )}
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

export default TApprovalTable;
