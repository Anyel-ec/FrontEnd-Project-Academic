import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import titleReservationsService from '../../../../api/titleReservationsService';
import ReservationTable from './ReservationTable';
import { useUserContext } from "../../../../store/userContext";

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [reservation, setReservation] = useState([]);
    const [apiError, setApiError] = useState(null);
    const user = useUserContext();

    // Método para obtener datos del paso 1
    const fetchTitleReservationStepOne = useCallback(async () => {
        if (!user) {
            console.error('No se encontró un user válido');
            return;
        }
        try {
            console.log("jadsk", user)
            const reservationResponse = await titleReservationsService.getReservationByStudentCode(user.user.username);
            setReservation(reservationResponse);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, []);


    // Actualiza el título de la página y carga el paso 1 cuando el usuario esté disponible
    useEffect(() => {
        dispatch(setPageTitle('Subir PDF'));

        if (user.user.username) {
            fetchTitleReservationStepOne();
        }
    }, [dispatch, user.user.username, fetchTitleReservationStepOne]);
    console.log(reservation);
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 1 - Subir Proyecto de Tesis</h1>
            <ReservationTable reservation={reservation} user={user.user.username} apiError={apiError} />
        </>
    );
};

export default TitleReservation;
