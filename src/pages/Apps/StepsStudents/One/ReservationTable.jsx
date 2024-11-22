import React from 'react';
import TitleUpload from './TitleUpload'; // Asegúrate de que el path de importación es correcto

const ReservationTable = ({ titleReservations, apiError }) => {
    const reservations = titleReservations;
    console.log(titleReservations);
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            {apiError && <div className="text-danger">{apiError}</div>}
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            {/* <th>Cumple Requisitos</th> */}
                            <th>Estudiante(s)</th>
                            <th>Carrera</th>
                            <th>Proyecto</th>
                            {/* <th>Observaciones</th> */}
                            {/* <th>Fecha Creación</th> */}
                            {/* <th>Fecha Actualización</th> */}
                            {/* {reservations.meetsRequirements ? <th className="!text-center">PDF</th> : <></>} */}
                            {/* {<th className="!text-center">PDF</th>} */}
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <tr key={reservation.stepObject.id}>
                                    <td>
                                        {reservation.stepObject.student.studentCode}{' '}
                                        {reservation.stepObject.studentTwo && (
                                            <>
                                                <br />
                                                {reservation.stepObject.studentTwo.studentCode}
                                            </>
                                        )}
                                    </td>

                                    {/* <td>{reservation.stepObject.meetsRequirements ? 'Sí' : 'No'}</td> */}
                                    <td>
                                        {reservation.stepObject.student.firstNames ?? ''} {reservation.stepObject.student.lastName ?? ''}
                                        {reservation.stepObject.studentTwo && (
                                            <p>
                                                {reservation.stepObject.studentTwo.firstNames ?? ''} {reservation.stepObject.studentTwo.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>

                                    <td>{reservation.stepObject.student.career.name}</td>
                                    <td>{reservation.stepObject.project ? 'Sí' : 'No'}</td>
                                    {/*<td>{reservation.stepObject.observations || 'Ninguna'}</td>
                                    <td>{new Date(reservation.stepObject.createdAt).toLocaleString()}</td>
                                    <td>{new Date(reservation.stepObject.updatedAt).toLocaleString()}</td> */}

                                    <td className="gap-4">
                                        <TitleUpload
                                            reservaId={reservation.stepObject.id} // Pasa el ID de la reservación al componente de carga
                                            meetsRequirements={reservation.stepObject.meetsRequirements} // Pasa el estado meetsRequirements al componente
                                            observations={reservation.stepObject.observations} // Pasa el
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    No hay reservaciones disponibles
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
