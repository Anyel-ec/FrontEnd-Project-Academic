import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../Steps/Pagination';
import { getThesisDetails } from '../../Steps/utils/ThesisUtils';
import { formatDate } from '../../Steps/utils/Dates';
import ThesisUpload from './ThesisUpload';
const ThesisTable = ({ thesis }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(thesis.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentThesis = thesis.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
    const handlePDFUploadSuccess = (reservationId, base64Data) => {
        // Actualiza el estado para que React re-renderice la tabla
        setPdfDataMap((prev) => ({
            ...prev,
            [reservationId]: base64Data, // Mapea el PDF a la reserva correspondiente
        }));
        console.log('PDF cargado y convertido a Base64 para la reserva:', reservationId);
    };

    const handlePDFUploadFailure = (error) => {
        console.error('Error al cargar el PDF:', error);
    };
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante(s)</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Última Actualización</th>
                            <th className="text-center">PDF</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentThesis.length > 0 ? (
                            currentThesis.map((thesis) => {
                                const { student, studentTwo, meetsRequirements, updatedAt } = getThesisDetails(thesis);

                                return (
                                    <tr key={thesis.id}>
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
                                        <td>{formatDate(updatedAt)}</td>
                                        <td>
                                            {thesis.meetsRequirements ? (
                                                <></>
                                            ) : (
                                                <td className="gap-4">
                                                    {
                                                        <ThesisUpload
                                                            thesisId={thesis.id} // Pasa el ID de la reservación al componente de carga
                                                            onUploadSuccess={(base64Data) => handlePDFUploadSuccess(thesis.id, base64Data)} // Mapea el PDF a la reservación correspondiente
                                                            onUploadFailure={handlePDFUploadFailure}
                                                        />
                                                    }
                                                </td>
                                            )}
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

ThesisTable.propTypes = {
    thesis: PropTypes.array.isRequired,
};


export default ThesisTable;
