import React from 'react';
import Select from 'react-select';

const SelectCareer = ({ careerOptions, onChange, value, error }) => {
    return (
        <div className={`flex-grow ${error ? 'has-error' : ''}`}>
            <label htmlFor="career" className="block mb-1">Carrera</label>
            <Select
                name="career"
                placeholder="Selecciona una carrera"
                options={careerOptions}
                onChange={onChange}
                value={value}
            />
            {error && <div className="text-danger mt-1">{error}</div>}
        </div>
    );
};

export default SelectCareer;
