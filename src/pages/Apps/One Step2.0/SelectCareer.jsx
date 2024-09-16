import React from 'react';

const SelectCareer = ({ options, value, setFieldValue, filterStudentsByCareer, errors, submitCount }) => {
    return (
        <div className="mb-4 w-1/3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Carrera</label>
            <select
                name="career"
                value={value ? value.value : ""}
                onChange={(e) => {
                    const selectedCareer = options.find(option => option.value === parseInt(e.target.value));
                    setFieldValue('career', selectedCareer); // Actualiza el valor de la carrera seleccionada
                    filterStudentsByCareer(selectedCareer?.value); // Filtra los estudiantes en base a la carrera
                }}
                className="select select-bordered w-full"
            >
                <option value="">Seleccione una carrera</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {submitCount > 0 && errors.career ? (
                <div className="text-red-500 text-sm mt-1">{errors.career}</div>
            ) : null}
        </div>
    );
};

export default SelectCareer;
