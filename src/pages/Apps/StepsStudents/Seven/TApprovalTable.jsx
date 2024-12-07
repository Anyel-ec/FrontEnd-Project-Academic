import { showObservations } from "../utils/ShowObservations";
const TApprovalTable = ({ thesis }) => {
    console.log("resp7:", thesis);
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
                        {thesis ? (
                            <tr key={thesis?.id}>
                                <td>
                                    {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames ?? ''} {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName ?? ''}
                                    {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{thesis?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(thesis?.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(thesis?.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    El sexto paso aún no ah terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TApprovalTable;
