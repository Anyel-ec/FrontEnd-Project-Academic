// Función para extraer detalles de un reporte
export const getApprovalDetails = (project = {}) => {
    const id = project?.id ?? null;

    const student = project?.titleReservationStepOne?.student ?? null;
    const studentTwo = project?.titleReservationStepOne?.studentTwo ?? null;

    const observations = project?.observations ?? null;
    const meetsRequirements = project?.meetsRequirements ?? null;
    const updatedAt = project?.updatedAt ?? null;

    return {
        id, // Incluimos id en el objeto de retorno
        student,
        studentTwo, // Este campo será null si no existe
        meetsRequirements,
        observations,
        updatedAt,
    };
};
