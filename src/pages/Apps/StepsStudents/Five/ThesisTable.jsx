import PropTypes from 'prop-types';
import { formatDate } from '../../Steps/utils/Dates';
import ThesisUpload from './ThesisUpload';
const ThesisTable = ({ thesis }) => {
    console.log("Thesis", thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne

    );

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante(s)</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {thesis ? (
                            <tr key={thesis?.id}>
                                <td>
                                    {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames} {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName}
                                    {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <span className="font-bold"> - </span>
                                            <br />
                                            {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames} {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName}
                                        </>
                                    )}
                                </td>
                                <td>
                                    {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>
                                <td>{thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>
                                <td>{formatDate(thesis.updatedAt)}</td>
                                <td>
                                    {
                                        <ThesisUpload
                                            thesisId={thesis.id} // Pasa el ID de la reservación al componente de carga
                                            meetsRequirements={thesis.meetsRequirements}
                                            observations={thesis.observations}
                                        />
                                    }
                                </td>
                            </tr>

                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    El cuarto paso aún no ah terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ThesisTable.propTypes = {
    thesis: PropTypes.array.isRequired,
};

export default ThesisTable;
