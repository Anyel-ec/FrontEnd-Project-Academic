import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    h1: {
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10,
        marginTop: 2,
        textDecoration: 'underline',
    },
    p: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'justify',
    },
    ul: {
        marginVertical: 10,
        paddingLeft: 20,
    },
    ulLi: {
        fontSize: 11,
        marginBottom: 5,
    },
    // Table Styles
    table: {
        display: 'table',
        width: 'auto',
        alignItems: 'stretch',
        fontSize: 12,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '14%',
        padding: 5,
        fontFamily: 'Times-Bold',
    },

    tableCol: {
        width: '86%',
        padding: 5,
    },
    // End Table Styles
    // Section Styles

    section: {
        marginBottom: 10,
        fontSize: 11,
        textAlign: 'justify',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    underline: {
        textDecoration: 'underline',
    },
    // End Section Styles

})
export default styles; 