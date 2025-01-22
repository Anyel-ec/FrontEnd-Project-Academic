import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeCMStyles';
import { formatNumberWithZero, getYear, getWrittenDateFromInput } from '../utils/Dates';

const PdfThreeCM = ({ jury, info }) => {
    const anio = getYear();
    const createdAt = getWrittenDateFromInput(jury.createdAt);
    const commemorativeText = info?.commemorativeText || '';
    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText} registrationNumber={jury.registrationNumber}>

            <Text style={styles.textHeader}>
                Tamburco, {createdAt}
            </Text>

            {/* Fecha y número de carta */}
            <Text style={styles.h1}>
                CARTA MULTIPLE Nº {jury.id}-{anio}-D. UI-FI-UNAMBA.
            </Text>
            {/* Dirigido a */}
            <View style={styles.section}>
                <Text style={[styles.bold, styles.textTableHeader]}>
                    SEÑORES: Jurados Evaluadores de Tesis de la EAP. {jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career.name}
                </Text>
                <View style={styles.table}>
                    {/* Row 1 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{jury?.president?.firstNames || ""} {jury?.president?.middleName || ""} {jury?.president?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text>Presidente</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{jury?.firstMember?.firstNames || ""} {jury?.firstMember?.middleName || ""} {jury?.firstMember?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>Primer Miembro</Text>
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{jury?.secondMember?.firstNames || ""} {jury?.secondMember?.middleName || ""} {jury?.secondMember?.lastName || ""}</Text>
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
                            <Text style={styles.bold}> Remito Informe de Tesis del Bach.
                                , para su PRIMERA revisión.</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}

                <View style={styles.semiTableRow}>
                    <Text style={styles.semiTableColHeader}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>SOLICITUD de fecha {createdAt}</Text>
                            <Text style={styles.bold}>                                         REG. Nº {formatNumberWithZero(jury.registrationNumber)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN DECANAL N° {jury?.deanResolution}-DFI-UNAMBA</Text>
                        <Text>RESOLUCIÓN DECANAL Nº {jury?.secondDeanResolution}-DFI-UNAMBA</Text>
                    </View>
                </View>
            </View>

            {/* Cuerpo del texto */}
            <View style={styles.section}>
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Por el presente comunico a ustedes que, en cumplimiento del Art 30 del Reglamento de Investigación vigente, se remite los documentos y las Resoluciones de la referencia y un ejemplar de la tesis titulada:
                </Text>
                <Text style={styles.bold}>
                    "{jury?.projectApprovalStepTwo?.titleReservationStepOne?.title}".
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
