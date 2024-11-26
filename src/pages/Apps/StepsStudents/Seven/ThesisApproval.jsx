import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TApprovalTable from './TApprovalTable';
import thesisApprovalService from '../../../../api/thesisApprovalService';
import { useUserContext } from "../../../../store/userContext";

const ThesisApproval = () => {
    const username = useUserContext(); // Obtiene el username desde el contexto
    const dispatch = useDispatch();
    const [thesis, setThesis] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

    const fetchThesis = useCallback(async () => {
        try {
            setLoading(true); // Inicia la carga
            const thesisResponse = await thesisApprovalService.getThesisByStudentCode(username);
            setThesis(thesisResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    }, [username]);
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Tesis'));

        // Llama a fetchThesis solo si `username` está disponible
        if (username) {
            fetchThesis();
        }
    }, [dispatch, username, fetchThesis]);

    // Renderización condicional mientras los datos se cargan
    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 7 - Aprobacion de Tesis</h1>
            <TApprovalTable thesis={thesis} />
        </>
    );
};

export default ThesisApproval;
