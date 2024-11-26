import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ThesisTable from './ThesisTable';
import constancyThesisService from '../../../../api/constancyThesisService';
import { useUserContext } from '../../../../store/userContext';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [currentThesis, setCurrentThesis] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
    const username = useUserContext();

    const fetchThesis = useCallback(async () => {
        try {
            setLoading(true); // Inicia la carga
            const thesis = await constancyThesisService.getConstancyByStudentCode(username);
            setCurrentThesis(thesis);
        } catch (error) {
            console.error('Error al obtener los thesies:', error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    }, [username]);

    useEffect(() => {
        dispatch(setPageTitle('Constancia de Tesis'));
        if (username) {
            fetchThesis();
        }
    }, [dispatch, username, fetchThesis]);


    if (loading) {
        return <div>Cargando datos...</div>;
    }
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 5 - Constancia de Tesis</h1>
            <ThesisTable thesis={currentThesis} />
        </>
    );
};

export default ConstancyThesis;
