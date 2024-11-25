import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import titleReservationsService from '../../../../api/titleReservationsService';
import ReservationTable from './ReservationTable';
import userService from '../../../../api/userService';

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservationStepOne, setTitleReservationStepOne] = useState([]);
    const [apiError, setApiError] = useState(null);

    const [user, setUser] = useState({
        idUser: '',
        username: '',
    });

    // Método para obtener datos del paso 1
    const fetchTitleReservationStepOne = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getProgressOneByStudentCode(user.username);
            console.log('Datos recibidos del backend:', reservations);
    
            // Filtrar solo los datos del paso 1
            const stepOneReservations = reservations.filter((reservation) => reservation.stepName === "1");
    
            console.log('Datos procesados (Paso 1):', stepOneReservations);
    
            setTitleReservationStepOne(stepOneReservations);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [user.username]);
    

    // Obtener datos del usuario al montar el componente
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

    // Actualiza el título de la página y carga el paso 1 cuando el usuario esté disponible
    useEffect(() => {
        dispatch(setPageTitle('Subir PDF'));

        if (user.username) {
            fetchTitleReservationStepOne();
        }
    }, [dispatch, user.username, fetchTitleReservationStepOne]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Paso 1 - Subir Proyecto de Tesis</h1>
            <ReservationTable titleReservations={titleReservationStepOne} user={user} apiError={apiError} />
        </div>
    );
};

export default TitleReservation;
