import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ThesisTable from './ThesisTable';
import constancyThesisService from '../../../../api/constancyThesisService';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [currentThesis, setCurrentThesis] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchThesis();
    }, [dispatch]);

    const fetchThesis = useCallback(async () => {
        try {
            const thesis = await constancyThesisService.getAllConstancyThesis();
            setCurrentThesis(thesis);
        } catch (error) {
            console.error('Error al obtener los thesies:', error);
        }
    }, []);
    console.log("Thesis", currentThesis);
    return (
        <div className="pt-5">
            <ThesisTable thesis={currentThesis} />
        </div>
    );
};

export default ConstancyThesis;
