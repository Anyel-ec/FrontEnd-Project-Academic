import IconSearch from '../../../../components/Icon/IconSearch';
import Select from 'react-select';
import { HandleMode } from '../../styles/selectStyles';
import useDarkMode from '../utils/darkMode';

const ReportSearch = ({ search, setSearch, careerOptions, selectedCareer, setSelectedCareer }) => {
    // Agrega una opción para cuando no haya carreras disponibles
    const isDarkMode = useDarkMode();
    const styles = HandleMode(isDarkMode); // Aplicar los estilos según el modo
    const optionsWithPlaceholder = careerOptions.length > 0 ? careerOptions : [{ value: '', label: 'No hay carreras disponibles', isDisabled: true }];

    return (
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-5">Revisión de Reporte</h2>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                <div className="flex gap-3">
                    {careerOptions.length > 0 ? (
                        <Select placeholder="Filtrar por carrera" isClearable options={optionsWithPlaceholder} value={selectedCareer} styles={styles} onChange={setSelectedCareer} className="w-56" />
                    ) : (
                        <p className="text-gray-500">No hay carreras disponibles</p>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por DNI, codigo y nombre"
                            className="form-input py-2 ltr:pr-8 rtl:pl-8 peer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary" aria-label="Buscar">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportSearch;
