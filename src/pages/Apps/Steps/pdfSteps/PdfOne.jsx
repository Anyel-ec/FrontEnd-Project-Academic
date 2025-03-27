import PdfBase from './PdfBase';
import { PDFViewer, Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { getWrittenDate, getYear } from '../utils/Dates';

const Pdfone = ({ reservation }) => {
    const anio = getYear();
    return (
        <PdfBase registrationNumber={reservation?.registrationNumber} >
            <Text style={styles.h1}>
                CONSTANCIA Nº {reservation.id}-{anio}-D. UIFI-UNAMBA
            </Text>

            <Text style={styles.p}>
                EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC
            </Text>

            <Text style={styles.p}>
                Que, el Bach. {reservation.student.firstNames.toUpperCase()} {reservation.student.lastName.toUpperCase()}, identificado con DNI N°
                {reservation.student.dni} y Código de estudiante N° {reservation.student.studentCode} de la Escuela Académico Profesional de{' '}
                {reservation.student?.career?.name} de la Facultad de Ingeniería, presentó el Proyecto de Tesis: “{reservation.title}” ,
                para ser evaluado mediante FILTRO DE SIMILITUD de acuerdo al Art.24 del Reglamento de investigación vigente.

            </Text>

            <Text style={styles.p}>
                El análisis fue realizado mediante el software Turnitin bajo los siguientes parámetros:
            </Text>

            <View style={styles.ul}>
                <Text style={styles.ulLi}>• Excluir citas</Text>
                <Text style={styles.ulLi}>• Excluir bibliografía</Text>
                <Text style={styles.ulLi}>• Excluir fuentes 15 palabras</Text>
            </View>
            <Text style={styles.p}>El cual obtuvo un {reservation.projectSimilarity}% DE SIMILITUD tal como se puede evidenciar en el reporte adjunto.</Text>

            <Text style={[styles.p, { marginBottom: '290px' }]}>Se expide la presente, a solicitud del interesado, a los 14 días del mes de marzo del año dos mil veinticuatro, para los fines que estime conveniente.</Text>
        </PdfBase>
    );
};

export default Pdfone;
