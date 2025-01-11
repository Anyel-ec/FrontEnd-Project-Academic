import React, { useState, useEffect } from 'react';
import PassageExpansionService from '../../../../api/PassageExpansionService';
import PassageView from './PassageView';
import ChangeModal from './ChangeModal';


const PassageExpansion = () => {
    const [expansions, setExpansions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedExpansion, setSelectedExpansion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal


    const fetchExpansions = async () => {
        setLoading(true);
        try {
            const data = await PassageExpansionService.getAllPassageExpansions();
            setExpansions(data);
        } catch (error) {
            console.error('Error fetching passage expansions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpansions();
    }, []);
    const handleEdit = (expansions) => {
        setSelectedExpansion(expansions);
        setIsModalOpen(true);
    };
    const handleSave = async (id, updatedData) => {
        try {
            await PassageExpansionService.updatePassageExpansion(id, updatedData);
            setExpansions((prevExpansions) =>
                prevExpansions.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating passage expansion:', error);
        }
    };

    return (
        <>
            <PassageView expansions={expansions} onEdit={handleEdit} />
            {isModalOpen && (
                <ChangeModal
                    isOpen={showModal}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    expansion={selectedExpansion}
                />
            )}
        </>
    );

};

export default PassageExpansion;
