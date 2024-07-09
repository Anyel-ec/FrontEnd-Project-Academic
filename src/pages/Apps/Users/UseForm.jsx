import React from 'react';
import Flatpickr from 'react-flatpickr';


const UserForm = ({ params, setParams, date, setDate, isRtl, saveUser, closeModal }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setParams({ ...params, [id]: value });
    };

    return (
        <div className="p-5">
            <form>
                {['name', 'email', 'phone', 'role'].map((field, idx) => (
                    <div className="mb-5" key={idx}>
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input 
                            id={field} 
                            type={field === 'email' ? 'email' : 'text'} 
                            placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`} 
                            className="form-input" 
                            value={params[field]} 
                            onChange={handleChange} 
                        />
                    </div>
                ))}
                <div className="mb-5">
                    <label>Date of Birth</label>
                    <Flatpickr
                        value={date}
                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                        className="form-input"
                        onChange={setDate}
                    />
                </div>
                <div className="flex justify-end items-center mt-8">
                    <button type="button" className="btn btn-outline-danger" onClick={closeModal}>Cancel</button>
                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>{params.id ? 'Update' : 'Add'}</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
