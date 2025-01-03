
import PdfBase from './PdfBase';
import { PDFViewer, Text, View, Image } from '@react-pdf/renderer';
import styles from './styles/PdfSevenCStyles';
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
                                <Text style={styles.bold}> Solicito emisión de Resolución de sustentación de tesis aprobado en Consejo de Facultad de Contreras Alarcón Nefty, de la EAP. Ingeniería Agroindustrial</Text>
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
                            <Text>Informe Nº 002-2024-JAEMP-EAPIA-UNAMBA</Text>
                            <Text>Acta de sustentación de tesis fe datado</Text>
                            <Text>MEMORANDO MULT. Nº 041-2024-D. UIFI-UNAMBA.</Text>
                        </View>
                    </View>
                </View>
                {/* Cuerpo del texto */}
                <View style={styles.section}>
                    <Text style={styles.text}>
                        De mi mayor consideración:                    </Text>
                    <Text>
                        {/* <Text style={{ marginTop: 10, lineHeight: 1.2 }}> */}
                        Es grato dirigirme a su despacho, para saludarlo cordialmente, y a la vez
                        solicitar la resolución de ratificación de sustentación de tesis en merito
                        al Art.75 del Reglamento de Investigación a favor de la Bach.
                        <Text style={styles.bold}>Contreras Alarcón Nefty, </Text>de la
                        <Text style={styles.bold}>E.A.P. Ingeniería Agroindustrial,</Text>que sustento la tesis
                        <Text style={styles.bold}>Estudio de la influencia de localidad, estado de madurez y
                            variedad del fruto de la palta (Persea americana) sobre las características
                            fisicoquímicas y perfil de ácidos grasos de la región Apurímac. </Text>
                        aprobado según el Art.69 (aprobado muy bueno) según informe del presidente y acta
                        de sustentación de tesis.

                    </Text>

                    <Text style={{ marginTop: 14 }}> Esperando que, la presente tenga la debida atención me despido de Usted.</Text>
                </View>

            </PdfBase>
        </PDFViewer>
    );
};

export default PdfThreeC;
