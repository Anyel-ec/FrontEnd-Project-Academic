import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ReportTable from './ReportTable';
import ReportModal from './ReportModal';
import ReportSearch from './ReportSearch';
import teacherService from '../../../../api/teacherService';
import careerService from '../../../../api/careerService';
import reportReviewService from '../../../../api/reportReviewService';

const ReportReview = () => {
    const dispatch = useDispatch();
    const [currentReports, setCurrentReports] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advisers, setAdvisers] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchReports();
        fetchCareers();
    }, [dispatch]);
    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({
                value: career.id,
                label: career.name,
                data: career,
            }));
            setCareerOptions(options);
        } catch (error) {
            console.error('Error fetching careers:', error);
        }
    }, []);
    const fetchReports = useCallback(async () => {
        try {
            const reports = await reportReviewService.getReportReview();
            setCurrentReports(reports);
        } catch (error) {
            console.error('Error al obtener los reportes:', error);
        }
    }, []);

    const handleEdit = async (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);

        // Obtener docentes por careerId de la reserva seleccionada
        try {
            const careerId = report.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id;
            const advisers = await teacherService.getTeachersByCareer(careerId);
            setAdvisers(advisers);
        } catch (error) {
            console.error('Error al obtener los docentes:', error);
        }
    };

    const handleSave = async (updatedReportData, reportId) => {
        try {
            console.log(updatedReportData)
            // Llamada al servicio con el ID en la URL y los datos en el cuerpo
            await reportReviewService.editReportReview(reportId, updatedReportData);
            Swal.fire('Éxito', 'Proyecto actualizado correctamente.', 'success');

            await fetchReports(); // Actualizamos la lista de proyectos
            closeModal(); // Cerramos el modal después de guardar
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el proyecto.', 'error');
        }
    };

    const normalizeText = (text) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };
    const filteredReports = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return currentReports.filter((report) => {
            const fullName = `${report.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.firstNames} ${report.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(report.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;

            // Filtrar por carrera si `selectedCareer` está seleccionado
            const matchesCareer = selectedCareer ? report.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [currentReports, search, selectedCareer]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };
    return (
        <>
            <ReportSearch search={search} setSearch={setSearch} careerOptions={careerOptions} selectedCareer={selectedCareer} setSelectedCareer={setSelectedCareer} />
            <ReportTable reports={filteredReports} onEdit={handleEdit} />
            <ReportModal isOpen={isModalOpen} report={selectedReport} onClose={closeModal} onSave={handleSave} adviserOptions={advisers} />
        </>
    );
};

export default ReportReview;
