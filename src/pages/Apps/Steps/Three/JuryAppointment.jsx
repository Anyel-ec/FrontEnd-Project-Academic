// JuryAppoiment.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import juryAppointmentService from '../../../../api/juryAppointmentService';
import teacherService from '../../../../api/teacherService';
import JuryTable from './JuryTable';
import JuryModal from './JuryModal';
import Swal from 'sweetalert2';

const JuryAppoiment = () => {
    const dispatch = useDispatch();
    const [juryAppointment, setJuryAppointment] = useState([]);
    const [advisers, setAdvisers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJury, setSelectedJury] = useState(null);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Asignación de Jurados'));
        fetchJuryAppointment();
    }, [dispatch]);

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
        try {
            // Llamada al servicio con el ID en la URL y los datos en el cuerpo
            await juryAppointmentService.editJuryAppointment(projectId, updatedJuryData);
            Swal.fire('Éxito', 'Jurados actualizado correctamente.', 'success');

            await fetchJuryAppointment(); // Actualizamos la lista de proyectos
            closeModal(); // Cerramos el modal después de guardar
        } catch (error) {
            console.error('Error al guardar el jurado:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el jurado.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJury(null);
    };

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Asignación de Jurados</h1>
            <JuryTable currentJury={juryAppointment} onEdit={handleEdit} onSave={handleSave} adviserOptions={advisers} />
            <JuryModal juryAppointment={selectedJury} isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} adviserOptions={advisers} />
        </div>
    );
};

export default JuryAppoiment;
