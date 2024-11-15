import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { getWrittenDate, getYear } from '../utils/Dates'
import Logo from './BANNER.png';
import styles from './ConstancyVoucherStyles';

const actualData = getWrittenDate();
const anio = getYear();

const ConstancyVoucher = ({ reservation }) => (
    <Document>
        <Page size="A4">
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerSection}>
                        <Image style={styles.banner} src={Logo} />
                    </View>
                    <Text style={styles.footerText}>“AÑO DEL BICENTENARIO, DE LA CONSOLIDACIÓN DE NUESTRA INDEPENDENCIA, Y DE LA CONMEMORACIÓN DE LAS HEROICAS DE JUNÍN Y AYACUCHO”</Text>
                </View>

                <Text style={styles.h1}>CONSTANCIA Nº {reservation.id}-2024-D. UIFI-UNAMBA</Text>

                <Text style={styles.p}>EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC</Text>

                <Text style={styles.p}>
                    Que, el Bach. {reservation.student.firstNames.toUpperCase()}  {reservation.student.lastName.toUpperCase()}, identificada con DNI N°
                    {reservation.student.dni} y Código de estudiante N° {reservation.student.studentCode} de la Escuela Académico Profesional de {reservation.student?.career?.name} de la Facultad de Ingeniería, presentó el
                    Proyecto de Tesis: “{reservation.title}” , para ser evaluado mediante FILTRO DE SIMILITUD de acuerdo al Art.24 del Reglamento de investigación vigente.
                </Text>

                <Text style={styles.p}>El análisis fue realizado mediante el software Turnitin bajo los siguientes parámetros:</Text>

                <View style={styles.ul}>
                    <Text style={styles.ulLi}>• Excluir citas</Text>
                    <Text style={styles.ulLi}>• Excluir bibliografía</Text>
                    <Text style={styles.ulLi}>• Excluir fuentes 15 palabras</Text>
                </View>

                <Text style={styles.p}>El cual obtuvo un {reservation.projectSimilarity}% DE SIMILITUD tal como se puede evidenciar en el reporte adjunto.</Text>

                <Text style={styles.p}>Se expide la presente, a solicitud del interesado, a los 14 días del mes de marzo del año dos mil veinticuatro, para los fines que estime conveniente.</Text>

                <View style={styles.footerText}>
                    <Text>Atentamente,</Text>
                    <Text>C. c.</Text>
                    <Text>Archivo</Text>
                    <Text>REG. N° 051</Text>
                    <View style={styles.hr}></View>
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

ConstancyVoucher.propTypes = {
    reservation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        projectSimilarity: PropTypes.number.isRequired,
        student: PropTypes.shape({
            firstNames: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            dni: PropTypes.string.isRequired,
            studentCode: PropTypes.string.isRequired,
            career: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }).isRequired,
};

export default ConstancyVoucher;
