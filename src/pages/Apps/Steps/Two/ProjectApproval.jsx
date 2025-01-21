import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';
import ApprovalSearch from './ApprovalSearch';
import teacherService from '../../../../api/teacherService';
import careerService from '../../../../api/careerService';
import InfoService from '../../../../api/institucionalInfoService';
import projectApprovalService from '../../../../api/projectApprovalService';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [currentProjects, setCurrentProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [advisers, setAdvisers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchProjects();
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
        <>
            <ApprovalSearch search={search} setSearch={setSearch} careerOptions={careerOptions} selectedCareer={selectedCareer} setSelectedCareer={setSelectedCareer} />
            <ApprovalTable projects={filteredProjects} onEdit={handleEdit} info={info} />
            <ApprovalModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} onSave={handleSave} adviserOptions={advisers} />
        </>
    );
};

export default ProjectApproval;
