import React, { useEffect, useCallback,useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import projectApprovalService from '../../../../api/projectApprovalService';
import { useUserContext } from "../../../../store/userContext";

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [project, setProject] = useState([]);
    const username = useUserContext();
    console.log(username);
    // Fetch projects usando el username desde Redux
    const fetchProjects = useCallback(async () => {
        if (!username) {
            console.error('No se encontró un username válido');
            return;
        }
        try {
            const projectResponse = await projectApprovalService.getProjectByStudentCode(username);
            setProject(projectResponse);
            console.log('Proyectos obtenidos:', projectResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, [username]);

    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        fetchProjects();
    }, [dispatch, fetchProjects]);

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Paso 2 - Aprobación de Proyecto</h1>
            {/* Puedes pasar la información de proyectos al componente de tabla */}
            <ApprovalTable project={project} />
        </div>
    );
};

export default ProjectApproval;
