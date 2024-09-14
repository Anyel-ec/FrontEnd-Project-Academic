import React from 'react';
import Select from 'react-select';

const SelectStudent = ({ studentOptions, onChange, value, isDisabled }) => {
    return (
        <div className={`flex-grow`}>
            <label htmlFor="student" className="block mb-1">Estudiante</label>
            <Select
                name="student"
                placeholder="Selecciona un estudiante"
                options={studentOptions}
                onChange={onChange}
                value={value}
                isDisabled={isDisabled}
            />
        </div>
    );
};

export default SelectStudent;
