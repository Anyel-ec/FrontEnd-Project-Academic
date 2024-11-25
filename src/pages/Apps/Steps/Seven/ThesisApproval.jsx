import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TapprovalTable from './TApprovalTable';
import TapprovalModal from './TApprovalModal';
import TapprovalSearch from './TApprovalSearch';
import thesisApprovalService from '../../../../api/thesisApprovalService';
import careerService from '../../../../api/careerService';
import Swal from 'sweetalert2';

const ThesisApproval = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTapproval, setSelectedTapproval] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [tapprovals, setTapprovals] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Tesis'));
        fetchTapprovals();
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

    const fetchTapprovals = useCallback(async () => {
        try {
            const tapprovalResponse = await thesisApprovalService.getAllThesisApprovals();
            setTapprovals(tapprovalResponse);
            console.log(tapprovalResponse);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }, []);

    const handleEdit = async (tapproval) => {
        // const juryDetails = getTapprovalsDetails(tapproval);
        // setSelectedTapproval(juryDetails);
        setSelectedTapproval(tapproval);

        setIsModalOpen(true);
    };

    const handleSave = async (updatedTapprovalData, taprovalId) => {
        try {
            console.log('Enviando datos al servidor:', updatedTapprovalData);
            await thesisApprovalService.updateThesisApproval(taprovalId, updatedTapprovalData);
            Swal.fire('Éxito', 'Notificación actualizada correctamente.', 'success');
            await fetchTapprovals();
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

    const filteredTapprovals = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return tapprovals.filter((tapproval) => {
            const fullName = `${tapproval?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${tapproval?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(tapproval?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? tapproval?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [tapprovals, search, selectedCareer]);



    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTapproval(null);
    };

    return (
        <>
            <TapprovalSearch
                search={search}
                setSearch={setSearch}
                careerOptions={careerOptions}
                selectedCareer={selectedCareer}
                setSelectedCareer={setSelectedCareer}
            />
            <TapprovalTable tapprovals={filteredTapprovals} onEdit={handleEdit} />
            <TapprovalModal
                isOpen={isModalOpen}
                tapproval={selectedTapproval}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default ThesisApproval;
