import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import NotificationTable from './NotificationTable';
import NotificationModal from './NotificationModal';
import NotificationSearch from './NotificationSearch';
import juryNotificationService from '../../../../api/juryNotificationService';
import careerService from '../../../../api/careerService';
import { getNotificationsDetails } from '../utils/NotificationUtils';
import Swal from 'sweetalert2';

const JuryNotifications = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [notifications, setNotifications] = useState([]);

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
            const notificationResponse = await juryNotificationService.getAllJuryNotifications();
            setNotifications(notificationResponse);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }, []);

    const handleEdit = async (notification) => {
        const juryDetails = getNotificationsDetails(notification);
        setSelectedNotification(juryDetails);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedNotificationData, notificationId) => {
        try {
            console.log('Enviando datos al servidor:', updatedNotificationData);
            await juryNotificationService.editJuryNotification(notificationId, updatedNotificationData);
            Swal.fire('Éxito', 'Notificación actualizada correctamente.', 'success');
            await fetchNotifications();
            closeModal();
        } catch (error) {
            console.error('Error al guardar la notificación:', error.response?.data || error.message);
            Swal.fire('Error', 'Hubo un problema al guardar la notificación.', 'error');
        }
    };
    

    const normalizeText = (text) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };

    const filteredNotifications = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return notifications.filter((notification) => {
            const fullName = `${notification?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${notification?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(notification?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? notification?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [notifications, search, selectedCareer]);



    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
    };

    return (
        <>
            <NotificationSearch
                search={search}
                setSearch={setSearch}
                careerOptions={careerOptions}
                selectedCareer={selectedCareer}
                setSelectedCareer={setSelectedCareer}
            />
            <NotificationTable notification={filteredNotifications} onEdit={handleEdit} />
            <NotificationModal
                isOpen={isModalOpen}
                notification={selectedNotification}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default JuryNotifications;
