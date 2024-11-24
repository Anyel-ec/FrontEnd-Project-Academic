import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { formatDate } from '../utils/Dates';
import { getNotificationsDetails } from '../utils/NotificationUtils.jsx';
const NotificationTable = ({ notifications = [], onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(notifications.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);
const today = new Date();
const maxDateAllowed = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const validateDate = (date) => {
    const selectedDate = new Date(date[0]);
    const today = new Date();

    if (selectedDate > today) {
        setBirthDateError('La fecha de nacimiento no puede ser una fecha futura');
        return false;
    }
    
    const age = today.getFullYear() - selectedDate.getFullYear();
    const isBirthdayPassed = today.getMonth() > selectedDate.getMonth() || (today.getMonth() === selectedDate.getMonth() && today.getDate() >= selectedDate.getDate());

    if (age < 18 || (age === 18 && !isBirthdayPassed)) {
        setBirthDateError('Debe tener al menos 18 años');
        return false;
    }
    
    setBirthDateError('');
    return true;
};
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante(s)</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Cumple Requisitos</th>
                            <th>Observaciones</th>
                            <th>Fecha de Tesis</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentNotifications.length > 0 ? (
                            currentNotifications.map((notification) => {
                                const { student, studentTwo, meetRequirements, observations, thesisDate, updatedAt } = getNotificationsDetails(notification);

                                return (
                                    <tr key={notification.id}>
                                        <td>
                                            {student?.firstNames} {student?.lastName}
                                            {studentTwo && (
                                                <>
                                                    <span className="font-bold"> - </span>
                                                    <br />
                                                    {studentTwo.firstNames} {studentTwo.lastName}
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {student?.studentCode || 'N/A'}
                                            {studentTwo && (
                                                <>
                                                    <br />
                                                    {studentTwo.studentCode || 'N/A'}
                                                </>
                                            )}
                                        </td>
                                        <td>{student?.career?.name || 'N/A'}</td>
                                        <td>{meetRequirements ? 'Sí' : 'No'}</td>
                                        <td>{observations || 'N/A'}</td>
                                        <td>{formatDate(thesisDate)}</td>
                                        <td>{formatDate(updatedAt)}</td>
                                        <td className="flex gap-4 items-center justify-center">
                                            <button onClick={() => onEdit(notification)} className="btn btn-sm btn-outline-primary">
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-2 text-center">
                                    No hay notificaciones disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

NotificationTable.propTypes = {
    notifications: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default NotificationTable;
