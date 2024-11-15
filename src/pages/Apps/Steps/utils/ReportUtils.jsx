// Función para extraer detalles de un reporte
export const getReportDetails = (report) => {
    const {
        juryAppointmentStepThree: {
            projectApprovalStepTwo: {
                titleReservationStepOne: { student, studentTwo } = {},
                adviser,
                coadviser,
            } = {},
        } = {},
        meetRequirements,
        updatedAt,
    } = report;

    return {
        student,
        studentTwo,
        adviser,
        coadviser,
        meetRequirements,
        updatedAt,
    };
};

// Función para formatear la fecha
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('es-ES', options);
};
