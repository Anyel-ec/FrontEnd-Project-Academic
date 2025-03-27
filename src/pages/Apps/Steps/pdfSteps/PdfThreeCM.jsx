import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeCMStyles';
import { formatNumberWithZero, getYear, getWrittenDateFromInput } from '../utils/Dates';

const PdfThreeCM = ({ report, info }) => {
    const anio = getYear();
    console.log(report)
    const createdAt = getWrittenDateFromInput(report?.createdAt);
    const commemorativeText = info?.commemorativeText || '';
    const student = `${report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames} ${report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.middleName} ${report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName}`;
    const studentTwo = `${report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames} ${report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.middleName} ${report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName}`;
    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText} registrationNumber={report?.registrationNumber}>

            <Text style={styles.textHeader}>
                Tamburco, {createdAt}
            </Text>

            {/* Fecha y número de carta */}
            <Text style={styles.h1}>
                CARTA MULTIPLE Nº {report?.id}-{anio}-D. UI-FI-UNAMBA.
            </Text>
            {/* Dirigido a */}
            <View style={styles.section}>
                <Text style={[styles.bold, styles.textTableHeader]}>
                    SEÑORES: Jurados Evaluadores de Tesis de la EAP. {report?.juryAppointmentStepThree?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career.name}
                </Text>
                <View style={styles.table}>
                    {/* Row 1 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{report?.juryAppointmentStepThree?.president?.firstNames || ""} {report?.juryAppointmentStepThree?.president?.middleName || ""} {report?.juryAppointmentStepThree?.president?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text>Presidente</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{report?.juryAppointmentStepThree?.firstMember?.firstNames || ""} {report?.juryAppointmentStepThree?.firstMember?.middleName || ""} {report?.juryAppointmentStepThree?.firstMember?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>Primer Miembro</Text>
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{report?.juryAppointmentStepThree?.secondMember?.firstNames || ""} {report?.juryAppointmentStepThree?.secondMember?.middleName || ""} {report?.juryAppointmentStepThree?.secondMember?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>Segundo Miembro</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={styles.semiTableColHeader}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}> Remito Informe de Tesis del Bach. {student} {studentTwo ? `y Bach. ${studentTwo}` : ''}, para su PRIMERA revisión.</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}

                <View style={styles.semiTableRow}>
                    <Text style={styles.semiTableColHeader}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>SOLICITUD de fecha {createdAt}</Text>
                            <Text style={styles.bold}>                                         REG. Nº {formatNumberWithZero(report?.registrationNumber)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN DECANAL N° {report?.deanResolution}-DFI-UNAMBA</Text>
                        <Text>RESOLUCIÓN DECANAL Nº {report?.secondDeanResolution}-DFI-UNAMBA</Text>
                    </View>
                </View>
            </View>

            {/* Cuerpo del texto */}
            <View style={styles.section}>
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Por el presente comunico a ustedes que, en cumplimiento del Art 30 del Reglamento de Investigación vigente, se remite los documentos y las Resoluciones de la referencia y un ejemplar de la tesis titulada:
                </Text>
                <Text style={styles.bold}>
                    "{report?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.title}".
                </Text>
                <Text style={{ margin: '10px 0' }}>
                    <Text >
                        En ese sentido, remito dicho expediente para su
                    </Text>
                    <Text style={styles.bold}> PRIMERA </Text>
                    <Text>
                        revisión conforme indica el
                    </Text>
                    <Text style={styles.bold}> Art 31 del Reglamento de Investigación. </Text>
                    <Text style={styles.underline}>“Una vez recibido los trabajos de investigación o tesis, por los jurados evaluadores, se procederá a evaluar en forma y fondo en un plazo máximo de 15 días hábiles. Los miembros del jurado están obligados a participar en las diferentes etapas de la revisión del informe”; su incumplimiento constituye falta sujeta a sanción prevista en el estatuto de la UNAMBA y normas conexas. </Text>
                </Text>
                <Text>Sin otro en particular, aprovecho la oportunidad para expresarle las muestras de mi especial consideración y deferencia personal.</Text>
            </View>
        </PdfBase>
    );
};

export default PdfThreeCM;
