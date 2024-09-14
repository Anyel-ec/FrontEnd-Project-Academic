const TitleReservationTable = ({ reservations }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cumple Requisitos</th>
                        <th>Estudiante</th>
                        <th>Proyecto</th>
                        <th>Observaciones</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Actualización</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{reservation.student.studentCode}</td>
                            <td>{reservation.meetsRequirements ? 'Sí' : 'No'}</td>
                            <td>{`${reservation.student.firstNames} ${reservation.student.lastName}`}</td>
                            <td>{reservation.project ? 'Sí' : 'No'}</td>
                            <td>{reservation.observations}</td>
                            <td>{reservation.createdAt}</td>
                            <td>{reservation.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TitleReservationTable;
