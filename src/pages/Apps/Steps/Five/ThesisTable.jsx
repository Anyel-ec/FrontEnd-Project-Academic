import React, { useState } from 'react';
import PDFDownloadButtons from '../utils/PDFDownloadButtons';
import PdfFiveCN from '../pdfSteps/PdfFiveCN';
import Pagination from '../Pagination';
import ThesisUpload from './ThesisUpload';
import { formatDate } from '../utils/Dates';

const ThesisTable = ({ thesis, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(thesis.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentThesis = thesis.slice(indexOfFirstItem, indexOfLastItem);

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
                            currentThesis.map((thesisItem) => (
                                <tr key={thesisItem.id}>
                                    <td>
                                        {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames}{' '}
                                        {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}
                                        {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                            <>
                                                <span className='font-bold'> - </span>
                                                <br />
                                                {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo.firstNames}{' '}
                                                {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode || 'N/A'}
                                        {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{thesisItem.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.name || 'N/A'}</td>
                                    <td>{thesisItem.meetsRequirements ? 'Sí' : 'No'}</td>
                                    <td>{formatDate(thesisItem.updatedAt)}</td>
                                    <td>
                                        <ThesisUpload thesisId={thesisItem.id} />
                                    </td>
                                    <td className="flex gap-4 items-center justify-center">
                                        {thesisItem.meetsRequirements ? (
                                            <PDFDownloadButtons
                                                documents={{
                                                    document: <PdfFiveCN thesis={thesisItem} />,
                                                    fileName: `thesis_${thesisItem.id}.pdf`,
                                                }}
                                                fileName={`thesis_${thesisItem.id}`}
                                                label="Descargar PDF"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => onEdit(thesisItem)}
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
                                <td colSpan="7" className="px-4 py-2 text-center">
                                    No hay constancias disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
export default ThesisTable;
