import React, { useState } from 'react';
import Pagination from '../Pagination';
import Swal from 'sweetalert2';
import { formatDate } from '../utils/Dates';
const NotificationTable = ({ notification, onEdit }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(notification?.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotification = notification?.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
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
                            <th>Fecha de Tesis</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentNotification?.length > 0 ? (
                            currentNotification.map((notification) => (
                                <tr key={notification?.id}>
                                    <td>
                                        {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.firstNames} {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.lastName}
                                        {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <span className='font-bold'> - </span><br />{notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames} {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                        {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <br />
                                                {notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{notification?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.career?.name || 'N/A'}</td>
                                    <td>{notification?.meetRequirements ? 'Sí' : 'No'}</td>
                                    <td>{notification?.thesisDate}</td>

                                    <td>{formatDate(notification?.updatedAt)}</td>

                                    <td className="flex gap-4 items-center justify-center">
                                        {
                                            notification.meetRequirements ? (
                                                <button
                                                    onClick={() =>
                                                        Swal.fire("Paso Completado", "Jurados notificados exitosamente.", "success")
                                                    }
                                                    className="btn btn-sm btn-outline-info"
                                                >
                                                    Completado
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => onEdit(notification)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Editar
                                                </button>
                                            )
                                        }

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    No hay campos disponibles
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



export default NotificationTable;
