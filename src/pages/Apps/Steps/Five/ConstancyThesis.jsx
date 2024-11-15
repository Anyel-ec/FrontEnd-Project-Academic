import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ReportTable from './ThesisTable';
import ReportModal from './ThesisModal';
import ReportSearch from './ReportSearch';
import { getThesisDetails } from '../utils/ThesisUtils';
import teacherService from '../../../../api/teacherService';
import careerService from '../../../../api/careerService';
import constancyThesisService from '../../../../api/constancyThesisService';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [currentThesis, setCurrentThesis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advisers, setAdvisers] = useState([]);
    const [selectedThesis, setSelectedThesis] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchThesis();
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

    const fetchThesis = useCallback(async () => {
        try {
            const thesis = await constancyThesisService.getAllConstancyThesis();
            setCurrentThesis(thesis);
        } catch (error) {
            console.error('Error al obtener los thesies:', error);
        }
    }, []);

    const handleEdit = async (thesis) => {
        const thesisDetails = getThesisDetails(thesis);
        setSelectedThesis(thesisDetails);
        setIsModalOpen(true);

        try {
            const careerId = thesisDetails.student?.career?.id;
            const advisers = await teacherService.getTeachersByCareer(careerId);
            setAdvisers(advisers);
        } catch (error) {
            console.error('Error al obtener los docentes:', error);
        }
    };

    const handleSave = async (updatedReportData, reportId) => {
        try {
            await constancyThesisService.editConstancyThesis(reportId, updatedReportData);
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

    const filteredReports = useMemo(() => {
        const normalizedSearch = normalizeText(search);

        return currentThesis.filter((thesis) => {
            const { student, studentTwo } = getThesisDetails(thesis);

            const fullName = `${student?.firstNames} ${student?.lastName}`;
            const studentCodeMatch = normalizeText(student?.studentCode).includes(normalizedSearch);
            const matchesSearch =
                normalizeText(fullName).includes(normalizedSearch) || studentCodeMatch;

            const matchesCareer = selectedCareer
                ? student?.career?.id === selectedCareer.value
                : true;

            return matchesSearch && matchesCareer;
        });
    }, [currentThesis, search, selectedCareer]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedThesis(null);
    };

    return (
        <div className="pt-5">
            <ReportSearch
                search={search}
                setSearch={setSearch}
                careerOptions={careerOptions}
                selectedCareer={selectedCareer}
                setSelectedCareer={setSelectedCareer}
            />
            <ReportTable thesis={filteredReports} onEdit={handleEdit} />
            <ReportModal
                isOpen={isModalOpen}
                thesis={selectedThesis}
                onClose={closeModal}
                onSave={handleSave}
                adviserOptions={advisers}
            />
        </div>
    );
};

export default ConstancyThesis;
