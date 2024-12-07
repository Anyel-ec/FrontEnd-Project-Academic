import { showObservations } from "../utils/ShowObservations";
const JuryTable = ({ jury }) => {
    console.log("dks", jury);
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
                        {jury ? (
                            <tr key={jury.id}>
                                <td>
                                    {jury.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {jury.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {jury.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {jury.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames ?? ''} {jury.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName ?? ''}
                                    {jury.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {jury.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {jury.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{jury.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(jury.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(jury.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    El segundo paso aún no ah terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JuryTable;
