import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { formatDate, formatNumberWithZero } from '../utils/Dates';
import PdfTwo from '../pdfSteps/PdfTwo';
import { PDFDownloadLink } from '@react-pdf/renderer';

const ApprovalTable = ({ projects, onEdit, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);


    const getDownloadButton = (project) => {
        const fileName = `P2 INFORME-${formatNumberWithZero(project.id)}-Aprobación de proyecto de Tesis.pdf`;
        return (
            <PDFDownloadLink document={<PdfTwo project={project} info={info}/>} fileName={fileName}>
                <button type='submit' onClick={() => {
                    setIsLoading(true); 
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }} className="btn btn-sm btn-outline-primary" disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Descargar Comprobante'}
                </button>
            </PDFDownloadLink>
        );
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
                            <th>Cumple Requisitos</th>
                            <th>Asesor</th>
                            <th>Co-Asesor</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        {project.titleReservationStepOne.student.firstNames} {project.titleReservationStepOne.student.lastName}
                                        {project.titleReservationStepOne.studentTwo && (
                                            <>
                                                <span className='font-bold'> - </span><br />{project.titleReservationStepOne.studentTwo.firstNames} {project.titleReservationStepOne.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {project.titleReservationStepOne.student.studentCode || 'N/A'}
                                        {project.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {project.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{project.titleReservationStepOne.student.career?.name || 'N/A'}</td>
                                    <td>{project.meetRequirements ? 'Sí' : 'No'}</td>
                                    <td>{project.adviser ? `${project.adviser.firstNames || ' '} ${project.adviser.lastName || ' '}` : 'N/A'}</td>
                                    <td>{project.coadviser ? `${project.coadviser.firstNames || ' '} ${project.coadviser.lastName || ' '}` : 'N/A'}</td>
                                    <td>{formatDate(project.updatedAt)}</td>
                                    <td className="flex gap-4 items-center justify-center">
                                        {
                                            project.meetRequirements ? (
                                                getDownloadButton(project)
                                            ) : (
                                                <button
                                                    onClick={() => onEdit(project)}
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

ApprovalTable.propTypes = {
    projects: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default ApprovalTable;
