import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import projectApprovalService from '../../../../api/projectApprovalService';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [project, setProject] = useState([]);

    
    const fetchProjects = useCallback(async () => {
        try {
            const projectResponse = await projectApprovalService.getProjectByStudentCode(100001);
            setProject(projectResponse);
            console.log(project);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, [100001]);
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        fetchProjects();
    }, [dispatch, fetchProjects]);

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Paso 2 - Aprobación de Proyecto</h1>
        </div>
    );
};

export default ProjectApproval;
