// src/components/AlumnoForm.js
import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Flatpickr from 'react-flatpickr';
import IconX from '../../../components/Icon/IconX';

import 'flatpickr/dist/flatpickr.css';

const AlumnoForm = ({ alumno, onSave, onCancel }) => {
    const [params, setParams] = useState({
        id: null,
        studentCode: '',
        dni: '',
        firstNames: '',
        lastName: '',
        middleName: '',
        birthDate: '2000-01-01',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (alumno) {
            setParams({ ...alumno, birthDate: alumno.birthDate || '2000-01-01' });
        } else {
            setParams({
                id: null,
                studentCode: '',
                dni: '',
                firstNames: '',
                lastName: '',
                middleName: '',
                birthDate: '2000-01-01',
                email: '',
                phone: '',
                address: '',
            });
        }
    }, [alumno]);

    const changeValue = (e) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const handleSubmit = () => {
        onSave(params);
    };

    return (
        <Transition appear show as={Fragment}>
            <Dialog as="div" open onClose={onCancel} className="relative z-[51]">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {params.id ? 'Edit Alumno' : 'Add Alumno'}
                                </div>
                                <div className="p-5">
                                    <form>
                                        <div className="mb-5">
                                            <label htmlFor="studentCode">Student Code</label>
                                            <input id="studentCode" type="text" placeholder="Enter Student Code" className="form-input" value={params.studentCode} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="dni">DNI</label>
                                            <input id="dni" type="text" placeholder="Enter DNI" className="form-input" value={params.dni} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="firstNames">First Names</label>
                                            <input id="firstNames" type="text" placeholder="Enter First Names" className="form-input" value={params.firstNames} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input id="lastName" type="text" placeholder="Enter Last Name" className="form-input" value={params.lastName} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="middleName">Middle Name</label>
                                            <input id="middleName" type="text" placeholder="Enter Middle Name" className="form-input" value={params.middleName} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="birthDate">Date of Birth</label>
                                            <Flatpickr
                                                id="birthDate"
                                                value={params.birthDate}
                                                options={{ dateFormat: 'Y-m-d' }}
                                                className="form-input"
                                                onChange={(date) => setParams({ ...params, birthDate: date[0] })}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="phone">Phone</label>
                                            <input id="phone" type="text" placeholder="Enter Phone" className="form-input" value={params.phone} onChange={changeValue} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="address">Address</label>
                                            <input id="address" type="text" placeholder="Enter Address" className="form-input" value={params.address} onChange={changeValue} />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={onCancel}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleSubmit}>
                                                {params.id ? 'Update' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AlumnoForm;
