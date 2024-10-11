import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconMail from '../../components/Icon/IconMail';
import titleReservationsService from '../../api/titleReservationsService';

const Profile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        idUser: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        rol: {
            id: 2,
            name: '',
        },
    });
    const [titleReservations, setTitleReservations] = useState([]);

    // Aquí defines el número total de pasos.
    const totalSteps = 5; // Cambia según el número de pasos que necesites.
    
    const isStudent = user.rol && user.rol.id === 2;

    useEffect(() => {
        dispatch(setPageTitle('Perfil'));
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se encontraron los datos del usuario. Inicia sesión nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
        
    }, []);
    
    console.log(user ? user.username : 'Usuario no disponible');


    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            const filteredReservations = reservations.filter(
                (reservation) => reservation.student.studentCode === user.username || (reservation.studentTwo && reservation.studentTwo.studentCode === user.username)
            );
            setTitleReservations(filteredReservations);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, [user.username]);

    useEffect(() => {
        if (user.username) {
            fetchTitleReservations();
        }
    }, [user.username, fetchTitleReservations]);

    const getFullStepList = () => {
        const steps = [];
        for (let i = 1; i <= totalSteps; i++) {
            const reservation = titleReservations.find((res) => res.id === i);
            steps.push({
                stepNumber: i,
                progress: reservation ? (reservation.meetsRequirements ? 100 : 0) : 0,
                lastUpdated: reservation ? reservation.updatedAt : null,
            });
        }
        return steps;
    };
    // Cambiamos la lógica para verificar si el usuario tiene rol de estudiante basado en id_rol
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
                {isStudent && (
                    
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
                                            <th className="text-center">Última Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                        {getFullStepList().map((step) => (
                                            <tr key={step.stepNumber}>
                                                <td>{`Paso ${step.stepNumber}`}</td>
                                                <td>
                                                    <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                        <div className={`bg-${step.progress === 100 ? 'success' : 'danger'} rounded-full`} style={{ width: `${step.progress}%` }}></div>
                                                    </div>
                                                </td>
                                                <td className={`${step.progress === 100 ? 'text-success' : 'text-danger'}`}>{`${step.progress}%`}</td>
                                                <td className="text-center">{formatDate(step.lastUpdated)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
