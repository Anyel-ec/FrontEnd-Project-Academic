import titleReservationsService from '../../../../api/titleReservationsService';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [reservacionesEstudiantes, setReservacionesEstudiantes] = useState([]);
    const [addProjectModal, setAddProjectModal] = useState(false);
    const [editingReservation, setEditingReservation] = useState(null);
    
    const obtenerReservacionesTitulo = useCallback(async () => {
        try {
            const reservaciones = await titleReservationsService.getTitleReservations();
            const reservacionesCumplenRequisitos = reservaciones
                .filter((reservacion) => reservacion.meetsRequirements)
                .map((reservacion) => ({
                    ...reservacion,
                    estudiantes: [
                        { ...reservacion.student },
                        ...(reservacion.studentTwo ? [reservacion.studentTwo] : [])
                    ]
                }));
                
            setReservacionesEstudiantes(reservacionesCumplenRequisitos);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, []);

    // Function to open the modal and set the selected project for editing
    const editReservation = (reservation) => {
        setEditingReservation(reservation);
        setAddProjectModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setAddProjectModal(false);
        setEditingReservation(null);
    };

    // Save function to handle the form submission in the modal
    const handleSave = async (updatedReservation) => {
        // Logic to save the edited reservation (could be an API call)
        console.log("Updated reservation:", updatedReservation);
        closeModal(); // Close the modal after saving
    };

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        obtenerReservacionesTitulo();
    }, [dispatch, obtenerReservacionesTitulo]);

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Comprobación de Proyecto</h1>

            {/* Pass editReservation as onEdit to ApprovalTable */}
            <ApprovalTable reservacionesEstudiantes={reservacionesEstudiantes} onEdit={editReservation} />
            
            {/* Pass editingReservation and handleSave to ApprovalModal */}
            <ApprovalModal
                isOpen={addProjectModal}
                onClose={closeModal}
                project={editingReservation}
                onSave={handleSave}
                adviserOptions={[]} // Replace with actual adviser options
            />
        </div>
    );
};

export default ProjectApproval;
