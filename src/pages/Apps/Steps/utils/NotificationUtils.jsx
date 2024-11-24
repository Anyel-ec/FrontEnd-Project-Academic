// Función para extraer detalles de un reporte
export const getNotificationsDetails = (notifications = {}) => {
    console.log(notifications);
    const id = notifications?.id ?? null;

    const student = notifications.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student ?? null;
    const studentTwo = notifications.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo ?? null;

    const observations = notifications?.observations ?? null;
    const meetRequirements = notifications?.meetRequirements ?? null;
    const updatedAt = notifications?.updatedAt ?? null;
    const thesisDate = notifications?.thesisDate ?? null;

    return {
        id, // Incluimos id en el objeto de retorno
        student,
        studentTwo, // Este campo será null si no existe
        meetRequirements,
        observations,
        thesisDate,
        updatedAt,
    };
};
