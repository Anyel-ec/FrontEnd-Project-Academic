import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import titleReservationsService from '../../../../api/titleReservationsService';
import ReservationTable from './ReservationTable';

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [titleReservations, setTitleReservations] = useState([]);
    const [apiError, setApiError] = useState(null);

    // Fetch de carreras, estudiantes y reservaciones al montar el componente
    useEffect(() => {
        dispatch(setPageTitle('Reservación de Título'));
        fetchTitleReservations();
    }, [dispatch]);

    // Fetch para obtener las reservaciones de título
    const fetchTitleReservations = useCallback(async () => {
        try {
            const reservations = await titleReservationsService.getTitleReservations();
            console.log('Reservaciones obtenidas:', reservations); // Muestra las reservaciones obtenidas
            setTitleReservations(reservations);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, []); // Dependencia de los estudiantes

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Reservaciones de Títulos</h1>
            <ReservationTable titleReservations={titleReservations} apiError={apiError} />
        </div>
    );
};
export default TitleReservation;