import React from 'react';

const SelectStudent = ({ options, value, setFieldValue, isDisabled, errors, submitCount }) => {
    return (
        <div className="mb-4 w-1/3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Estudiante</label>
            <select
                name="student"
                value={value ? value.value : ""}
                onChange={(e) => {
                    const selectedStudent = options.find(option => option.value === e.target.value);
                    setFieldValue('student', selectedStudent); // Actualiza el valor del estudiante seleccionado
                }}
                disabled={isDisabled}
                className="select select-bordered w-full"
            >
                <option value="">Seleccione un estudiante</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {submitCount > 0 && errors.student ? (
                <div className="text-red-500 text-sm mt-1">{errors.student}</div>
            ) : null}
        </div>
    );
};

export default SelectStudent;
