import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import titleReservationsService from '../../../../api/titleReservationsService';
import ReservationTable from './ReservationTable';
import userService from '../../../../api/userService';

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [user, setUser] = useState({
        idUser: '',
        username: '',
    });

    // Obtén el usuario al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));

                if (storedUser && storedUser.username) {
                    const username = storedUser.username;
                    const userData = await userService.getUser(username);
                    setUser(userData);
                } else {
                    console.error('No se encontró un usuario en localStorage');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    // Actualiza el título de la página y carga las reservas cuando el usuario esté disponible
    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título'));

        if (user.username) {
            fetchTitleReservations();
        }
    }, [dispatch, user.username]);

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

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>
            <ReservationTable titleReservations={titleReservations} user={user} apiError={apiError} />
        </div>
    );
};

export default TitleReservation;
