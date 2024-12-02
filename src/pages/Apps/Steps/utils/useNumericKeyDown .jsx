// useNumericKey.jsx
import { useCallback } from 'react';

const useNumericKeyDown = () => {
    const handleKeyDown = useCallback((e) => {
        // Permite solo números y teclas especiales como borrar y flechas
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    }, []);

    return handleKeyDown;
};

// Exporta correctamente la función
export { useNumericKeyDown };
