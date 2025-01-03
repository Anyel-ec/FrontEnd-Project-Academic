import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { getWrittenDateFromInput, getWrittenDate, getYear } from '../utils/Dates';

const PdfTwo = ({ project }) => {
    console.log(project);
    const anio = getYear();
    const applicationDate = getWrittenDateFromInput("2024-12-01 22:06:49");
    const actualData = getWrittenDate();
    // const project = {
    //     anio: anio,
    //     actualData: actualData,
    //     applicationDate: applicationDate,
    //     id: 123,
    //     title: 'Análisis de Algoritmos en Redes Neuronales',
    //     projectSimilarity: 18,
    //     engineeringFaculty?: {
    //         dni: 123456789,
    //         firstName: "Joel",
    //         middleName: "Jose",
    //         lastName: "Huacan",
    //         carrer: {
    //             name: "Ingeniería de Sistemas",
    //         }
    //     },
    //     asesor: { 
    //         dni: 123456784,
    //         firstName: "Juan",
    //         middleName: "Anyel",
    //         lastName: "Paztos",
    //         carrer: {
    //             name: "Ingeniería de Sistemas",
    //         }
    //     },
    //     coAsesor: {
    //         dni: 123456754,
    //         firstName: "Jerick",
    //         middleName: "Johan",
    //         lastName: "Patiño",
    //         carrer: {
    //             name: "Ingeniería de Sistemas",
    //         }
    //     },
    //     student: {
    //         firstName: 'Juan',
    //         middleName: 'Alberto',
    //         lastName: 'Carlos',
    //         dni: '12345678',
    //         studentCode: '2024001',
    //         career: {
    //             name: 'Ingeniería de Sistemas',
    //         },
    //     },
    // };

    return (
        <PdfBase commemorativeText={false}>
            <Text style={styles?.h1}>
                INFORME Nº {project?.id}-{anio}-D. UIFI-UNAMBA
            </Text>
            <View style={styles?.table}>
                {/* Row 1 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>A</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text> Dr. {`${project?.engineeringFaculty?.firstName} ${project?.engineeringFaculty?.middleName} ${project?.engineeringFaculty?.lastName}`}
                        </Text>
                        <Text>Decano de la Facultad de Ingeniería – UNAMBA</Text>
                    </View>
                </View>

                {/* Row 2 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>ASUNTO</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text>
                            <Text style={styles?.bold}> Remito expediente para aprobación de Proyecto de Tesis.</Text>
                        </Text>
                    </View>
                </View>

                {/* Row 3 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>REF.</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text> SOLICITUD de
                            <Text>{applicationDate}</Text>
                            <Text style={styles?.bold}>                                            Reg. N° 080</Text>
                        </Text>
                        <Text>Anexo 4 (Docente Asesor)</Text>
                    </View>
                </View>

                {/* Row 4 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>FECHA</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text>
                            <Text> {actualData}</Text>
                        </Text>
                    </View>
                </View>
                <Text>------------------------------------------------------------------------------------------------------------------------------------</Text>
            </View>
            <View style={styles?.section}>
                <Text>
                    Por intermedio del presente, me dirijo a usted, para informarle que,
                    <Text style={[styles?.bold, styles?.redText]}> {`${project?.titleReservationStepOne?.student?.firstName} ${project?.titleReservationStepOne?.student?.middleName} `}</Text>
                    {project?.titleReservationStepOne?.student?.lastName} identificada con DNI N° <Text style={styles?.bold}>{project?.titleReservationStepOne?.student?.dni}</Text> y con código de matrícula N°
                    <Text style={styles?.bold}> {project?.titleReservationStepOne?.student?.studentCode}</Text> Bachiller de la
                    <Text style={styles?.bold}> E.A.P. de {project?.titleReservationStepOne?.student?.career.name}</Text> y Sistemas de la Facultad de Ingeniería, ha presentado el proyecto de tesis titulada:{' '}
                    <Text style={styles?.bold}>
                        {project?.title}
                    </Text>
                    ; cuyo asesor es el <Text style={styles?.bold}>{`${project?.asesor?.firstName} ${project?.asesor?.middleName} ${project?.asesor?.lastName}`} y</Text>; Co Asesor
                    <Text style={[styles?.bold, styles?.blueText]}> {`${project?.asesor?.firstName} ${project?.coAsesor?.middleName} ${project?.coAsesor?.lastName}`}</Text>, en cumplimiento con los requisitos exigidos para la
                    <Text style={styles?.bold}> aprobación del proyecto de tesis</Text> según reglamento de investigación UNAMBA (Artículos
                    <Text style={styles?.bold}> 5, 7, 17, 24 y 27</Text>), adjunto los antecedentes que detallo a continuación:
                </Text>
            </View>
            <View style={styles?.ul}>
                <Text style={styles?.ulLi}>
                    1.	Solicitud de aprobación de proyecto de tesis
                </Text>
                <Text style={styles?.ulLi}>
                    2.	Anexo 4 (Informe de asesoría según reglamento de investigación)
                </Text>
                <Text style={styles?.ulLi}>
                    3.	Constancia de filtro de similitud y reporte de Software COMPILATIO magister
                </Text>
                <Text style={styles?.ulLi}>
                    4.	Ejemplar de proyecto de tesis en físico.
                </Text>
                <Text style={styles?.ulLi}>
                    5.	Constancias de haber aprobado Metodología de investigación.
                </Text>
                <Text style={styles?.ulLi}>
                    6.	Pagos de S/.20.00 por concepto de revisión y aprobación de proyecto de tesis
                </Text>
                <Text style={styles?.ulLi}>
                    7.	CTI Vitae de CONCYTEC de Asesor.
                </Text>
            </View>
            <View style={styles?.section}>
                <Text>
                    En concordancia a los artículos 17, 24 y 27 del Reglamento de Investigación UNAMBA vigente, la Dirección
                    de la Unidad de Investigación de la Facultad de Ingeniería
                    <Text style={[styles?.bold, styles?.underline]}>
                        cumple con elevar el presente informe para la
                        formalización y aprobación del presente proyecto de tesis mediante acto resolutivo.
                    </Text>
                    Indicando que el
                    interesado a partir de la aprobación del proyecto, tiene un plazo máximo de un año para la ejecución
                    del proyecto de tesis, pudiendo ampliarse por seis meses, previa justificación del Asesor.

                </Text>
            </View>
            <View style={styles?.section}>
                <Text>
                    Es todo cuanto tengo que informarle para su conocimiento y fines pertinentes.
                </Text>
            </View>
        </PdfBase>
    );
};

export default PdfTwo;
