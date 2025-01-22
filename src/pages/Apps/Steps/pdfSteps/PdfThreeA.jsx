import React from 'react';
import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeAStyles';
import { getFullWrittenDateTimeFromInput, getWrittenDateFromInput, formatISODateToSimpleDate, getYear } from '../utils/Dates';

const PdfThreeA = ({ jury }) => {
    if (!jury) {
        console.error("El objeto 'jury' no se recibió correctamente");
        return (
            <PdfBase commemorativeText={false}>
                <Text style={styles.h1}>Error: Datos del jurado no disponibles</Text>
            </PdfBase>
        );
    }

    // Fechas y valores procesados
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const applicationDate = getFullWrittenDateTimeFromInput(currentDateTime);

    const updatedDate = jury?.updatedAt ? formatISODateToSimpleDate(jury.updatedAt) : "Fecha no disponible";
    const requestDate = getWrittenDateFromInput(updatedDate);

    const anio = getYear();
    const reg = jury?.registrationNumber;

    // Extraer datos de los estudiantes
    const firstStudent = jury?.projectApprovalStepTwo?.titleReservationStepOne?.student;
    const secondStudent = jury?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo;

    const studentsText = secondStudent
        ? `Bachilleres ${firstStudent?.firstNames || "Nombre no disponible"} ${firstStudent?.middleName || ""} ${firstStudent?.lastName || "Apellido no disponible"} y ${secondStudent?.firstNames || "Nombre no disponible"
        } ${secondStudent?.middleName || ""} ${secondStudent?.lastName || "Apellido no disponible"}`
        : `Bachiller ${firstStudent?.firstNames || "Nombre no disponible"} ${firstStudent?.middleName || ""} ${firstStudent?.lastName || "Apellido no disponible"}`;

    return (
        <PdfBase commemorativeText={false} registrationNumber={reg}>
            <Text style={styles.h1}>ACTA DE DESIGNACIÓN DE JURADOS DE TESIS</Text>

            <View style={styles.section}>
                <Text>
                    En fecha {applicationDate}, reunidas de manera presencial, el director de la Unidad de Investigación de la Facultad de Ingeniería,
                    <Text style={styles.bold}> Dr. Lintol Contreras Salas</Text>, y miembros de la Comisión de Investigación de la
                    <Text style={styles.bold}> Escuela Académico Profesional de {jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || "Carrera no disponible"}</Text>,
                    conformado por el Mgt. {jury?.projectApprovalStepTwo?.adviser?.firstNames || ""} {jury?.projectApprovalStepTwo?.adviser?.middleName || ""} {jury?.projectApprovalStepTwo?.adviser?.lastName || ""} y demás miembros de la comisión y en atención a la solicitud s/n presentado por los
                    <Text style={styles.bold}> {studentsText}</Text>,
                    de fecha {requestDate}, peticionando la designación de jurados para revisión del informe final de tesis denominado
                    <Text style={styles.bold}>: “{jury?.projectApprovalStepTwo?.titleReservationStepOne?.title || "Título no disponible"}",</Text> aprobado mediante
                    <Text style={styles.bold}> RESOLUCIÓN DECANAL N° {jury.id}-{anio}-DFI-UNAMBA</Text>.
                    Se procede a realizar la designación de jurados e incorporación de Asesor de acuerdo al
                    <Text style={styles.bold}> CAPÍTULO VII: DEL INFORME Y LA DESIGNACIÓN DE JURADOS (Art.46)</Text> del Reglamento de Investigación,
                    aprobado bajo <Text style={styles.bold}>RESOLUCIÓN N° {jury?.deanResolution || "Resolución no disponible"} – CU-UNAMBA</Text>,
                    quedando el jurado evaluador de la siguiente manera:
                </Text>
            </View>

            <View style={styles.table}>
                {/* Presidente */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {jury?.president?.firstNames || ""} {jury?.president?.middleName || ""} {jury?.president?.lastName || ""}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Presidente</Text>
                    </View>
                </View>

                {/* Primer Miembro */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {jury?.firstMember?.firstNames || ""} {jury?.firstMember?.middleName || ""} {jury?.firstMember?.lastName || ""}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Primer Miembro</Text>
                    </View>
                </View>

                {/* Segundo Miembro */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {jury?.secondMember?.firstNames || ""} {jury?.secondMember?.middleName || ""} {jury?.secondMember?.lastName || ""}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Segundo Miembro</Text>
                    </View>
                </View>

                {/* Accesitario */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {jury?.accessory?.firstNames || ""} {jury?.accessory?.middleName || ""} {jury?.accessory?.lastName || ""}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Accesitario</Text>
                    </View>
                </View>

                {/* Asesor */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>
                        {jury?.projectApprovalStepTwo?.adviser?.firstNames || ""} {jury?.projectApprovalStepTwo?.adviser?.middleName || ""} {jury?.projectApprovalStepTwo?.adviser?.lastName || ""}
                    </Text>
                    <View style={styles.tableCol}>
                        <Text style={styles.bold}>Asesor</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.section, styles.sectionFinal]}>
                <Text>
                    Siendo las {jury?.hour || "Hora no disponible"} horas del mismo día, se culmina la reunión, firmando este documento los participantes en señal de conformidad, el mismo que será adjuntado al libro de actas de la Unidad de Investigación de la Facultad de Ingeniería en
                    <Text style={styles.bold}> folio N° {jury?.numberFolio || "Folio no disponible"}.</Text>
                </Text>
            </View>
        </PdfBase>
    );
};

export default PdfThreeA;
