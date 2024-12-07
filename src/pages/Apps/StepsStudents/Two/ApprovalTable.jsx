import { showObservations } from "../utils/ShowObservations";
const ApprovalTable = ({ project }) => {
    console.log(project);
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
                        {project ? (
                            <tr key={project.id}>
                                <td>
                                    {project.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {project.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {project.titleReservationStepOne?.studentTwo.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {project.titleReservationStepOne?.student?.firstNames ?? ''} {project.titleReservationStepOne?.student?.lastName ?? ''}
                                    {project.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {project.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {project.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{project.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(project.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(project.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    El primer paso aún no ah terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovalTable;
