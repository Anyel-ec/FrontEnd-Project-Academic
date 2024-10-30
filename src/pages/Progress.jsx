import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import titleReservationsService from '../api/titleReservationsService';

const Progress = () => {
    const dispatch = useDispatch();
    const [studentReservations, setStudentReservations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const totalSteps = 5;

    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            const expandedReservations = reservations.flatMap((reservation) => {
                const baseEntry = {
                    ...reservation,
                    students: [{ ...reservation.student }],
                };
                if (reservation.studentTwo) {
                    baseEntry.students.push({ ...reservation.studentTwo });
                }
                return baseEntry;
            });

            // Filter students based on the search query
            const filteredReservations = expandedReservations.filter((reservation) =>
                reservation.students.some(
                    (student) =>
                        student.firstNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.studentCode.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setStudentReservations(filteredReservations);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, [searchQuery]);

    useEffect(() => {
        dispatch(setPageTitle('Progreso de Estudiantes'));
        fetchTitleReservations();
    }, [dispatch, fetchTitleReservations]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const getFullStepList = (reservation) => {
        const steps = [];

        for (let i = 1; i <= totalSteps; i++) {
            steps.push({
                stepNumber: i,
                progress: reservation.meetsRequirements ? 100 : 50,
                lastUpdated: reservation.updatedAt,
            });
        }

        return steps;
    };

    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 mb-5">
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Progreso de Estudiantes</h5>
                        <input type="text" className="form-input p-2 w-full mt-3" placeholder="Buscar por nombre, apellido o código" value={searchQuery} onChange={handleSearchChange} />
                    </div>
                    <div className="mb-5">
                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                            <table className="whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th>Estudiante</th>
                                        <th>Proyectos</th>
                                        <th>Progreso</th>
                                        <th className="text-center">Última Actualización</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-white-dark">
                                    {studentReservations.map((reservation) =>
                                        reservation.students.map((student, index) => (
                                            <React.Fragment key={`${reservation.id}-${index}`}>
                                                <tr>
                                                    <td colSpan="4"className='font-bold text-white' >{`${student.firstNames} ${student.lastName}`}</td>
                                                </tr>
                                                {getFullStepList(reservation).map((step) => (
                                                    <tr key={step.stepNumber}>
                                                        <td>{`Paso ${step.stepNumber}`}</td>
                                                        <td>
                                                            <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                                <div className={`bg-${step.progress === 100 ? 'success' : 'warning'} rounded-full`} style={{ width: `${step.progress}%` }}></div>
                                                            </div>
                                                        </td>
                                                        <td className={`${step.progress === 100 ? 'text-success' : 'text-warning'}`}>{`${step.progress}%`}</td>
                                                        <td className="text-center">{formatDate(step.lastUpdated)}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    )}
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