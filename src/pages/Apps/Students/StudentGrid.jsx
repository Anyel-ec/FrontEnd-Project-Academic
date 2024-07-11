import React from 'react';
import { IconFacebook, IconInstagram, IconLinkedin, IconTwitter } from './IconImports';

const StudentGrid = ({ student, editStudent, deleteStudent }) => (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
        {student.map((student) => (
            <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={student.id}>
                <div className="px-6 pb-24 -mt-10 relative">
                    <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                        <div className="text-xl">{student.firstNames} {student.lastName}</div>
                        <div className="text-white-dark">{student.gender}</div>
                        <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                            <div className="flex-auto">
                                <div className="text-info">{student.studentCode}</div>
                                <div>Student Code</div>
                            </div>
                            <div className="flex-auto">
                                <div className="text-info">{student.dni}</div>
                                <div>DNI</div>
                            </div>
                            <div className="flex-auto">
                                <div className="text-info">{student.birthDate}</div>
                                <div>Birth Date</div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <ul className="flex space-x-4 rtl:space-x-reverse items-center justify-center">
                                {[IconFacebook, IconInstagram, IconLinkedin, IconTwitter].map((Icon, idx) => (
                                    <li key={idx}>
                                        <button className="btn btn-outline-primary p-0 h-7 w-7 rounded-full">
                                            <Icon />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                        <div className="flex items-center">
                            <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                            <div className="truncate text-white-dark">{student.email}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                            <div className="text-white-dark">{student.phone}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-none ltr:mr-2 rtl:ml-2">Address :</div>
                            <div className="text-white-dark">{student.address}</div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                    <button className="btn btn-outline-primary w-1/2" onClick={() => editStudent(student)}>Edit</button>
                    <button className="btn btn-outline-danger w-1/2" onClick={() => deleteStudent(student)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
);

export default StudentGrid;
