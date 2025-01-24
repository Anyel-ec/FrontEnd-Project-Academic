import styles from './styles/PdfEightCNStyles';
import Logo from './BannerPdfFive.png';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { getYear, formatNumberWithZero } from '../utils/Dates';

const PdfEightCN = ({ pasting = {}, info = {} }) => {
    const currentYear = getYear();
    const commemorativeText = info?.commemorativeText || '';
    
    // Destructuración de datos profundamente anidados
    const studentData = pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student || {};
    const {
        firstNames = '',
        middleName = '',
        lastName = '',
        dni = '',
        studentCode = '',
        career = {},
    } = studentData;

    const title = pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.title || '';
    const deanResolution = formatNumberWithZero(pasting?.deanResolution || '');
    const registrationNumber = formatNumberWithZero(pasting?.registrationNumber || '');
    const articleNumber = pasting?.articleNumber || 'N/A';

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src={Logo} />
                    <Text style={styles.underline} />
                    <Text style={styles.headerSection}>“{commemorativeText}”</Text>
                    <Text style={[styles.title, styles.bold]}>
                        CONSTANCIA Nº {formatNumberWithZero(pasting?.id)}-{currentYear}-D. UIFI-UNAMBA
                    </Text>
                </View>

                {/* Main Content */}
                <Text style={[styles.textMain, { marginBottom: 15 }]}>
                    EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL
                    MICAELA BASTIDAS DE APURÍMAC.
                </Text>
                <Text style={[styles.textMain, { marginBottom: 5 }]}>HACE CONSTAR:</Text>
                <Text style={styles.body}>
                    Que, <Text style={styles.bold}>{firstNames} {middleName} {lastName}</Text>, identificada con DNI N°{' '}
                    <Text style={styles.bold}>{dni}</Text>, y con Código N°{' '}
                    <Text style={styles.bold}>{studentCode}</Text>, Bachiller de la Escuela Académico Profesional de{' '}
                    <Text style={styles.bold}>{career.name || 'N/A'}</Text>, de la Facultad de Ingeniería de la{' '}
                    <Text style={styles.bold}>Universidad Nacional Micaela Bastidas de Apurímac</Text>,{' '}
                    <Text style={styles.bold}>
                        HA CUMPLIDO CON LA PRESENTACIÓN DE 01 EMPASTADO del informe final de tesis titulado:
                    </Text>{' '}
                    <Text style={styles.bold}>
                        “{title || 'Título de tesis no especificado'}”
                    </Text>, debidamente refrendados con firma original de los jurados evaluadores, en mérito a la{' '}
                    <Text style={styles.bold}>
                        RESOLUCIÓN N° {deanResolution}-{currentYear}-CFI-UNAMBA
                    </Text>, que aprueba el{' '}
                    <Text style={styles.bold}>Acta de Sustentación de tesis</Text> antes mencionada.
                </Text>
                <Text style={styles.body}>
                    Se expide la presente constancia a solicitud del interesado, a los{' '}
                    <Text style={styles.bold}>01 días del mes de marzo del año dos mil veinticuatro</Text>, en
                    cumplimiento del Artículo N°{' '}
                    <Text style={styles.bold}>{articleNumber} inciso (n) del Reglamento de Grados y Títulos de la UNAMBA</Text>{' '}
                    y para los fines que estime conveniente.
                </Text>

                {/* Footer */}
                <View style={styles.footerText}>
                    <Text>Atentamente,</Text>
                    <Text>C. c.</Text>
                    <Text>Archivo</Text>
                    <Text>REG. N° {registrationNumber}</Text>
                    <View style={styles.hr} />
                    <View style={styles.footerInfo}>
                        <Text>Campus Universitario S/N, Tamburco, Abancay-Apurímac</Text>
                        <Text>Carretera Panamericana Abancay-Cusco Km. 5</Text>
                        <Text>email: unidadinvestigacion@unamba.edu.pe</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PdfEightCN;
