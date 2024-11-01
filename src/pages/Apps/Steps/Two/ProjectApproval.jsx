import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';

import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';
import titleReservationsService from '../../../../api/titleReservationsService';
import teacherService from '../../../../api/teacherService';
import projectApprovalService from '../../../../api/projectApprovalService'; // Importa el servicio de aprobación de proyecto

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [reservacionesEstudiantes, setReservacionesEstudiantes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [advisers, setAdvisers] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        obtenerReservacionesTitulo();
    }, [dispatch]);
    const obtenerReservacionesTitulo = useCallback(async () => {
        try {
            const reservaciones = await titleReservationsService.getTitleReservations();
            const reservacionesCumplenRequisitos = reservaciones
                .filter((reservacion) => reservacion.meetsRequirements)
                .map((reservacion) => ({
                    ...reservacion,
                    estudiantes: [{ ...reservacion.student }, ...(reservacion.studentTwo ? [reservacion.studentTwo] : [])],
                }));
            setReservacionesEstudiantes(reservacionesCumplenRequisitos);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, [reservacionesEstudiantes]);

    const handleEdit = async (reservacion) => {
        setSelectedProject(reservacion);
        setIsModalOpen(true);

        console.log('Career ID:', reservacion.student.career.id);

        // Obtener docentes por careerId de la reserva seleccionada
        try {
            const careerId = reservacion.student.career.id;
            const advisers = await teacherService.getTeachersByCareer(careerId);
            setAdvisers(advisers);
            console.log('Docentes obtenidos:', advisers);
        } catch (error) {
            console.error('Error al obtener los docentes:', error);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await projectApprovalService.deleteProjectApproval(projectId);
            console.log('Eliminando el proyecto con ID:', projectId);
            obtenerReservacionesTitulo(); // Refrescar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error);
        }
    };

    const handleSave = async (updatedProject) => {
        console.log('Ejecutando handleSave en ProjectApproval'); // Agrega este console.log
        try {
            console.log('Datos recibidos para guardar:', updatedProject);

            const projectData = {
                titleReservationStepOne: {
                    id: updatedProject.titleReservationStepOne.id,
                },
                adviser: {
                    id: updatedProject.adviser.id,
                },
                coadviser: updatedProject.coadviser ? { id: updatedProject.coadviser.id } : null,
                observations: updatedProject.observations,
            };

            console.log('Datos transformados para enviar:', projectData);

            await projectApprovalService.addProjectApproval(projectData);
            console.log('Proyecto creado:', projectData);
            Swal.fire('Éxito', 'Proyecto creado correctamente.', 'success');

            await obtenerReservacionesTitulo();
            closeModal(); // Cerrar el modal automáticamente después de la actualización
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

            <ApprovalTable reservacionesEstudiantes={reservacionesEstudiantes} onEdit={handleEdit} onDelete={handleDelete} />

            <ApprovalModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave} // Asignar la función handleSave
                currentReservation={selectedProject} // Enviar el proyecto seleccionado al modal
                adviserOptions={advisers} // Pasar los docentes como opciones de asesor
            />
        </div>
    );
};

export default ProjectApproval;
