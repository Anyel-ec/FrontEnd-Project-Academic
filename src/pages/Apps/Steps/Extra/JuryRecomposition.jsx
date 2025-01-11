import React, { useState, useEffect } from 'react';
import RecompositionView from './RecompositionView';
import JuryRecompositionService from '../../../../api/juryRecompositionService';

const JuryRecompositionPage = () => {
    const [recompositions, setRecompositions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecompositions = async () => {
            try {
                const data = await JuryRecompositionService.getAllJuryRecompositions();
                setRecompositions(data);
            } catch (error) {
                console.error('Error fetching recompositions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecompositions();
    }, []);

    const handleEdit = (recomposition) => {
        console.log('Edit:', recomposition);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return <RecompositionView recompositions={recompositions} onEdit={handleEdit} />;
};

export default JuryRecompositionPage;
