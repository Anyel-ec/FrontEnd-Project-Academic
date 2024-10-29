import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import Logo from './BANNER.png';

const styles = StyleSheet.create({
    container: {
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '20px 40px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    headerSection: {
        marginBottom: 10,
    },
    banner: {
        width: '100%',
        height: 'auto',
    },
    h1: {
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10,
        textDecoration: 'underline',
    },
    p: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'justify',
    },
    footerText: {
        fontSize: 14,
    },
    ul: {
        marginVertical: 10,
        paddingLeft: 20,
    },
    ulLi: {
        fontSize: 12,
        marginBottom: 5,
    },
    footer: {
        marginTop: 40,
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottom: '1px solid #000',
    },
    footerInfo: {
        textAlign: 'right',
        fontSize: 10,
        marginTop: 10,
    },
});

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
                    Que, el Bach. {reservation.student.firstNames}  {reservation.student.lastName}, identificada con DNI N°
                    {reservation.student.dni} y Código de estudiante N° {reservation.student.studentCode} y {reservation.studentTwo.firstNames}  {reservation.studentTwo.lastName}, identificada con DNI N°
                    {reservation.studentTwo.dni} y Código de estudiante N° de la Escuela Académico Profesional de {reservation.studentTwo?.career?.name} de la Facultad de Ingeniería, presentaron el
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

// ConstancyVoucher.propTypes = {
//   reservation: PropTypes.object.isRequired, // o el tipo que corresponda
//   };
export default ConstancyVoucher;
