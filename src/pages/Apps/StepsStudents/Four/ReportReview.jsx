import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ReportTable from './ReportTable';
import reportReviewService from '../../../../api/reportReviewService';
import { useUserContext } from "../../../../store/userContext";

const ReportReview = () => {
    const user = useUserContext(); // Obtiene el user desde el contexto
    const dispatch = useDispatch();
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

    const fetchReports = useCallback(async () => {
        try {
            setLoading(true); // Inicia la carga
            const project = await reportReviewService.getReportByStudentCode(user.user.username);
            setReport(project);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    }, [user]);

    useEffect(() => {
        dispatch(setPageTitle('Revisión de Reporte'));

        // Llama a fetchReports solo si `user` está disponible
        if (user) {
            fetchReports();
        }
    }, [dispatch, user, fetchReports]);

    // Renderización condicional mientras los datos se cargan
    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 4 - Revisión de Reporte</h1>
            <ReportTable approval={report} />
        </>
    );
};

export default ReportReview;
