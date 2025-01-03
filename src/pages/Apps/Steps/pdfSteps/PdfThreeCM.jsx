import PdfBase from './PdfBase';
import { PDFViewer, Text, View, Image } from '@react-pdf/renderer';
import Firm from './FirmStepThree.png';
import styles from './styles/PdfThreeCMStyles';
import { getFullWrittenDateTimeFromInput, getWrittenDate, getYear } from '../../utils/Dates';

const PdfThreeCM = () => {
    const anio = getYear();
    const applicationDate = getFullWrittenDateTimeFromInput("2024-12-01 22:06:49");
    const actualData = getWrittenDate();
    const juryAppointment = {
        anio: anio,
        actualData: actualData,
        applicationDate: applicationDate,
        id: 123,
        title: 'Análisis de Algoritmos en Redes Neuronales',
        projectSimilarity: 18,
        engineeringFaculty: {
            dni: 123456789,
            firstName: "Joel",
            middleName: "Jose",
            lastName: "Huacan",
            carrer: {
                name: "Ingeniería de Sistemas",
            }
        },
        asesor: {
            dni: 123456784,
            firstName: "Juan",
            middleName: "Anyel",
            lastName: "Paztos",
            carrer: {
                name: "Ingeniería de Sistemas",
            }
        },
        coAsesor: {
            dni: 123456754,
            firstName: "Jerick",
            middleName: "Johan",
            lastName: "Patiño",
            carrer: {
                name: "Ingeniería de Sistemas",
            }
        },
        student: {
            firstName: 'Juan Carlos',
            lastName: 'Perez Gomez',
            dni: '12345678',
            studentCode: '2024001',
            career: {
                name: 'Ingeniería de Sistemas',
            },
        },
    };
    console.log(applicationDate);

    return (

        <PDFViewer style={{ width: '100vw', height: '100vh' }}>

            <PdfBase showCommemorativeText={true} commemorativeText={`“Año del Bicentenario, de la consolidación de nuestra Independencia, y de la conmemoración 
de las Heroicas de Junín y Ayacucho”
`}>

                <Text style={styles.textHeader}>
                    Tamburco, 25 de enero del 2024
                </Text>

                {/* Fecha y número de carta */}
                <Text style={styles.h1}>
                    CARTA MULTIPLE Nº 001-2024-D. UI-FI-UNAMBA.
                </Text>
                {/* Dirigido a */}
                <View style={styles.section}>
                    <Text style={[styles.bold, styles.textTableHeader]}>
                        SEÑORES: Jurados Evaluadores de Tesis de la EAP. Ingeniería de Minas
                    </Text>
                    <View style={styles.table}>
                        {/* Row 1 */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Dr. Edwar Ilasaca Cahuata</Text>
                            <View style={styles.tableCol}>
                                <Text>
                                    <Text>Presidente</Text>
                                </Text>
                            </View>
                        </View>

                        {/* Row 2 */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Ing. Milson Moran Moreano</Text>
                            <View style={styles.tableCol}>
                                <Text>Primer Miembro</Text>
                            </View>
                        </View>

                        {/* Row 3 */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Mgt. Rómulo Gómez Noblega</Text>
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
                                    Diofanto Honorato CONTRERAS PACORBO, para su PRIMERA revisión.</Text>
                            </Text>
                        </View>
                    </View>
                    {/* Referencias */}

                    <View style={styles.semiTableRow}>
                        <Text style={styles.semiTableColHeader}>Ref.:</Text>
                        <View style={styles.semiTableCol}>
                            <Text>
                                <Text>SOLICITUD de fecha 25 de enero del 2024</Text>
                                <Text style={styles.bold}>                                            REG. Nº 016</Text>
                            </Text>
                            <Text>RESOLUCIÓN DECANAL N° 013-2023-DFI-UNAMBA</Text>
                            <Text>RESOLUCIÓN DECANAL Nº 227-2022-DFI-UNAMBA</Text>
                        </View>
                    </View>
                </View>

                {/* Cuerpo del texto */}
                <View style={styles.section}>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                        Por el presente comunico a ustedes que, en cumplimiento del Art 30 del Reglamento de Investigación vigente, se remite los documentos y las Resoluciones de la referencia y un ejemplar de la tesis titulada:
                    </Text>
                    <Text style={styles.bold}>
                        "Diseño de malla de perforación y voladura para evaluar su incidencia en la fragmentación y costos operativos, en la profundización de la rampa 440, Cía. Minera Aurífera Cuatro de Enero S.A. (MACDESA) – Arequipa, 2022".
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

                    <View >
                        <Image style={styles.firm} src={Firm} />
                    </View>
                </View>
            </PdfBase>
        </PDFViewer>
    );
};

export default PdfThreeCM;
