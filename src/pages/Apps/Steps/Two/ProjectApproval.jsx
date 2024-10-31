import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';
import titleReservationsService from '../../../../api/titleReservationsService';
import teacherService from '../../../../api/teacherService';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [reservacionesEstudiantes, setReservacionesEstudiantes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [advisers, setAdvisers] = useState([]);

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
    }, []);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        obtenerReservacionesTitulo();
    }, [dispatch, obtenerReservacionesTitulo]);

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

    const handleDelete = (projectId) => {
        console.log('Eliminando el proyecto con ID:', projectId);
        // Aquí agregar la lógica para eliminar el proyecto
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleSave = async (id, updatedProject) => {
        console.log('Actualizando proyecto:', id, updatedProject);
        // Aquí agregar la lógica para guardar o actualizar el proyecto
        setIsModalOpen(false);
        obtenerReservacionesTitulo(); // Refrescar la lista después de guardar
    };

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Comprobación de Proyecto</h1>

            {/* Pasar handleEdit y handleDelete a ApprovalTable */}
            <ApprovalTable
                reservacionesEstudiantes={reservacionesEstudiantes}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal para edición del proyecto */}
            <ApprovalModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave} // Asignar la función handleSave
                currentReservation={selectedProject} // Enviar el proyecto seleccionado al modal
                adviserOptions={advisers} // Pasar los docentes como opciones de asesor
            />
        </div>
    );
};

export default ProjectApproval;
