import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import PastingTable from './PastingTable';
import pastingApprovalService from '../../../../api/pastingApprovalService';
import { useUserContext } from "../../../../store/userContext";

const PastingApproval = () => {
    const user = useUserContext(); // Obtiene el user desde el contexto
    const dispatch = useDispatch();
    const [pasting, setPasting] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

    const fetchPasting = useCallback(async () => {
        try {
            setLoading(true); // Inicia la carga
            const pastingResponse = await pastingApprovalService.getPastingByStudentCode(user.user.username);
            setPasting(pastingResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    }, [user]);
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));

        // Llama a fetchPasting solo si `user` está disponible
        if (user) {
            fetchPasting();
        }
    }, [dispatch, user, fetchPasting]);

    // Renderización condicional mientras los datos se cargan
    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        < >
            <h1 className="text-2xl font-bold mb-5">Paso 8 - Aprobacion de Empastados</h1>
            <PastingTable pasting={pasting} />
        </>
    );
};

export default PastingApproval;
