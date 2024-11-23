import PropTypes from 'prop-types';
import { getJuryDetails } from '../../Steps/utils/JuryUtils';
import { formatDate } from '../../Steps/utils/Dates';
import { showObservations } from '../utils/ShowObservations';

const JuryTable = ({ jury }) => {
    const currentJury = jury;
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
                        {currentJury?.length > 0 ? (
                            currentJury.map((jury) => {
                                const { student, studentTwo, updatedAt, observations } = getJuryDetails(jury);

                                return (
                                    <tr key={jury.id}>
                                        <td>
                                            {student?.firstNames} {student?.lastName}
                                            {studentTwo && (
                                                <>
                                                    <span className="font-bold"> - </span>
                                                    <br />
                                                    {studentTwo.firstNames} {studentTwo.lastName}
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {student?.studentCode || 'N/A'}
                                            {studentTwo && (
                                                <>
                                                    <br />
                                                    {studentTwo.studentCode || 'N/A'}
                                                </>
                                            )}
                                        </td>
                                        <td>{student?.career?.name || 'N/A'}</td>
                                        <td>{formatDate(updatedAt)}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(observations)}>
                                                Observaciones
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    No hay campos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

JuryTable.propTypes = {
    jury: PropTypes.array.isRequired,
};

export default JuryTable;
