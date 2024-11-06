import IconUserPlus from "../../../components/Icon/IconUserPlus";
import IconSearch from "../../../components/Icon/IconSearch";

const Header = ({ search, setSearch, onAddStudent }) => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl">Estudiantes</h2>
            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                <div className="flex gap-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onAddStudent}
                    >
                        <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                        Agregar estudiantes
                    </button>
                </div>
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
            </div>
        </div>
    );
};

export default Header;
