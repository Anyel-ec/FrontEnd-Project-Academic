import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import projectApprovalService from '../../../../api/projectApprovalService';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const { id, studentCode } = useSelector((state) => state.user); // Accede al estado global
    const [project, setProject] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        fetchProjects();
    }, [dispatch, fetchProjects]);

    const fetchProjects = useCallback(async () => {
        try {
            const projectResponse = await projectApprovalService.getProjectByStudentCode(studentCode);
            setProject(projectResponse);
            console.log(id);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, [studentCode]);

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Paso 2 - Aprobación de Proyecto</h1>
            <ApprovalTable approval={project} />
        </div>
    );
};

export default ProjectApproval;
