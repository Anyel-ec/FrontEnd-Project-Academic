// useNonNumericKey.jsx
import { useCallback } from 'react';

const useNonNumericKeyDown = () => {
    const handleKeyDown = useCallback((e) => {
        // Bloquea los números y permite otras teclas como Backspace, ArrowLeft y ArrowRight
        if (/\d/.test(e.key)) {
            e.preventDefault(); // Evita la entrada de números
        }
        // Permite teclas especiales como Backspace, ArrowLeft y ArrowRight
        if (e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            return; // Permite estas teclas
        }
    }, []);

    return handleKeyDown;
};

export { useNonNumericKeyDown };
