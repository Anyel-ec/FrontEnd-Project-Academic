import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import JuryTable from './JuryTable';
import juryAppointmentService from '../../../../api/juryAppointmentService';
const juryAppointment = () => {
    const dispatch = useDispatch();
    const [jury, setJury] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        fetchJurys();
    }, [dispatch]);

    const fetchJurys = useCallback(async () => {
        try {
            const juryResponse = await juryAppointmentService.getAllJuryAppointments();
            setJury(juryResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, []);

    return (
        <div className="pt-5">
            <h1 className="text-2xl font-bold mb-5">Paso 3 - Designación de Jurados</h1>
            <JuryTable jury={jury} />
        </div>
    );
};

export default juryAppointment;
