import React, { useState, useEffect } from 'react';
import ChangeView from './ChangeView';
import changeAdvisorService from '../../../../api/changeAdvisorService';
import ChangeModal from './ChangeModal';

const ChangeAdvisor = () => {
    const [change, setChange] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChange, setSelectedChange] = useState(null); // Estado para manejar el cambio seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

    useEffect(() => {
        const fetchChange = async () => {
            try {
                const data = await changeAdvisorService.getAllChangeAdvisors();
                setChange(data);
            } catch (error) {
                console.error('Error fetching change:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChange();
    }, []);

    const handleEdit = (change) => {
        setSelectedChange(change);
        setIsModalOpen(true);
    };

    const handleSave = async (id, updatedData) => {
        try {
            await changeAdvisorService.updateChangeAdvisor(id, updatedData);
            setChange((prevChanges) =>
                prevChanges.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating change advisor:', error);
        }
    };

    return (
        <>
            <ChangeView change={change} onEdit={handleEdit} />
            {isModalOpen && (
                <ChangeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    change={selectedChange}
                />
            )}
        </>
    );
};

export default ChangeAdvisor;
