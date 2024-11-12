import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ReportTable from './ReportTable';
import ReportModal from './ReportModal';
import ReportSearch from './ReportSearch';
import teacherService from '../../../../api/teacherService';
import careerService from '../../../../api/careerService';
import projectApprovalService from '../../../../api/projectApprovalService';

const ReportReview = () => {
    const dispatch = useDispatch();
    const [currentProjects, setCurrentProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [advisers, setAdvisers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchProjects();
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
    const fetchProjects = useCallback(async () => {
        try {
            const projects = await projectApprovalService.getProjectApproval();
            setCurrentProjects(projects);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, []);

    const handleEdit = async (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);

        // Obtener docentes por careerId de la reserva seleccionada
        try {
            const careerId = project.titleReservationStepOne.student.career.id;
            const advisers = await teacherService.getTeachersByCareer(careerId);
            setAdvisers(advisers);
        } catch (error) {
            console.error('Error al obtener los docentes:', error);
        }
    };

    const handleSave = async (updatedProjectData, projectId) => {
        try {
            // Llamada al servicio con el ID en la URL y los datos en el cuerpo
            await projectApprovalService.editProjectApproval(projectId, updatedProjectData);
            Swal.fire('Éxito', 'Proyecto actualizado correctamente.', 'success');

            await fetchProjects(); // Actualizamos la lista de proyectos
            closeModal(); // Cerramos el modal después de guardar
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

    const filteredProjects = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return currentProjects.filter((project) => {
            // Asumiendo que `project.titleReservationStepOne.student` contiene `firstNames`, `lastName`, `studentCode`, y `career`
            const fullName = `${project.titleReservationStepOne.student.firstNames} ${project.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(project.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? project.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [currentProjects, search, selectedCareer]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="pt-5">
            <ReportSearch search={search} setSearch={setSearch} careerOptions={careerOptions} selectedCareer={selectedCareer} setSelectedCareer={setSelectedCareer} />

            {/* <h1 className="text-2xl font-bold mb-5">Comprobación de Proyecto</h1> */}
            <ReportTable projects={filteredProjects} onEdit={handleEdit} />
            <ReportModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave}adviserOptions={advisers} />
        </div>
    );
};

export default ReportReview;
