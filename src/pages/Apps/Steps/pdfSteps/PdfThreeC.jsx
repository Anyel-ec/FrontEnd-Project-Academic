
import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeCStyles';
import { formatISODateToSimpleDate, formatNumberWithZero, getWrittenDateFromInput, getYear } from '../utils/Dates';

const PdfThreeC = ({ jury, info }) => {
    const anio = getYear();

    const updatedDate = jury?.updatedAt ? formatISODateToSimpleDate(jury.updatedAt) : "Fecha no disponible";
    const requestDate = getWrittenDateFromInput(updatedDate);
    const fut = getWrittenDateFromInput(jury.futDate);
    const createdAt = getWrittenDateFromInput(jury.createdAt);
    const firstStudent = jury?.projectApprovalStepTwo?.titleReservationStepOne?.student;
    const secondStudent = jury?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo;

    const studentsText = secondStudent
        ? `Bachilleres ${firstStudent?.firstNames || "Nombre no disponible"} ${firstStudent?.middleName || ""} ${firstStudent?.lastName || "Apellido no disponible"} y ${secondStudent?.firstNames || "Nombre no disponible"
        } ${secondStudent?.middleName || ""} ${secondStudent?.lastName || "Apellido no disponible"}`
        : `Bachiller ${firstStudent?.firstNames || "Nombre no disponible"} ${firstStudent?.middleName || ""} ${firstStudent?.lastName || "Apellido no disponible"}`;

    const commemorativeText = info.commemorativeText;
    return (
        <PdfBase showCommemorativeText={true} commemorativeText={commemorativeText} registrationNumber={jury.registrationNumber}>

            <Text style={styles.textHeader}>
                Tamburco, {requestDate}
            </Text>

            {/* Fecha y número de carta */}
            <Text style={styles.h1}>
                CARTA Nº {jury.id}-{anio}-DUI-FI-UNAMBA.
            </Text>
            {/* Dirigido a */}
            <Text style={{ fontSize: 12 }}>Señor:</Text>
            <Text style={{ fontSize: 11 }}>{jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.faculty?.deanFacultyName}</Text>
            <Text style={[styles.bold, { fontSize: 12 }]}>Decano de la Facultad de Ingeniería – UNAMBA</Text>
            <Text><Text style={[styles.underline, { fontSize: 9 }]}>CIUDAD</Text>.-.</Text>
            <View style={styles.semiTable}>
                {/* Row 1 */}
                <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>ASUNTO:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text style={styles.bold}> Remito Informe de Tesis del Bach.
                                {`${jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames} ${jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.middleName} ${jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName} `}, para su PRIMERA revisión.</Text>
                        </Text>
                    </View>
                </View>
                {/* Referencias */}

                <View style={styles.semiTableRow}>
                    <Text style={[styles.semiTableColHeader, styles.bold]}>Ref.:</Text>
                    <View style={styles.semiTableCol}>
                        <Text>
                            <Text>FUT de fecha {fut}</Text>
                            <Text style={styles.bold}>                                                   REG. Nº {formatNumberWithZero(jury.registrationNumber)}</Text>
                        </Text>
                        <Text>RESOLUCIÓN N° {jury.registrationNumber}-DFI-UNAMBA</Text>
                        <Text>RESOLUCIÓN Nº {jury.secondRegistrationNumber}-DFI-UNAMBA</Text>
                    </View>
                </View>
            </View>
            {/* Cuerpo del texto */}
            <View style={styles.section}>
                <Text style={styles.text}>
                    De mi mayor consideración:                    </Text>
                <Text style={{ marginTop: 10, lineHeight: 1.2 }}>
                    Es grato dirigirme a su despacho, para saludarlo cordialmente,
                    y a la vez solicitar la resolución de ratificación de designación
                    de jurados a favor del Bachiller <Text style={styles.bold}> {jury?.projectApprovalStepTwo?.adviser?.firstNames || ""} {jury?.projectApprovalStepTwo?.adviser?.middleName || ""} {jury?.projectApprovalStepTwo?.adviser?.lastName || ""}
                    </Text>del Proyecto de tesis denominado:
                    <Text style={styles.bold}>{studentsText},</Text> y en
                    reunión llevada a cabo el día {createdAt} con la Comisión
                    de Investigación de la <Text style={styles.bold}>EAP. {jury?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career.name}</Text>, se realizó el
                    respectivo sorteo para la ratificación de <Text style={styles.bold}>Designación de Jurados</Text>
                    quedando conformado por los docentes que detallo a continuación:
                </Text>
                <View style={styles.section}>
                    <View style={[styles.table, styles.bold, { marginVertical: 10 }]}>
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
                </View>
                <Text> Esperando que, la presente tenga la debida atención me despido de Usted.</Text>
            </View>

        </PdfBase>
    );
};

export default PdfThreeC;
