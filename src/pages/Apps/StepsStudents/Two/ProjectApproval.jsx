import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import projectApprovalService from '../../../../api/projectApprovalService';
import { useUserContext } from "../../../../store/userContext";

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [project, setProject] = useState([]);
    const user = useUserContext();

    const fetchProjects = useCallback(async () => {
        if (!user) {
            console.error('No se encontró un user válido');
            return;
        }
        try {
            const projectResponse = await projectApprovalService.getProjectByStudentCode(user.user.username);
            setProject(projectResponse);
            console.log('Proyectos obtenidos:', projectResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, [user]);

    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        if (user) {
            fetchProjects();
        }
    }, [dispatch, user, fetchProjects]);

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 2 - Aprobación de Proyecto</h1>
            {/* Puedes pasar la información de proyectos al componente de tabla */}
            <ApprovalTable project={project} />
        </>
    );
};

export default ProjectApproval;
