import React, { useState } from 'react';
import TitleUpload from './TitleUpload'; // Asegúrate de que el path de importación es correcto

const ReservationTable = ({ titleReservations, apiError }) => {
    const reservations = titleReservations;
    console.log(reservations);
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
                            {<th className="!text-center">PDF</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>
                                        {reservation.student.studentCode}{' '}
                                        {reservation.studentTwo && (
                                            <>
                                                <br />
                                                {reservation.studentTwo.studentCode}
                                            </>
                                        )}
                                    </td>

                                    {/* <td>{reservation.meetsRequirements ? 'Sí' : 'No'}</td> */}
                                    <td>
                                        {reservation.student.firstNames ?? ''} {reservation.student.lastName ?? ''}
                                        {reservation.studentTwo && (
                                            <p>
                                                {reservation.studentTwo.firstNames ?? ''} {reservation.studentTwo.lastName ?? ''}
                                            </p>
                                        )}
                                    </td>

                                    <td>{reservation.student.career.name}</td>
                                     <td>{reservation.project ? 'Sí' : 'No'}</td>
                                    {/*<td>{reservation.observations || 'Ninguna'}</td>
                                    <td>{new Date(reservation.createdAt).toLocaleString()}</td>
                                    <td>{new Date(reservation.updatedAt).toLocaleString()}</td> */}
                                    {reservation.meetsRequirements ? (
                                        <></>
                                    ) : (
                                        <td className="gap-4">
                                            {
                                                <TitleUpload
                                                    reservaId={reservation.id} // Pasa el ID de la reservación al componente de carga
                                                    onUploadSuccess={(base64Data) => handlePDFUploadSuccess(reservation.id, base64Data)} // Mapea el PDF a la reservación correspondiente
                                                    onUploadFailure={handlePDFUploadFailure}
                                                />
                                            }
                                        </td>
                                    )}
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
