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
    const username = useUserContext();

    // Método para obtener datos del paso 1
    const fetchTitleReservationStepOne = useCallback(async () => {
        if (!username) {
            console.error('No se encontró un username válido');
            return;
        }
        try {
            const reservationResponse = await titleReservationsService.getReservationByStudentCode(username);
            setReservation(reservationResponse);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [username]);


    // Actualiza el título de la página y carga el paso 1 cuando el usuario esté disponible
    useEffect(() => {
        dispatch(setPageTitle('Subir PDF'));

        if (username) {
            fetchTitleReservationStepOne();
        }
    }, [dispatch, username, fetchTitleReservationStepOne]);
    console.log(reservation);
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 1 - Subir Proyecto de Tesis</h1>
            <ReservationTable reservation={reservation} user={username} apiError={apiError} />
        </>
    );
};

export default TitleReservation;
