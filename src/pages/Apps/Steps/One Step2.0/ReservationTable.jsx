const ReservationTable = ({ titleReservations = [] }) => {
    if (!titleReservations || !Array.isArray(titleReservations)) {
        return <div>No hay reservaciones disponibles.</div>;
    }

    return (
        <div>
            {titleReservations.length === 0 ? (
                <div>No hay reservaciones disponibles.</div>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Estudiante</th>
                            <th className="px-4 py-2">Proyecto</th>
                            <th className="px-4 py-2">Cumple Requisitos</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titleReservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td className="border px-4 py-2">
                                    {reservation.student.firstNames} {reservation.student.lastName}
                                </td>
                                <td className="border px-4 py-2">
                                    {reservation.project ? 'Sí' : 'No'}
                                </td>
                                <td className="border px-4 py-2">
                                    {reservation.meetsRequirements ? 'Sí' : 'No'}
                                </td>
                                <td className="border px-4 py-2">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Editar
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationTable;

