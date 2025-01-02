import IconUserPlus from "../../../components/Icon/IconUserPlus";
import IconSearch from "../../../components/Icon/IconSearch";
import Select from "react-select";
import useDarkMode from "../Steps/utils/darkMode";
import { HandleMode } from '../styles/selectStyles';

const Header = ({ search, setSearch, onAddTeacher, careerOptions, selectedCareer, setSelectedCareer }) => {
    const isDarkMode = useDarkMode();// Aplicar los estilos según el modo
    const styles = HandleMode(isDarkMode); // Aplicar los estilos según el modo
    return (
        <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold mb-5">Docentes</h2>
            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                <div className="flex gap-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onAddTeacher}
                    >
                        <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                        Agregar docentes
                    </button>
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
                        <button
                            type="button"
                            className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary"
                            aria-label="Buscar"
                        >
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                    {careerOptions.length > 0 ? (
                        <Select
                            placeholder="Filtrar por carrera"
                            options={careerOptions}
                            styles={styles}
                            value={selectedCareer}
                            onChange={setSelectedCareer}
                            className="w-56"
                            isClearable
                        />
                    ) : (
                        <p className="text-gray-500">No hay carreras disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

