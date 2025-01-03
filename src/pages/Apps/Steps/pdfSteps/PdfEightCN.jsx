import styles from './styles/PdfEightCNStyles';
import Logo from './BannerPdfFive.png';
import { Document, Page, View, Text, Image, PDFViewer } from '@react-pdf/renderer';

const PdfEightCN = () => {
    return (
        <PDFViewer style={{ width: '100vw', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image style={styles.logo} src={Logo} />
                        <Text style={styles.underline}Text/>
                        <Text style={styles.headerSection}>“AÑO DEL BICENTENARIO, DE LA CONSOLIDACIÓN DE NUESTRA INDEPENDENCIA, Y DE LA CONMEMORACIÓN DE LAS HEROICAS DE JUNÍN Y AYACUCHO”</Text>
                        <Text style={[styles.title, styles.bold]}>CONSTANCIA Nº 015-2024-D. UIFI-UNAMBA</Text>
                    </View>
                    <Text style={[styles.textMain, { marginBottom: 15 }]}>EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC.</Text>
                    <Text style={[styles.textMain, { marginBottom: 5 }]}>HACE CONSTAR:</Text>
                    <Text style={styles.body}>
                        Que, <Text style={styles.bold}>Analy CRUZ LIMASCCA</Text>, identificada con DNI N°{' '}
                        <Text style={styles.bold}>74277966</Text>, y con Código N°{' '}
                        <Text style={styles.bold}>171098</Text>, Bachiller de la Escuela Académico Profesional de{' '}
                        <Text style={styles.bold}>Ingeniería de Minas</Text>, de la Facultad de Ingeniería de la{' '}
                        <Text style={styles.bold}>Universidad Nacional Micaela Bastidas de Apurímac</Text>,{' '}
                        <Text style={styles.bold}>
                            HA CUMPLIDO CON LA PRESENTACIÓN DE 01 EMPASTADO del informe final de tesis titulado:
                        </Text>{' '}
                        <Text style={styles.bold}>
                            “Modelización del sistema de ventilación mediante el software Ventsim en el pique 8261
                            de la rama pepa oro de Pampamarca , Apurímac-2023”
                        </Text>, debidamente refrendados con firma original de los jurados evaluadores, en mérito a
                        la <Text style={styles.bold}>RESOLUCIÓN N° 007-2024-CFI-UNAMBA</Text>, que aprueba el{' '}
                        <Text style={styles.bold}>Acta de Sustentación de tesis</Text> antes mencionada.
                    </Text>
                    <Text style={styles.body}>
                        Se expide la presente constancia a solicitud del interesado, a los{' '}
                        <Text style={styles.bold}>01 días del mes de marzo del año dos mil veinticuatro</Text>, en
                        cumplimiento del Artículo N°{' '}
                        <Text style={styles.bold}>
                            28 inciso (n) del Reglamento de Grados y Títulos de la UNAMBA
                        </Text>{' '}
                        y para los fines que estime conveniente.
                    </Text>
                    <View style={styles.footerText}>
                        <Text>Atentamente,</Text>
                        <Text>C. c.</Text>
                        <Text>Archivo</Text>
                        <Text>REG. N° 051</Text>
                        <View style={styles.hr} />
                        <View style={styles.footerInfo}>
                            <Text>Campus Universitario S/N, Tamburco, Abancay-Apurímac</Text>
                            <Text>Carretera Panamericana Abancay-Cusco Km. 5</Text>
                            <Text>email: unidadinvestigacion@unamba.edu.pe</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PdfEightCN;