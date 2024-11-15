// Función para extraer detalles de un reporte
export const getThesisDetails = (thesis) => {
    const {
        reportReviewStepFour: {
            id,
            juryAppointmentStepThree: { projectApprovalStepTwo: { titleReservationStepOne: { student, studentTwo } = {} } = {} } = {},
            observations,
            meetRequirements,
            updatedAt,
        } = {},
    } = thesis;

    return {
        student,
        id,
        studentTwo,
        meetRequirements,
        observations,
        updatedAt,
    };
};

// Función para formatear la fecha
