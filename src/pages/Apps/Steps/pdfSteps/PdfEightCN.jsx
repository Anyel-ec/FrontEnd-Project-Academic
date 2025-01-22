import styles from './styles/PdfEightCNStyles';
import Logo from './BannerPdfFive.png';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { getYear, formatNumberWithZero } from '../utils/Dates';

const PdfEightCN = ({ pasting, info }) => {
    const anio = getYear();
    console.log(info);
    const commemorativeText = info?.commemorativeText || '';
    console.log(commemorativeText);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={Logo} />
                    <Text style={styles.underline} Text />
                    <Text style={styles.headerSection}>“{commemorativeText}”</Text>
                    <Text style={[styles.title, styles.bold]}>CONSTANCIA Nº {formatNumberWithZero(pasting?.id)}-{anio}-D. UIFI-UNAMBA</Text>
                </View>
                <Text style={[styles.textMain, { marginBottom: 15 }]}>EL DIRECTOR DE LA UNIDAD DE INVESTIGACIÓN DE LA FACULTAD DE INGENIERÍA DE LA UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURÍMAC.</Text>
                <Text style={[styles.textMain, { marginBottom: 5 }]}>HACE CONSTAR:</Text>
                <Text style={styles.body}>
                    Que, <Text style={styles.bold}>{pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.firstNames}{pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.middleName}{pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.lastName}</Text>, identificada con DNI N°{' '}
                    <Text style={styles.bold}>{pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.dni}</Text>, y con Código N°{' '}
                    <Text style={styles.bold}>{pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.studentCode}</Text>, Bachiller de la Escuela Académico Profesional de{' '}
                    <Text style={styles.bold}>{pasting?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo?.titleReservationStepOne?.student.career.name}</Text>, de la Facultad de Ingeniería de la{' '}
                    <Text style={styles.bold}>Universidad Nacional Micaela Bastidas de Apurímac</Text>,{' '}
                    <Text style={styles.bold}>
                        HA CUMPLIDO CON LA PRESENTACIÓN DE 01 EMPASTADO del informe final de tesis titulado:
                    </Text>{' '}
                    <Text style={styles.bold}>
                        “Modelización del sistema de ventilación mediante el software Ventsim en el pique 8261
                        de la rama pepa oro de Pampamarca , Apurímac-2023”
                    </Text>, debidamente refrendados con firma original de los jurados evaluadores, en mérito a
                    la <Text style={styles.bold}>RESOLUCIÓN N° {formatNumberWithZero(pasting?.deanResolution)}-{anio}-CFI-UNAMBA</Text>, que aprueba el{' '}
                    <Text style={styles.bold}>Acta de Sustentación de tesis</Text> antes mencionada.
                </Text>
                <Text style={styles.body}>
                    Se expide la presente constancia a solicitud del interesado, a los{' '}
                    <Text style={styles.bold}>01 días del mes de marzo del año dos mil veinticuatro</Text>, en
                    cumplimiento del Artículo N°{' '}
                    <Text style={styles.bold}>
                        {pasting?.articleNumber} inciso (n) del Reglamento de Grados y Títulos de la UNAMBA
                    </Text>{' '}
                    y para los fines que estime conveniente.
                </Text>
                <View style={styles.footerText}>
                    <Text>Atentamente,</Text>
                    <Text>C. c.</Text>
                    <Text>Archivo</Text>
                    <Text>REG. N° {formatNumberWithZero(pasting?.registrationNumber)}</Text>
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