import React from 'react';
import TitleUpload from './TitleUpload';

const ReservationTable = ({ reservations, apiError }) => {
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            {apiError && <div className="text-danger">{apiError}</div>}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Estudiante(s)</th>
                            <th>Carrera</th>
                            <th>Proyecto</th>
                            <th>Fecha Actualización</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations ? (
                            <tr key={reservations.id}>
                                <td>
                                    {reservations.student?.studentCode || 'N/A'}
                                    {reservations.studentTwo && (
                                        <>
                                            <br />
                                            {reservations.studentTwo?.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                {/* Nombres de los estudiantes */}
                                <td>
                                    {reservations.student?.firstNames ?? ''} {reservations.student?.lastName ?? ''}
                                    {reservations.studentTwo && (
                                        <p>
                                            {reservations.studentTwo?.firstNames ?? ''} {reservations.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>

                                <td>{reservations.student?.career?.name || 'No especificada'}</td>
                                <td>{reservations.project ? 'Sí' : 'No'}</td>
                                {/* Fecha de actualización */}
                                <td>{reservations.updatedAt ? new Date(reservations.updatedAt).toLocaleString() : 'Fecha no disponible'}</td>
                                <td>
                                    <TitleUpload reservaId={reservations.id} meetsRequirements={reservations.meetsRequirements} observations={reservations.observations} />
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Paso 1 no iniciado
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
