import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
// import NotificationsTable from './NotificationsTable';
// import NotificationsModal from './NotificationsModal';
// import NotificationsSearch from './NotificationsSearch';
import juryNotificationsService from '../../../../api/juryNotificationsService';
import careerService from '../../../../api/careerService';
const JuryNotifications = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Notificación de Jurados'));
        fetchNotifications();
        fetchCareers();
    }, [dispatch]);
    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({
                value: career.id,
                label: career.name,
                data: career,
            }));
            setCareerOptions(options);
        } catch (error) {
            console.error('Error fetching careers:', error);
        }
    }, []);
    const fetchNotifications = useCallback(async () => {
        try {
            const thesis = await juryNotificationsService.getAllJuryNotifications();
            setCurrentThesis(thesis);
            console.log(thesis)
        } catch (error) {
            console.error('Error al obtener los thesies:', error);
        }
    }, []);
};
export default JuryNotifications;
