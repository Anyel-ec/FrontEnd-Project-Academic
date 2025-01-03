import { StyleSheet } from '@react-pdf/renderer';

// REGISTRO DE FUENTES
const styles = StyleSheet.create({
    page: {
        fontSize: 10,
    },
    container: {
        margin: '0 auto',
        backgroundColor: 'white',
        fontFamily: 'Times-Roman',
        padding: '20px 80px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
    },
    headerSection: {
        fontSize: 10,
        marginBottom: 10,
    },
    banner: {
        width: '65vw',
        margin: '0 auto',
        height: 'auto',
    },
    footerText: {
        fontSize: 8,
        position: 'absolute',
        bottom: -100,
        paddingHorizontal: 80,
        left: 0,
        right: 0,
        fontFamily: 'Times-Bold'
    },
    headerText: {
        fontSize: 7,
        fontStyle: 'italic',
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottom: '2.5pt solid #000',
    },
    footerInfo: {
        textAlign: 'right',
        fontSize: 10,
        marginTop: 10,
    },
});

export default styles;
