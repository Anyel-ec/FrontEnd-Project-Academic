const ToggleSwitch = ({ isEnabled, toggleChange }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={isEnabled} onChange={toggleChange} />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleSwitch;
