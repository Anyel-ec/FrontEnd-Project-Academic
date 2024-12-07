import TitleUpload from './TitleUpload';

const ReservationTable = ({ reservation, apiError }) => {
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            {apiError && <div className="text-danger">{apiError}</div>}
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Estudiante(s)</th>
                            <th>Carrera</th>
                            <th>Fecha Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservation ? (
                            <tr key={reservation.id}>
                                <td>
                                    {reservation.student?.studentCode || 'N/A'}
                                    {reservation.studentTwo && (
                                        <>
                                            <br />
                                            {reservation.studentTwo.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {reservation.student?.firstNames ?? ''} {reservation.student?.lastName ?? ''}
                                    {reservation.studentTwo && (
                                        <p>
                                            {reservation.studentTwo?.firstNames ?? ''} {reservation.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{reservation.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(reservation.updatedAt).toLocaleString()}</td>
                                <td>
                                    <TitleUpload observations={reservation.observations} reservaId={reservation.id} meetsRequirements={reservation.meetsRequirements} />
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    Primer paso aún no iniciado
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
