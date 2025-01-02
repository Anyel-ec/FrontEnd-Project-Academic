import Select from 'react-select';
import useDarkMode from '../utils/darkMode';
import { ErrorMessage } from 'formik';
import '../../styles/toggleSwitch.css';
import { HandleMode } from '../../styles/selectStyles';

// Asumiendo que tienes un componente SelectCareer, aquí debería ser cómo manejas el cambio de opción.
const SelectCareer = ({ options, value, setFieldValue, filterStudentsByCareer, errors, submitCount, onChange }) => {
    const isDarkMode = useDarkMode();
    const styles = HandleMode(isDarkMode); // Aplicar los estilos según el modo

    const handleOnChange = (option) => {
        setFieldValue('career', option); // Ajusta el valor de carrera en Formik
        filterStudentsByCareer(option ? option.value : null); // Llama al filtrado de estudiantes
        onChange(option); // Notificar al componente padre
    };

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