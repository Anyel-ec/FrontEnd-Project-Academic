import { useSelector } from 'react-redux'; // Para acceder al estado global
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { ErrorMessage } from 'formik';
import '../../styles/toggleSwitch.css';
import { HandleMode } from '../../styles/selectStyles';

// Asumiendo que tienes un componente SelectCareer, aquí debería ser cómo manejas el cambio de opción.
const SelectCareer = ({ options, value, setFieldValue, filterStudentsByCareer, errors, submitCount, onChange }) => {
    const theme = useSelector((state) => state.themeConfig.theme); // 'light' | 'dark' | 'system'
    const [isDarkMode, setIsDarkMode] = useState();
    const handleOnChange = (option) => {
        setFieldValue('career', option); // Ajusta el valor de carrera en Formik
        filterStudentsByCareer(option ? option.value : null); // Llama al filtrado de estudiantes
        onChange(option); // Notificar al componente padre
    };
    useEffect(() => {
        // Función para aplicar el modo correcto según las preferencias del sistema
        const applySystemTheme = () => {
            if (theme === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDarkMode(prefersDark);
            } else {
                setIsDarkMode(theme === 'dark');
            }
        };

        // Aplicar el tema inicial al cargar el componente
        applySystemTheme();

        // Escuchar cambios en las preferencias del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', applySystemTheme);

        // Limpieza del listener al desmontar el componente
        return () => mediaQuery.removeEventListener('change', applySystemTheme);
    }, [theme]); // Ejecuta el efecto cuando cambia el tema
    const styles = HandleMode(isDarkMode); // Aplicar los estilos según el modo

    return (
        <div>
            <label htmlFor="career" className="block mb-1">
                Carrera
            </label>

            <Select
                name="career"
                options={options}
                value={value}
                styles={styles}
                onChange={handleOnChange}
                placeholder="Selecciona una carrera"
                isClearable={true}
                isSearchable={true}
                className={submitCount && errors.career ? 'error' : ''}
            />
            <ErrorMessage name="career" component="div" className="text-danger mt-1" />
        </div>
    );
};

export default SelectCareer;