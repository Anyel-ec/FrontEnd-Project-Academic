import { showObservations } from "../utils/ShowObservations";
const ReportTable = ({ approval }) => {
    console.log(approval);
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
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
                        {approval ? (
                            <tr key={approval.id}>
                                <td>
                                    {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.studentTwo.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.student?.firstNames ?? ''} {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.student?.lastName ?? ''}
                                    {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{approval?.juryAppointmentStepThree?.projectApprovalStepTwo.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(approval.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(approval.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    El tercer paso aún no ah terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportTable;
