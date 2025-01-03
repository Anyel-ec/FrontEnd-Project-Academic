import styles from './styles/PdfFiveCNStyles';
import Logo from './BannerPdfFive.png';
import { Document, Page, View, Text, Image, PDFViewer } from '@react-pdf/renderer';

const PdfFiveCN = () => {
    return (
        <PDFViewer style={{ width: '100vw', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image style={styles.logo} src={Logo} />
                        <Text style={[styles.title, styles.bold]}>CONSTANCIA DE ORIGINALIDAD</Text>
                        <Text style={[styles.textHeader, styles.bold]}>Nº 014-2024</Text>
                    </View>
                    <Text style={styles.body}>
                        La Universidad Nacional Micaela Bastidas de Apurímac,
                        a través de la Unidad de Investigación de la Facultad
                        de Ingeniería declara que, la Tesis intitulada
                        <Text style={styles.bold}> “Implementación de un sistema para el proceso de
                            elaboración de inventarios viales Apurímac, 2021”</Text>,
                        presentado por el <Text style={styles.bold}> Bach. Jesús OLIVERA CONTRERAS</Text>, para
                        optar el Título de <Text style={styles.bold}> Ingeniero Informático y Sistemas; </Text>
                        ha sido sometido a un mecanismo de evaluación y
                        verificación de similitud, a través del Software
                        COMPILATIO Magister, siendo el índice de similitud
                        ACEPTABLE de (3%) por lo que, cumple con los criterios
                        de originalidad establecidos por la Universidad.
                    </Text>
                    <Text style={styles.footerBody}>Abancay, 4 de Marzo del 2024</Text>
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

export default PdfFiveCN;