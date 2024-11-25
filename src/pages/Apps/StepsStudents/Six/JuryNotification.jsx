import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import NotificationTable from './NotificationTable';
import NotificationModal from './NotificationModal';
import NotificationSearch from './NotificationSearch';
import careerService from '../../../../api/careerService';
import juryNotificationService from '../../../../api/juryNotificationService';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [currentNotification, setCurrentNotification] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedThesis, setSelectedThesis] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchNotion();
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

    const fetchNotion = useCallback(async () => {
        try {
            const notification = await juryNotificationService.getAllJuryNotifications();
            setCurrentNotification(notification);
            console.log(notification)
        } catch (error) {
            console.error('Error al obtener los thesies:', error);
        }
    }, []);
    const handleEdit = async (thesis) => {
        setIsModalOpen(true);
        setSelectedThesis(thesis);
    };

    const handleSave = async (updatedNotificationData, NotificationId) => {
        try {
            await juryNotificationService.editJuryNotification(NotificationId, updatedNotificationData);
            Swal.fire('Éxito', 'Proyecto actualizado correctamente.', 'success');
            await fetchNotion();
            closeModal();
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el proyecto.', 'error');
        }
    };

    const normalizeText = (text) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };
    const filteredNotification = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return currentNotification.filter((thesis) => {
            const fullName = `${thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [currentNotification, search, selectedCareer]);

    console.log(currentNotification)

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedThesis(null);
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

            <NotificationTable notification={filteredNotification}
                onEdit={handleEdit}
            />

            <NotificationModal
                isOpen={isModalOpen}
                notification={selectedThesis}
                onClose={closeModal}
                onSave={handleSave}
            />
        </ >
    );
};

export default ConstancyThesis;
