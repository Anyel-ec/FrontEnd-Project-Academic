import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import JuryTable from './JuryTable';
import juryAppointmentService from '../../../../api/juryAppointmentService';
import { useUserContext } from '../../../../store/userContext';
const juryAppointment = () => {
    const dispatch = useDispatch();
    const [jury, setJury] = useState([]);
    const username = useUserContext();
    console.log(username);
    const fetchJurys = useCallback(async () => {
        if (!username) {
            console.error('No se encontró un username válido');
            return;
        }
        try {
            const juryResponse = await juryAppointmentService.getJuryByStudentCode(username);
            setJury(juryResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, [username]);
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        fetchJurys();
    }, [dispatch]);
    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Paso 3 - Designación de Jurados</h1>
            <JuryTable jury={jury} />
        </div>
    );
};

export default juryAppointment;
