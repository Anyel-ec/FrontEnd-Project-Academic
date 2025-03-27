import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfFourCMStyles';
import { formatNumberWithZero, getYear, getWrittenDateFromInput } from '../utils/Dates';

const PdfFourCM = ({ jury, info }) => {
    const anio = getYear();
    const createdAt = getWrittenDateFromInput(jury.createdAt);
    const commemorativeText = info?.commemorativeText || '';
    const student = `${jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames} ${jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.middleName} ${jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName}`;
    const studentTwo = `${jury?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames} ${jury?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.middleName} ${jury?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName}`;
    console.log(jury.projectApprovalStepTwo.adviser);
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

                    {/* Row 4 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{jury?.accessory?.firstNames || ""} {jury?.accessory?.middleName || ""} {jury?.accessory?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>Accesitario</Text>
                        </View>
                    </View>
                    {/* Row 5 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>{jury?.projectApprovalStepTwo?.adviser?.firstNames || ""} {jury?.projectApprovalStepTwo?.adviser?.middleName || ""} {jury?.projectApprovalStepTwo?.adviser?.lastName || ""}</Text>
                        <View style={styles.tableCol}>
                            <Text>Asesor</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>ASUNTO:</Text>
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
                            <Text style={styles.bold}>                                         REG. Nº {formatNumberWithZero(jury.registrationNumber)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN DECANAL N° {jury?.deanResolution}-DFI-UNAMBA</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Por el presente comunico a ustedes que, en cumplimiento del Art 47 del Reglamento de
                    Investigación vigente, se remite los documentos y las Resoluciones de la referencia
                    y un ejemplar de la tesis titulada:
                </Text>
                <Text style={[styles.bold, { marginVertical: 10 }]}>
                    "{jury?.projectApprovalStepTwo?.titleReservationStepOne?.title}".
                </Text>
                <Text>
                    <Text>En ese sentido, remito dicho expediente para su</Text>
                    <Text>revisión conforme indica el</Text>
                    <Text style={styles.bold}> Art 47, 48 y 49 del Reglamento de Investigación </Text>
                    <Text>aprobado con resolución</Text>
                    <Text style={styles.bold}> N° {jury?.deanResolution}-CU-UNAMBA.</Text>
                    <Text>
                        al mismo tiempo, debo manifestar para su conocimiento que en <Text style={styles.bold}>Capítulo XIII </Text>
                        DISPOSICIONES TRANSISTORIAS y FINALES, en la segunda y tercera se indica literal
                        <Text style={styles.italic}>"La vigencia del presente es inmediata a su publicación dejando sin efecto el anterior reglamento" </Text>
                        <Text style={styles.italic}>"deróguese toda norma que se contraponga al presente reglamento a partir del día de su publicación" </Text>
                    </Text>

                </Text>
                <Text style={{ marginTop: 3 }}>
                    Por lo que; en atención al presente reglamento
                    sirvase revisar con forme indica el Reglamento
                    de la investigación vigente.
                </Text>
            </View>

            {/* Cierre */}
            <View style={styles.section}>
                <Text style={{ marginTop: 12 }}>
                    Sin otro particular, aprovecho la oportunidad para expresarles las muestras de mi especial
                    consideración y deferencia personal.
                </Text>
                <Text style={[styles.sectionSign, { marginTop: 20, marginBottom: 75 }]}>Atentamente,</Text>
            </View>
        </PdfBase>
    );
};

export default PdfFourCM;
