
import PdfBase from './PdfBase';
import { PDFViewer, Text, View, Image } from '@react-pdf/renderer';
import Firm from './FirmStepThree.png';
import styles from './styles/PdfThreeCStyles';
import { getFullWrittenDateTimeFromInput, getWrittenDate, getYear } from '../../utils/Dates';

const PdfThreeC = () => {
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
                    Tamburco, 15 de agosto del 2024
                </Text>

                {/* Fecha y número de carta */}
                <Text style={styles.h1}>
                    CARTA Nº 185-2024-DUI-FI-UNAMBA.
                </Text>
                {/* Dirigido a */}
                <Text style={{ fontSize: 12 }}>Señor:</Text>
                <Text style={{ fontSize: 11 }}>Ph.D. Vilcanqui Pérez Fulgencio </Text>
                <Text style={[styles.bold, { fontSize: 12 }]}>Decano de la Facultad de Ingeniería – UNAMBA</Text>
                <Text><Text style={[styles.underline, { fontSize: 9 }]}>CIUDAD</Text>.-.</Text>
                <View style={styles.semiTable}>
                    {/* Row 1 */}
                    <View style={[styles.semiTableRow, { marginVertical: 10 }]}>
                        <Text style={[styles.semiTableColHeader, styles.bold]}>ASUNTO:</Text>
                        <View style={styles.semiTableCol}>
                            <Text>
                                <Text style={styles.bold}> Remito Informe de Tesis del Bach.
                                    Diofanto Honorato CONTRERAS PACORBO, para su PRIMERA revisión.</Text>
                            </Text>
                        </View>
                    </View>
                    {/* Referencias */}

                    <View style={styles.semiTableRow}>
                        <Text style={[styles.semiTableColHeader, styles.bold]}>Ref.:</Text>
                        <View style={styles.semiTableCol}>
                            <Text>
                                <Text>FUT de fecha 13 de agosto del 2024</Text>
                                <Text style={styles.bold}>                                            REG. Nº 517</Text>
                            </Text>
                            <Text>RESOLUCIÓN N° 013-2023-DFI-UNAMBA</Text>
                            <Text>RESOLUCIÓN Nº 227-2022-DFI-UNAMBA</Text>
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
                        de jurados a favor de los Bachilleres <Text style={styles.bold}> Aldair Cesar HILARES ALVAREZ
                            y Yohel Yohan SERRANO ESPINOZA </Text>del Proyecto de tesis denominado:
                        <Text style={styles.bold}>Efectos de los ensayos geotécnicos de resistencia de corte directo
                            y compresión triaxial en el dimensionamiento de cimiento superficial
                            para una edificación proyectada en Molinopata - Abancay,</Text> y en
                        reunión llevada a cabo el día 14 de agosto del 2024 con la Comisión
                        de Investigación de la <Text style={styles.bold}>EAP. Ingeniería Civil</Text>, se realizó el
                        respectivo sorteo para la ratificación de <Text style={styles.bold}>Designación de Jurados</Text>
                        quedando conformado por los docentes que detallo a continuación:
                    </Text>
                    <View style={styles.section}>
                        <View style={[styles.table, styles.bold, { marginVertical: 10 }]}>
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
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Mgt. Jimmer Bravo Apaza </Text>
                                <View style={styles.tableCol}>
                                    <Text>Accesitario</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Ph.D. Lucy Marisol Guanuchi Orellana </Text>
                                <View style={styles.tableCol}>
                                    <Text>Asesor</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text> Esperando que, la presente tenga la debida atención me despido de Usted.</Text>
                </View>

            </PdfBase>
        </PDFViewer>
    );
};

export default PdfThreeC;
