import React, { useState, useEffect } from 'react';
import RecompositionView from './RecompositionView';
import RecompositionModal from './RecompositionModal';
import JuryRecompositionService from '../../../../api/juryRecompositionService';

const JuryRecomposition = () => {
    const [recompositions, setRecompositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecomposition, setSelectedRecomposition] = useState(null); // Estado para manejar la recomposición seleccionada
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

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
        setSelectedRecomposition(recomposition);
        setIsModalOpen(true);
    };

    const handleSave = async (id, updatedData) => {
        try {
            await JuryRecompositionService.updateJuryRecomposition(id, updatedData);
            setRecompositions((prevRecompositions) =>
                prevRecompositions.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating jury recomposition:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <RecompositionView recompositions={recompositions} onEdit={handleEdit} />
            {isModalOpen && (
                <RecompositionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    recomposition={selectedRecomposition}
                />
            )}
        </>
    );

};

export default JuryRecomposition;
