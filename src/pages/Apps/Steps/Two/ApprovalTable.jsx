import React from 'react';
import PropTypes from 'prop-types';

const ApprovalTable = ({ reservacionesEstudiantes, formatearFecha }) => {
    return (
        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
            <table className="whitespace-nowrap w-full">
                <thead>
                    <tr>
                        <th>Estudiantes</th>
                        <th>Código(s)</th>
                        <th>Carrera</th>
                        <th>Proyecto de Tesis</th>
                        <th>Similitud</th>
                        <th>Última Actualización</th>
                    </tr>

                </thead>
                <tbody className="dark:text-white-dark">
                    {reservacionesEstudiantes.map((reservacion) => {
                        // Concatenar nombres y códigos de estudiantes en una sola variable
                        return (
                            <tr key={reservacion.id}>
                                <td>
                                {reservacion.student.firstNames} {reservacion.student.lastName}
                                {reservacion.studentTwo && (
                                    <>
                                        <br />
                                        {reservacion.studentTwo.firstNames} {reservacion.studentTwo.lastName}
                                    </>
                                )}
                            </td>
                            {/* Códigos de estudiantes */}
                            <td>
                                {reservacion.student.studentCode || 'N/A'}
                                {reservacion.studentTwo && (
                                    <>
                                        <br />
                                        {reservacion.studentTwo.studentCode || 'N/A'}
                                    </>
                                )}
                            </td>
                                <td>{reservacion.student.career?.name || 'N/A'}</td>
                                <td>{reservacion.title || 'Sin título'}</td>
                                <td>{`${reservacion.projectSimilarity || 0}%`}</td>
                                <td>{formatearFecha(reservacion.updatedAt)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

ApprovalTable.propTypes = {
    reservacionesEstudiantes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            projectSimilarity: PropTypes.number,
            updatedAt: PropTypes.string,
            student: PropTypes.shape({
                firstNames: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                studentCode: PropTypes.string.isRequired,
                career: PropTypes.shape({
                    name: PropTypes.string,
                }),
            }).isRequired,
            studentTwo: PropTypes.shape({
                firstNames: PropTypes.string,
                lastName: PropTypes.string,
                studentCode: PropTypes.string,
            }),
        })
    ).isRequired,
    formatearFecha: PropTypes.func.isRequired,
};

export default ApprovalTable;
