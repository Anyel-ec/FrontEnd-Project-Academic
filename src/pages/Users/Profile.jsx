import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import userService from '../../api/userService'; // Asume que este es tu archivo de servicio
import { fetchStudentProgress } from '../../api/reservationStepStatusService'; // Asume que este es tu archivo de servicio
import IconCoffee from '../../components/Icon/IconCoffee';
import IconMail from '../../components/Icon/IconMail';

const Profile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        idUser: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Perfil'));

        const fetchUserData = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.username) {
                try {
                    const userData = await userService.getUser(storedUser.username);
                    setUser(userData);
                    const progressData = await fetchStudentProgress(storedUser.username);
                    setProgress(progressData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                console.error('No user found in localStorage');
            }
        };

        fetchUserData();
    }, [dispatch]);

    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Perfil</h5>
                    </div>
                    <div className="mb-5">
                        <div className="flex flex-col justify-center items-center">
                            <img src="/assets/images/profile-34.jpeg" alt="Perfil" className="w-24 h-24 rounded-full object-cover mb-5" />
                            <p className="font-semibold text-primary text-xl">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                            <li className="flex items-center gap-2">
                                <IconCoffee className="shrink-0" />
                                {user.username}
                            </li>
                            <li>
                                <button className="flex items-center gap-2">
                                    <IconMail className="w-5 h-5 shrink-0" />
                                    <span className="text-primary truncate">{user.email}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Tareas</h5>
                    </div>
                    <div className="mb-5">
                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                            <table className="whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th>Proyectos</th>
                                        <th>Progreso</th>
                                        <th>Tarea Realizada</th>
                                        <th className="text-center">Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-white-dark">
                                    {progress.map(step => (
                                        <tr key={step.stepNumber}>
                                            <td>{`Paso ${step.stepNumber}`}</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className={`bg-${step.isCompleted ? 'success' : 'danger'} rounded-full`} style={{ width: `${step.percentage}%` }}></div>
                                                </div>
                                            </td>
                                            <td className={`${step.isCompleted ? 'text-success' : 'text-danger'}`}>{`${step.percentage}%`}</td>
                                            <td className="text-center">{step.lastUpdated}</td>
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
export default Profile;
