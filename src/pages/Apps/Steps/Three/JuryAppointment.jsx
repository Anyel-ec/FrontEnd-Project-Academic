import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import juryAppointmentService from '../../../../api/juryAppointmentService';
import careerService from '../../../../api/careerService';
import teacherService from '../../../../api/teacherService';
import InfoService from '../../../../api/institucionalInfoService';
import JuryTable from './JuryTable';
import JuryModal from './JuryModal';
import JurySearch from './JurySearch';
import Swal from 'sweetalert2';
import { useMemo } from 'react';

const JuryAppoiment = () => {
    const dispatch = useDispatch();
    const [juryAppointment, setJuryAppointment] = useState([]);
    const [advisers, setAdvisers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJury, setSelectedJury] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Designación de Jurados'));
        fetchJuryAppointment();
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

    const fetchJuryAppointment = useCallback(async () => {
        try {
            const juryAppointment = await juryAppointmentService.getAllJuryAppointments();
            setJuryAppointment(juryAppointment);
            console.log('Obteniendo los jurados:', juryAppointment);
        } catch (error) {
            console.error('Error al obtener los jurados:', error);
        }
    }, []);

    const handleEdit = async (juryAppointment) => {
        setSelectedJury(juryAppointment);
        setIsModalOpen(true);

        // Obtener docentes por careerId de la reserva seleccionada
        try {
            const careerId = juryAppointment.projectApprovalStepTwo.titleReservationStepOne.student.career.id;
            const advisers = await teacherService.getTeachersByCareer(careerId);
            setAdvisers(advisers);
        } catch (error) {
            console.error('Error al obtener los docentes:', error);
        }
    };

    const handleSave = async (updatedJuryData, projectId) => {
        setIsLoading(true);
        try {
            await juryAppointmentService.editJuryAppointment(projectId, updatedJuryData);
            Swal.fire('Éxito', 'Jurados actualizado correctamente.', 'success');
            await fetchJuryAppointment();
            closeModal();
        } catch (error) {
            console.error('Error al guardar el jurado:', error.response?.data || error.message);
            Swal.fire('Error', 'No se pudo guardar el jurado. Revisa los datos e inténtalo nuevamente.', 'error');
        } finally {
            setIsLoading(false); // Establecer en false una vez que termine la carga

        }
    };
    const normalizeText = (text) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };

    const filteredJurys = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return juryAppointment.filter((jury) => {
            const fullName = `${jury.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${jury.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(jury.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? jury.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [juryAppointment, search, selectedCareer]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJury(null);
    };

    return (
        <>
            <JurySearch search={search} setSearch={setSearch} careerOptions={careerOptions} selectedCareer={selectedCareer} setSelectedCareer={setSelectedCareer} />
            <JuryTable currentJury={filteredJurys} onEdit={handleEdit} onSave={handleSave} adviserOptions={advisers} info={info} />
            <JuryModal juryAppointment={selectedJury} isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} isLoading={isLoading} adviserOptions={advisers} />
        </>
    );
};

export default JuryAppoiment;
