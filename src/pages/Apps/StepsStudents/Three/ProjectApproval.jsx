import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import projectApprovalService from '../../../../api/projectApprovalService';
const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [currentProject, setCurrentProject] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        fetchProjects();
    }, [dispatch]);

    const fetchProjects = useCallback(async () => {
        try {
            const project = await projectApprovalService.getProjectApproval();
            setCurrentProject(project);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, []);

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Paso 2 - Aprobación de Proyecto</h1>
            <ApprovalTable approval={currentProject} />
        </div>
    );
};

export default ProjectApproval;
