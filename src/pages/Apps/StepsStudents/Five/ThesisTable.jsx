import PropTypes from 'prop-types';
import { getThesisDetails } from '../../Steps/utils/ThesisUtils';
import { formatDate } from '../../Steps/utils/Dates';
import ThesisUpload from './ThesisUpload';
const ThesisTable = ({ thesis }) => {
    const currentThesis = thesis;
    console.log(currentThesis);
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
                        {currentThesis.length > 0 ? (
                            currentThesis.map((thesis) => {
                                const { student, studentTwo, meetsRequirements, updatedAt, observations } = getThesisDetails(thesis);

                                return (
                                    <tr key={thesis.id}>
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
                                            {
                                                <ThesisUpload
                                                    thesisId={thesis.id} // Pasa el ID de la reservación al componente de carga
                                                    meetsRequirements={meetsRequirements}
                                                    observations={observations}
                                                />
                                            }
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

ThesisTable.propTypes = {
    thesis: PropTypes.array.isRequired,
};

export default ThesisTable;
