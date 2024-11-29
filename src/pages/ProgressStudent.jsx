import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import progressService from '../api/progressService';
import { useUserContext } from '../store/userContext';
const ProgressStudent = () => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState([]);
    // const [apiError, setApiError] = useState(null);
    const username = useUserContext();

    useEffect(() => {
        dispatch(setPageTitle('Progreso de Pasos'));
        if (username) {
            fetchProgress();
        }
    }, [dispatch, username]);

    const format = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };
    const fetchProgress = useCallback(async () => {
        try {
            const reservations = await progressService.getProgresByStudentCode(username);
            setProgress(reservations);
            // setApiError(null);
        } catch (error) {
            console.error('Error fetching title reservations:', error);
            // setApiError('Failed to load title reservations.');
        }
    }, [username]);

    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 mb-5">
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Progreso de Pasos</h5>
                    </div>
                    <div className="mb-5">
                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                            <table className="whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th>Estudiante(s)</th>
                                        <th>Proyectos</th>
                                        <th>Progreso</th>
                                        <th>Fecha de Actualización</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-white-dark">
                                    {progress.length > 0 && (
                                        <tr>
                                            <td colSpan="3" className="font-bold text-white">
                                                {progress[0].stepObject?.student &&
                                                    `${progress[0].stepObject.student.firstNames} ${progress[0].stepObject.student.lastName}`}
                                                {progress[0].stepObject?.studentTwo &&
                                                    ` & ${progress[0].stepObject.studentTwo.firstNames} ${progress[0].stepObject.studentTwo.lastName}`}
                                            </td>
                                        </tr>
                                    )}
                                    {progress
                                        .filter((step) => step.completionPercentage > 0) // Filtra pasos con porcentaje mayor a 0
                                        .map((step) => (
                                            <tr key={step.stepNumber}>
                                                <td>{`Paso ${step.stepNumber}`}</td>
                                                <td>
                                                    <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                        <div
                                                            className={`bg-${step.completionPercentage === 100
                                                                ? 'success'
                                                                : step.completionPercentage >= 70
                                                                    ? 'primary'
                                                                    : step.completionPercentage >= 30
                                                                        ? 'warning'
                                                                        : 'gray'
                                                                } rounded-full`}
                                                            style={{ width: `${step.completionPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </td>

                                                <td
                                                    className={`text-${step.completionPercentage === 100
                                                        ? 'success'
                                                        : step.completionPercentage >= 70
                                                            ? 'primary'
                                                            : step.completionPercentage >= 30
                                                                ? 'warning'
                                                                : 'gray'
                                                        }`}
                                                >{`${step.completionPercentage}%`}</td>
                                                <td>
                                                    {step.stepObject?.createdAt
                                                        ? new Intl.DateTimeFormat('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }).format(new Date(step.stepObject.createdAt))
                                                        : 'No disponible'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressStudent;
