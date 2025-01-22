import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TapprovalTable from './PastingTable';
import TapprovalModal from './PastingModal';
import TapprovalSearch from './PastingSearch';
import pastingApprovalService from '../../../../api/pastingApprovalService';
import careerService from '../../../../api/careerService';
import InfoService from '../../../../api/institucionalInfoService';
import Swal from 'sweetalert2';

const PastingApproval = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPasting, setSelectedPasting] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [pastings, setPastings] = useState([]);
    const [info, setInfo] = useState(null);
    
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Tesis'));
        fetchPastings();
        fetchCareers();
        fetchInfo();
    }, [dispatch]);

    const fetchInfo = useCallback(async () => {
        try {
            const response = await InfoService.getInfo();
            setInfo(response)
        } catch (error) {
            setApiError('Error al cargar la información institucional.');
        }
    }, []);
    
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

    const fetchPastings = useCallback(async () => {
        try {
            const pastingResponse = await pastingApprovalService.getAllPastingApprovals();
            setPastings(pastingResponse);
            console.log(pastingResponse);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }, []);

    const handleEdit = async (pasting) => {
        // const juryDetails = getTapprovalsDetails(pasting);
        // setSelectedPasting(juryDetails);
        setSelectedPasting(pasting);

        setIsModalOpen(true);
    };

    const handleSave = async (updatedTapprovalData, taprovalId) => {
        try {
            console.log('Enviando datos al servidor:', updatedTapprovalData);
            await pastingApprovalService.updatePastingApproval(taprovalId, updatedTapprovalData);
            Swal.fire('Éxito', 'Notificación actualizada correctamente.', 'success');
            await fetchPastings();
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

    const filteredPastings = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return pastings.filter((pasting) => {
            const fullName = `${pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [pastings, search, selectedCareer]);



    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPasting(null);
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
            <TapprovalTable pastings={filteredPastings} onEdit={handleEdit} info={info} />
            <TapprovalModal
                isOpen={isModalOpen}
                pasting={selectedPasting}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default PastingApproval;
