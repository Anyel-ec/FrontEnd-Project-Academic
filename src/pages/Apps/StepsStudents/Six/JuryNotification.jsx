import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import JuryTable from './JuryTable';
import juryNotificationService from '../../../../api/juryNotificationService';
import { useUserContext } from "../../../../store/userContext";

const JuryNotification = () => {
    const username = useUserContext(); // Obtiene el username desde el contexto
    const dispatch = useDispatch();
    const [jury, setJury] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

    const fetchjury = useCallback(async () => {
        try {
            setLoading(true); // Inicia la carga
            const juryResponse = await juryNotificationService.getJuryByStudentCode(username);
            setJury(juryResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    }, [username]);
    
    useEffect(() => {
        dispatch(setPageTitle('Notificación de Jurados'));

        // Llama a fetchjury solo si `username` está disponible
        if (username) {
            fetchjury();
        }
    }, [dispatch, username, fetchjury]);

    // Renderización condicional mientras los datos se cargan
    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 6 - Notificación de Jurados</h1>
            <JuryTable jury={jury} />
        </>
    );
};

export default JuryNotification;
