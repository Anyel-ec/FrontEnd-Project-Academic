import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import Logo from './BANNER.png';
import styles from './styles/PdfBaseStyles';
import { formatNumberWithZero } from '../utils/Dates';

const ConstancyVoucher = ({
    showCommemorativeText,
    commemorativeText,
    children,
    registrationNumber
}) => (
    <Document>
        <Page size="A4">
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerSection}>
                        <Image style={styles.banner} src={Logo} />
                    </View>
                    {/* Mostrar texto conmemorativo si está habilitado */}
                    {showCommemorativeText && (
                        <Text style={styles.headerSection}>{commemorativeText}</Text>
                    )}
                </View>

                {/* CONTENIDO */}
                <View>
                    {children}
                </View> 

                <View style={styles.footerText}>
                    {/* <Text>Atentamente,</Text> TODO:componente con este apartado condicional */}
                    <Text>C. c.</Text>
                    <Text>Archivo</Text>
                    <Text>REG. N° {formatNumberWithZero(registrationNumber)}</Text>
                    <View style={styles.hr} />
                    <View style={styles.footerInfo}>
                        <Text>Campus Universitario S/N, Tamburco, Abancay-Apurímac</Text>
                        <Text>Carretera Panamericana Abancay-Cusco Km. 5</Text>
                        <Text>email: unidadinvestigacion@unamba.edu.pe</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

// Definir valores por defecto para las props
ConstancyVoucher.defaultProps = {
    showCommemorativeText: true,
    commemorativeText:
        '“AÑO DEL BICENTENARIO, DE LA CONSOLIDACIÓN DE NUESTRA INDEPENDENCIA, Y DE LA CONMEMORACIÓN DE LAS HEROICAS DE JUNÍN Y AYACUCHO”',
};


export default ConstancyVoucher;
