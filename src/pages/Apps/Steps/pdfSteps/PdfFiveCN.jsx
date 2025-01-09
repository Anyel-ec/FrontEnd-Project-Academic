import styles from './styles/PdfFiveCNStyles';
import Logo from './BannerPdfFive.png';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { getYear, getWrittenDate, formatNumberWithZero } from '../utils/Dates';

const PdfFiveCN = ({ thesis }) => {
    const anio = getYear();
    const actualData = getWrittenDate();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={Logo} />
                    <Text style={[styles.title, styles.bold]}>CONSTANCIA DE ORIGINALIDAD</Text>
                    <Text style={[styles.textHeader, styles.bold]}>Nº {formatNumberWithZero(thesis?.id)}-{anio}</Text>
                </View>
                <Text style={styles.body}>
                    La Universidad Nacional Micaela Bastidas de Apurímac,
                    a través de la Unidad de Investigación de la Facultad
                    de Ingeniería declara que, la Tesis intitulada
                    <Text style={styles.bold}> “{thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.title}”</Text>,
                    presentado por el <Text style={styles.bold}> Bach. {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.firstNames} {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.middleName}{thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.lastName}</Text>, para
                    optar el Título de <Text style={styles.bold}> {thesis?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo.titleReservationStepOne?.student?.career?.name}; </Text>
                    ha sido sometido a un mecanismo de evaluación y
                    verificación de similitud, a través del Software
                    COMPILATIO Magister, siendo el índice de similitud
                    ACEPTABLE de ({thesis?.aplicationNumber}) por lo que, cumple con los criterios
                    de originalidad establecidos por la Universidad.
                </Text>
                <Text style={styles.footerBody}>Abancay, {actualData}</Text>
                <View style={styles.footerText}>
                    <Text>Atentamente,</Text>
                    <Text>C. c.</Text>
                    <Text>Archivo</Text>
                    <Text>REG. N° {formatNumberWithZero(thesis?.id)}</Text>
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

export default PdfFiveCN;