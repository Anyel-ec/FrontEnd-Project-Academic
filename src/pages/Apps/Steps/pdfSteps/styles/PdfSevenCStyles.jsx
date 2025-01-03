import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    h1: {

        fontSize: 14,
        marginTop: 12,
        textDecoration: 'underline',
        fontFamily: 'Times-Bold'
    },
    textHeader: {
        textAlign: 'right',
        fontSize: 12,
    },
    textTableHeader: {
        fontSize: 14,
    },
    // Section Styles
    underline: {
        textDecoration: 'underline',
    },
    section: {
        fontSize: 12,
        textAlign: 'justify',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    firm: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50,
        width: 130,
    },
    // End Section Styles
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
        width: '45%',
        padding: 1,
    },

    tableCol: {
        width: '55%',
        padding: 1
    },
    // End Table Styles

    // SemiTable Styles
    semiTable: {
        display: 'table',
        width: 'auto',
        alignItems: 'stretch',
        fontSize: 12,
    },
    semiTableRow: {
        flexDirection: 'row',
    },
    semiTableColHeader: {
        width: '11%',
        padding: 1,
    },

    semiTableCol: {
        width: '89%',
        padding: 1
    },
    // End semiTable Styles
})
export default styles;