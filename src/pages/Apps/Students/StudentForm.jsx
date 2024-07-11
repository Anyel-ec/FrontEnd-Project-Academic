import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import 'flatpickr/dist/flatpickr.css';

const StudentForm = ({ params, setParams, date, setDate, saveStudent, closeModal }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setParams({ ...params, [id]: value });
    };

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl';
    
    return (
        <div className="p-5">
            <form>
                <div className="mb-5">
                    <label htmlFor="studentCode">Codigo Estudiantil</label>
                    <input
                        id="studentCode"
                        type="text"
                        placeholder="Ingrese el Código del Estudiante"
                        className="form-input"
                        value={params.studentCode}
                        onChange={handleChange}
                        maxLength="6"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="dni">DNI</label>
                    <input
                        id="dni"
                        type="text"
                        placeholder="Ingrese el DNI"
                        className="form-input"
                        pattern="[0-9]{8}"
                        value={params.dni}
                        onChange={handleChange}
                        maxLength="8"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="firstNames">Primer Nombre</label>
                    <input
                        id="firstNames"
                        type="text"
                        placeholder="Ingrese el Primer Nombre"
                        className="form-input"
                        value={params.firstNames}
                        onChange={handleChange}
                        maxLength="150"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="middleName">Apellido Materno</label>
                    <input
                        id="middleName"
                        type="text"
                        placeholder="Ingrese el Apellido Materno"
                        className="form-input"
                        value={params.middleName}
                        onChange={handleChange}
                        maxLength="50"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName">Apellido Paterno</label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Ingrese el Apellido Paterno"
                        className="form-input"
                        value={params.lastName}
                        onChange={handleChange}
                        maxLength="50"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email">Correo</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese el Correo"
                        className="form-input"
                        value={params.email}
                        onChange={handleChange}
                        maxLength="100"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone">Número de Teléfono</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="Ingrese el Número de Teléfono"
                        className="form-input"
                        value={params.phone}
                        onChange={handleChange}
                        pattern="^9[0-9]{8}$"
                        maxLength="9"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="address">Dirección</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Ingrese la Dirección"
                        className="form-input"
                        value={params.address}
                        onChange={handleChange}
                        maxLength="255"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label  htmlFor="birthDate">Fecha de Nacimiento</label>
                    <Flatpickr
                        id="birthDate"
                        value={params.birthDate}
                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                        className="form-input"
                        onChange={(selectedDates) => setDate(selectedDates[0])}
                        required
                    />
                </div>
                <div className="flex justify-end items-center mt-8">
                    <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveStudent}>
                        {params.id ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;

