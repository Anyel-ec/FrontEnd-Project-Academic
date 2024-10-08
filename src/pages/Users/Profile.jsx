import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import userService from '../../api/userService'; // Asume que este es tu archivo de servicio
import { fetchStudentProgress } from '../../api/reservationStepStatusService'; // Asume que este es tu archivo de servicio
import IconCoffee from '../../components/Icon/IconCoffee';
import IconMail from '../../components/Icon/IconMail';
import titleReservationsService from '../../api/titleReservationsService';
import { useCallback } from 'react';

const Profile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        idUser: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [titleReservations, setTitleReservations] = useState([]);
    const [apiError, setApiError] = useState(null);

    const isStudent = user && user.rol && user.rol.name === 'estudiante';

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }

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

    useEffect(() => {
        dispatch(setPageTitle('Perfil'));

        const fetchUserData = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.username) {
                try {
                    const userData = await userService.getUser(storedUser.username);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.error('No user found in localStorage');
            }
        };

        fetchUserData();
    }, [dispatch]);

    // Función para formatear la fecha con JavaScript nativo
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    // Fetch de las reservaciones de títulos
    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            const filteredReservations = reservations.filter(
                (reservation) => reservation.student.studentCode === user.username || (reservation.studentTwo && reservation.studentTwo.studentCode === user.username)
            );
            setTitleReservations(filteredReservations);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [user.username]);

    // Llamada para obtener las reservaciones cuando el usuario esté disponible
    useEffect(() => {
        if (user.username) {
            fetchTitleReservations();
        }
    }, [user.username, fetchTitleReservations]);

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
                {!isStudent ? (
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
                                    {titleReservations.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td>{`Paso ${reservation.id}`}</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className={`bg-${reservation.meetsRequirements ? 'success' : 'danger'} rounded-full`} style={{ width: '100%' }}></div>
                                                </div>
                                            </td>
                                            <td className={`${reservation.meetsRequirements ? 'text-success' : 'text-danger'}`}>
                                                {reservation.meetsRequirements ? '100%' : '0%'}
                                            </td>
                                            <td className="text-center">
                                                {formatDate(reservation.updatedAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
