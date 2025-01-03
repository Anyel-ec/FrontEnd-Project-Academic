
import PdfBase from './PdfBase';
import { PDFViewer, Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfThreeAStyles';
import { getFullWrittenDateTimeFromInput, getWrittenDate, getYear } from '../../utils/Dates';

const PdfThreeA = () => {
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

            <PdfBase commemorativeText={false}>
                <Text style={styles.h1}>
                    ACTA DE DESIGNACIÓN DE JURADOS DE TESIS
                </Text>
                <View style={styles.section}>
                    <Text>
                        En fecha 12 de setiembre del año dos mil veinticuatro, siendo las 12:00 horas reunidas de manera presencial, el director de la Unidad de Investigación de la Facultad de Ingeniería
                        <Text style={styles.bold}> Dr. Lintol Contreras Salas</Text>
                        , y miembros de la Comisión de Investigación de la<Text style={styles.bold}> Escuela Académico Profesional de Ingeniería Civil</Text> conformado por el Mgt.  Calixto Cañari Otero y demás miembros de la comisión y en atención a la solicitud s/n presentado por el
                        <Text style={styles.bold}> Bachiller JULIO INCA GÓMEZ</Text>, de fecha 11 de setiembre del 2024 peticionando la designación de jurados para revisión del informe final de tesis denominado
                        <Text style={styles.bold}>: “Optimización del tiempo y costo en la formulación de proyectos de riego utilizando Delphin Express en la ORFEI, Apurímac - 2024",</Text>aprobado mediante
                        <Text style={styles.bold}>
                            RESOLUCIÓN DECANAL N° 221-2024-DFI-UNAMBA
                        </Text>
                        , Se procede a realizar la designación de jurados e incorporación de Asesor de acuerdo<Text style={styles.bold}>al CAPÍTULO VII: DEL INFORME Y LA DESIGNACIÓN DE JURADOS   (Art.46) del Reglamento de Investigación</Text>
                        aprobado bajo<Text style={styles.bold}> RESOLUCIÓN N° 168-2024(2) – CU-UNAMBA</Text>, quedando el jurado evaluador de la siguiente manera:
                    </Text>
                </View>
                <View style={styles.table}>
                    {/* Row 1 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Mg. Diomedes Napoleón Ferrel Sarmiento</Text>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text style={styles.bold}>Presidente</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Ing. Milson Moran Moreano</Text>
                        <View style={styles.tableCol}>
                            <Text style={styles.bold}>Primer Miembro</Text>
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Mgt. Rómulo Gómez Noblega</Text>
                        <View style={styles.tableCol}>
                            <Text style={styles.bold}>Segundo Miembro</Text>
                        </View>
                    </View>

                    {/* Row 4 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Ing. Fredy Huaman Gonzales</Text>
                        <View style={styles.tableCol}>
                            <Text style={styles.bold}>Accesitario</Text>
                        </View>
                    </View>

                    {/* Row 5 */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Dr. Edwar Ilasaca Cahuata</Text>
                        <View style={styles.tableCol}>
                            <Text style={styles.bold}>Asesor</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.section, styles.sectionFinal]}>
                    <Text>
                        Siendo las 12:30 horas del mismo día se culmina la reunión, firmando este documento los participantes en señal de conformidad, el mismo que será adjuntado al libro de actas de la Unidad de Investigación de la Facultad de Ingeniería en
                        <Text style={styles.bold}>
                            folio N° 056-2024.
                        </Text>
                    </Text>
                </View>
            </PdfBase>
        </PDFViewer>
    );
};

export default PdfThreeA;
