// JuryAppoiment.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './AppointmentTable';
import projectApprovalService from '../../../../api/projectApprovalService';

const JuryAppoiment = () => {
    const dispatch = useDispatch();
    const [projectApproval, setProjectApproval] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchProjectApproval();
    }, [dispatch]);

    const fetchProjectApproval = useCallback(async () => {
        try {
            const projectApproval = await projectApprovalService.getProjectApproval();
            setProjectApproval(projectApproval);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, []);

    const handleEdit = (project) => {
        console.log('Editando proyecto:', project);
        // Lógica para editar proyecto
    };

    const handleDelete = async (projectId) => {
        try {
            await projectApprovalService.deleteProjectApproval(projectId);
            console.log('Eliminando el proyecto con ID:', projectId);
            fetchProjectApproval(); // Refresca la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error);
        }
    };

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Comprobación de Proyecto</h1>
            <ApprovalTable currentProject={projectApproval} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default JuryAppoiment;
