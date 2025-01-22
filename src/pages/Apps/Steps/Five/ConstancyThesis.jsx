import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ThesisTable from './ThesisTable';
import ThesisModal from './ThesisModal';
import ThesisSearch from './ThesisSearch'; // Asegúrate de tener este componente
import careerService from '../../../../api/careerService';
import constancyThesisService from '../../../../api/constancyThesisService';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [currentThesis, setCurrentThesis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedThesis, setSelectedThesis] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchCareers();
        fetchThesis();
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
            setApiError('Error al cargar las carreras.');
        }
    }, []);

    const fetchThesis = useCallback(async () => {
        try {
            const thesis = await constancyThesisService.getAllConstancyThesis();
            setCurrentThesis(thesis);
            console.log(thesis);
        } catch (error) {
            console.error('Error al obtener las constancias de tesis:', error);
            setApiError('Error al cargar las constancias de tesis.');
        }
    }, []);

    const handleEdit = async (thesis) => {
        setSelectedThesis(thesis);
        setIsModalOpen(true);
    };

    const handleSave = async (thesisId, updatedThesisData) => {
        try {
            await constancyThesisService.editConstancyThesis(thesisId, updatedThesisData);
            Swal.fire('Éxito', 'Proyecto actualizado correctamente.', 'success');
            await fetchThesis();
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

    const filteredThesis = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return currentThesis.filter((thesis) => {
            const fullName = `${thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? thesis.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [currentThesis, search, selectedCareer]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedThesis(null);
    };

    return (
        <>
            <ThesisSearch
                search={search}
                setSearch={setSearch}
                careerOptions={careerOptions}
                selectedCareer={selectedCareer}
                setSelectedCareer={setSelectedCareer}
            />

            {apiError && <div className="text-danger">{apiError}</div>}

            <ThesisTable
                thesis={filteredThesis}
                onEdit={handleEdit}
            />

            <ThesisModal
                isOpen={isModalOpen}
                thesis={selectedThesis}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default ConstancyThesis;
