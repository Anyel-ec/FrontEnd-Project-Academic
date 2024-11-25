import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import titleReservationsService from '../api/titleReservationsService';
import userService from '../api/userService'; // Importar el servicio
const ProgressStudent = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [user, setUser] = useState({ idUser: '', username: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser && storedUser.username) {
                    const userData = await userService.getUser(storedUser.username);
                    setUser(userData);
                } else {
                    console.error('No user found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        dispatch(setPageTitle('Progreso de Pasos'));
        if (user.username) {
            fetchTitleReservations();
        }
    }, [dispatch, user.username]);

    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getProgressOneByStudentCode(user.username);
            setTitleReservations(reservations);
            setApiError(null);
        } catch (error) {
            console.error('Error fetching title reservations:', error);
            setApiError('Failed to load title reservations.');
        }
    }, [user.username]);

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
                                    </tr>
                                </thead>
                                <tbody className="dark:text-white-dark">
                                    {titleReservations.length > 0 && (
                                        <tr>
                                            <td colSpan="3" className="font-bold text-white">
                                                {titleReservations[0].stepObject?.student &&
                                                    `${titleReservations[0].stepObject.student.firstNames} ${titleReservations[0].stepObject.student.lastName}`}
                                                {titleReservations[0].stepObject?.studentTwo &&
                                                    ` & ${titleReservations[0].stepObject.studentTwo.firstNames} ${titleReservations[0].stepObject.studentTwo.lastName}`}
                                            </td>
                                        </tr>
                                    )}
                                    {titleReservations.map((step, index) => (
                                        <tr key={step.number}>
                                            <td>{`Step ${step.stepName}`}</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div
                                                        className={`bg-${step.completionPercentage === 100 ? 'success' : step.completionPercentage >= 30 ? 'warning' : 'gray'} rounded-full`}
                                                        style={{ width: `${step.completionPercentage}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td
                                                className={`${step.completionPercentage === 100 ? 'text-success' : step.completionPercentage >= 30 ? 'text-warning' : 'text-gray'}`}
                                            >{`${step.completionPercentage}%`}</td>
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
