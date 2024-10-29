import { useEffect, useState } from 'react';
import projectApprovalService from '../../../../api/projectApprovalService';
import teacherService from '../../../../api/teacherService';
import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';

const ProjectApproval = () => {
    const [projectApproval, setProjectApproval] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advisers, setAdvisers] = useState([]); // Estado para almacenar los docentes

    useEffect(() => {
        const fetchProjectApprovals = async () => {
            try {
                const approvals = await projectApprovalService.getProjectApproval();
                setProjectApproval(approvals);
            } catch (err) {
                setError('Error al cargar las aprobaciones de proyecto');
                console.error('Error al obtener aprobaciones:', err);
            }
        };

        fetchProjectApprovals();
    }, []);

    const handleEdit = async (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        
        // Obtener docentes por careerId de la reserva
        try {
            const careerId = project.titleReservationStepOne.student.career.id;
            const advisers = await teacherService.getTeachersByCareer(careerId);
            setAdvisers (advisers);
            console.log("Docentes obtenidos:", advisers);
        } catch (error) {
            console.error("Error al obtener los docentes:", error);
        }
    };

    const handleDelete = (projectId) => {
        console.log("Eliminando el proyecto con ID:", projectId);
        // Lógica para eliminar el proyecto
    };

    const handleSave = async (projectId, updatedData) => {
        try {
            const updatedProject = await projectApprovalService.updateProject(projectId, updatedData);
            setProjectApproval((prevApprovals) =>
                prevApprovals.map((proj) => (proj.id === projectId ? updatedProject : proj))
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al guardar el proyecto:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Aprobación de Proyecto</h1>
            {error && <p className="text-red-500">{error}</p>}
            {projectApproval.length === 0 ? (
                <p>No hay proyectos disponibles para aprobación.</p>
            ) : (
                <ApprovalTable
                    projectApprovals={projectApproval}
                    apiError={error}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
            {isModalOpen && (
                <ApprovalModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    project={selectedProject} // Pasar docentes al modal
                    adviserOptions={advisers}
                />
            )}
        </div>
    );
};

export default ProjectApproval;
