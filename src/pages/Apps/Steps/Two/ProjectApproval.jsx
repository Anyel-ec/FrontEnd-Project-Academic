import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';
import teacherService from '../../../../api/teacherService';
import projectApprovalService from '../../../../api/projectApprovalService';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [currentProjects, setCurrentProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [advisers, setAdvisers] = useState([]);
    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchProjects();
    }, [dispatch]);

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

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Comprobación de Proyecto</h1>
            <ApprovalTable projects={currentProjects} onEdit={handleEdit} />
            <ApprovalModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} project={selectedProject} adviserOptions={advisers} />
        </div>
    );
};

export default ProjectApproval;
