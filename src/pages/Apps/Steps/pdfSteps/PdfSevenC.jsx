
import PdfBase from './PdfBase';
import { Text, View} from '@react-pdf/renderer';
import styles from './styles/PdfSevenCStyles';
import { getWrittenDateFromInput, getWrittenDate, getYear, formatNumberWithZero, formatISODateToSimpleDate } from '../utils/Dates';

const PdfThreeC = ({ tapproval, info }) => {
    const anio = getYear();
    const actualData = getWrittenDate();
    const updatedDate = tapproval?.updatedAt + 1 ? formatISODateToSimpleDate(tapproval.updatedAt) : "Fecha no disponible";
    const requestDate = getWrittenDateFromInput(updatedDate);
    const commemorativeText = info?.commemorativeText;
    console.log("info", info);
    const deanName = info?.deanName;
    return (
        <PdfBase  commemorativeText={commemorativeText}>

            <Text style={styles.textHeader}>
                Tamburco, {requestDate}
            </Text>

            {/* Fecha y número de carta */}
            <Text style={styles.h1}>
                CARTA Nº {formatNumberWithZero(tapproval?.id)}-{anio}-DUI-FI-UNAMBA.
            </Text>
            {/* Dirigido a */}
            <Text style={{ fontSize: 12 }}>Señor:</Text>
            <Text style={{ fontSize: 11 }}>{deanName}</Text>
            <Text style={[styles.bold, { fontSize: 12 }]}>Decano de la Facultad de Ingeniería – UNAMBA</Text>
            <Text><Text style={[styles.underline, { fontSize: 9 }]}>CIUDAD</Text>.-.</Text>
            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}> Solicito emisión de Resolución de sustentación de tesis aprobado en Consejo de Facultad de Contreras Alarcón Nefty, de la EAP. {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.career?.name}</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}

                <View style={styles.semiTableRow}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>FUT de fecha {requestDate}</Text>
                            <Text style={styles.bold}>                                            REG. Nº {formatNumberWithZero(tapproval?.registrationNumber)}</Text>
                        </Text>
                        <Text>Informe Nº {formatNumberWithZero(tapproval?.reportNumber)}-{anio}-JAEMP-EAPIA-UNAMBA</Text>
                        <Text>Acta de sustentación de tesis fe datado</Text>
                        <Text>MEMORANDO MULT. Nº {formatNumberWithZero(tapproval?.multipleMemorandumNumber)}-{anio}-D. UIFI-UNAMBA.</Text>
                    </View>
                </View>
            </View>
            {/* Cuerpo del texto */}
            <View style={styles.section}>
                <Text style={styles.text}>
                    De mi mayor consideración:                    </Text>
                <Text>
                    Es grato dirigirme a su despacho, para saludarlo cordialmente, y a la vez
                    solicitar la resolución de ratificación de sustentación de tesis en merito
                    al Art.75 del Reglamento de Investigación a favor de la Bach.
                    <Text style={styles.bold}>{tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.firstNames} {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.middleName}{tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.lastName}, </Text>de la
                    <Text style={styles.bold}>E.A.P. {tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.career?.name},</Text>que sustento la tesis
                    <Text style={styles.bold}>{tapproval?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.title}. </Text>
                    aprobado según el Art.69 (aprobado muy bueno) según informe del presidente y acta
                    de sustentación de tesis.

                </Text>

                <Text style={{ marginTop: 14 }}> Esperando que, la presente tenga la debida atención me despido de Usted.</Text>
            </View>

        </PdfBase>
    );
};

export default PdfThreeC;
