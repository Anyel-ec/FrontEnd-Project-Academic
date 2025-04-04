import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import JuryTable from './JuryTable';
import juryNotificationService from '../../../../api/juryNotificationService';
import { useUserContext } from "../../../../store/userContext";

const JuryNotification = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [jury, setJury] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchjury = useCallback(async () => {
        try {
            setLoading(true);
            const juryResponse = await juryNotificationService.getJuryByStudentCode(user.user.username);
            setJury(juryResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        dispatch(setPageTitle('Notificación de Jurados'));
        if (user) {
            fetchjury();
        }
    }, [dispatch, user, fetchjury]);

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
