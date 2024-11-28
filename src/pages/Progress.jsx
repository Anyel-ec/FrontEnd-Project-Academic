import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import progressService from '../api/progressService';

const Progress = () => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProgress = useCallback(async () => {
        try {
            const data = await progressService.getAllprogress();
            setProgress(data);
        } catch (error) {
            console.error('Error al obtener el progreso de estudiantes:', error);
        }
    }, []);
    console.log(progress);

    useEffect(() => {
        dispatch(setPageTitle('Progreso de Estudiantes'));
        fetchProgress();
    }, [dispatch, fetchProgress]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtrar resultados basados en el término de búsqueda
    const filteredProgress = progress.filter((item) => {
        const student = item.stepObject?.student || {};
        const studentTwo = item.stepObject?.studentTwo || {};
        const fullName = `${student.firstNames || ''} ${student.lastName || ''} ${studentTwo.firstNames || ''} ${studentTwo.lastName || ''}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

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
                                    {progress
                                        .filter((step) => step.completionPercentage > 0) // Filtra pasos con porcentaje mayor a 0
                                        .map((step) => (
                                            <React.Fragment key={step.stepNumber}>
                                                {step.stepNumber === "1" && (
                                                    <tr>
                                                        <td colSpan="4" className="">
                                                                <span className="">
                                                                    {`${step.stepObject.student?.fullName || "No disponible"}`}
                                                                </span>
                                                                {step.stepObject.studentTwo && (
                                                                    <span className=" mt-2 text-slate">
                                                                        {` & ${step.stepObject.studentTwo.fullName}`}
                                                                    </span>
                                                                )}
                                                            
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr>
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
                                                    <td>
                                                        {step.stepObject?.updatedAt
                                                            ? new Intl.DateTimeFormat('es-ES', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            }).format(new Date(step.stepObject.updatedAt))
                                                            : 'No disponible'}
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
                                                </tr>
                                            </React.Fragment>
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

export default Progress;
