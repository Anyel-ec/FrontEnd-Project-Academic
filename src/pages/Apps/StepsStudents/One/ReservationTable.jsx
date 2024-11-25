import React from 'react';
import TitleUpload from './TitleUpload';

const ReservationTable = ({ titleReservations = [], apiError }) => {
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            {apiError && <div className="text-danger">{apiError}</div>}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código Estudiante</th>
                            <th>Nombre Estudiante</th>
                            <th>Carrera</th>
                            <th>Cumple Requisitos</th>
                            <th>Fecha Actualización</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titleReservations.length > 0 ? (
                            titleReservations.map((reservation) => {
                                const stepObject = reservation.stepObject || {};
                                const student = stepObject.student || {};
                                const studentTwo = stepObject.studentTwo || null;

                                if (!stepObject.id || !student) {
                                    return (
                                        <tr key={reservation.id}>
                                            <td colSpan="6" className="text-center text-danger">
                                                Datos no disponibles o incompletos
                                            </td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr key={reservation.id}>
                                        {/* Código del estudiante */}
                                        <td>{student.studentCode || 'N/A'}
                                            {studentTwo && (
                                                <>
                                                    <br />

                                                    {studentTwo.studentCode || ''}
                                                </>
                                            )}
                                        </td>

                                        {/* Nombre del estudiante */}
                                        <td>
                                            {student.firstNames || 'Nombres no disponibles'}
                                            {student.lastName || ''}
                                            {studentTwo && (
                                                <>
                                                    -
                                                    <br />
                                                    {studentTwo.firstNames || 'Nombres no disponibles'}
                                                    {studentTwo.lastName || ''}
                                                </>
                                            )}
                                        </td>

                                        {/* Carrera */}
                                        <td>{student.career?.name || 'No especificada'}</td>

                                        <td>{stepObject.meetsRequirements ? 'Sí' : 'No'}</td>

                                        {/* Fecha de actualización */}
                                        <td>
                                            {reservation.updatedAt
                                                ? new Date(reservation.updatedAt).toLocaleString()
                                                : 'Fecha no disponible'}
                                        </td>

                                        {/* Acciones */}
                                        <td>
                                            <TitleUpload
                                                reservaId={stepObject.id}
                                                meetsRequirements={stepObject.meetsRequirements}
                                                observations={stepObject.observations} // Pasa las observaciones al componente de carga
                                            />

                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No hay datos disponibles para el paso 1.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationTable;
