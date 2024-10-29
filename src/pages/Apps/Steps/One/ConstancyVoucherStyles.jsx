import { StyleSheet } from "@react-pdf/renderer";
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
    headerText: {
        fontSize: 7,
        fontStyle: 'italic',
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

export default styles;