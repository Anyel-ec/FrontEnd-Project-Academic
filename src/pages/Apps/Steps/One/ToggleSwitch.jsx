const ToggleSwitch = ({ isChecked, onChange }) => (
    <div className="flex items-center flex-col">
        <label htmlFor="toggleStudentSelect">Habilitar proyecto</label>
        <label className="switch">
            <input type="checkbox" id="toggleStudentSelect" checked={isChecked} onChange={onChange} />
            <span className="slider round"></span>
        </label>
    </div>
);

export default ToggleSwitch;
