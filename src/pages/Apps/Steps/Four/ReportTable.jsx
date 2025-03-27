import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { getReportDetails, formatDate } from '../utils/ReportUtils';
import PDFDownloadButton from '../utils/PDFDownloadButtons';
import PdfFourCM from '../pdfSteps/PdfFourCM';
import Swal from 'sweetalert2';
import PdfThreeCM from '../pdfSteps/PdfThreeCM';
const ReportTable = ({ reports, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(reports.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = reports.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

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
                            <th>Asesor</th>
                            <th>Co-Asesor</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentReports.length > 0 ? (
                            currentReports.map((report) => {
                                const { student, studentTwo, adviser, coadviser, meetRequirements, updatedAt } = getReportDetails(report);

                                return (
                                    <tr key={report.id}>
                                        <td>
                                            {student?.firstNames} {student?.lastName}
                                            {studentTwo && (
                                                <>
                                                    <span className="font-bold"> - </span>
                                                    <br />
                                                    {studentTwo.firstNames} {studentTwo.lastName}
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {student?.studentCode || 'N/A'}
                                            {studentTwo && (
                                                <>
                                                    <br />
                                                    {studentTwo.studentCode || 'N/A'}
                                                </>
                                            )}
                                        </td>
                                        <td>{student?.career?.name || 'N/A'}</td>
                                        <td>{meetRequirements ? 'Sí' : 'No'}</td>
                                        <td>{adviser ? `${adviser.firstNames || ' '} ${adviser.lastName || ' '}` : 'N/A'}</td>
                                        <td>{coadviser ? `${coadviser.firstNames || ' '} ${coadviser.lastName || ' '}` : 'N/A'}</td>
                                        <td>{formatDate(updatedAt)}</td>
                                        <td className="flex gap-4 items-center justify-center">
                                            {
                                                report.meetRequirements ? (
                                                    <PDFDownloadButton
                                                        documents={{
                                                            // info={info}
                                                            document: <PdfThreeCM report={report} />,
                                                            fileName: `Report${report.id}.pdf`,
                                                        }}
                                                        fileName={`report_${report?.id}`}
                                                        label="Descargar PDF"
                                                    />
                                                ) : (
                                                    <button
                                                        onClick={() => onEdit(report)}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Editar
                                                    </button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                );
                            })
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

ReportTable.propTypes = {
    reports: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default ReportTable;
