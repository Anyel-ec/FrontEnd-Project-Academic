// src/components/AlumnoGrid.js
import React from 'react';

const AlumnoGrid = ({ items, onEdit, onDelete }) => {
    return (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
            {items.map((alumno) => (
                <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={alumno.id}>
                    <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                        <div
                            className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
                            style={{ backgroundImage: `url('/assets/images/notification-bg.png')`, backgroundRepeat: 'no-repeat', width: '100%', height: '100%' }}
                        >
                            <img className="object-contain w-4/5 max-h-40 mx-auto" src={`/assets/images/${alumno.path}`} alt="alumno_image" />
                        </div>
                        <div className="px-6 pb-24 -mt-10 relative">
                            <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                <div className="text-xl">{alumno.firstNames} {alumno.lastName}</div>
                                <div className="text-white-dark">{alumno.email}</div>
                                <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                                    <div className="flex-auto">
                                        <div className="text-info">{alumno.phone}</div>
                                        <div>Phone</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="text-info">{alumno.address}</div>
                                        <div>Address</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                <div className="flex items-center">
                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Student Code :</div>
                                    <div className="truncate text-white-dark">{alumno.studentCode}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-none ltr:mr-2 rtl:ml-2">DNI :</div>
                                    <div className="text-white-dark">{alumno.dni}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-none ltr:mr-2 rtl:ml-2">First Names :</div>
                                    <div className="text-white-dark">{alumno.firstNames}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Last Name :</div>
                                    <div className="text-white-dark">{alumno.lastName}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-none ltr:mr-2 rtl:ml-2">Middle Name :</div>
                                    <div className="text-white-dark">{alumno.middleName}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                            <button type="button" className="btn btn-outline-primary w-1/2" onClick={() => onEdit(alumno)}>
                                Edit
                            </button>
                            <button type="button" className="btn btn-outline-danger w-1/2" onClick={() => onDelete(alumno)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlumnoGrid;
