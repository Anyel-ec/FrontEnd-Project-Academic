import PdfBase from './PdfBase';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles/PdfTwoStyles';
import { getWrittenDate, getYear, formatNumberWithZero } from '../utils/Dates';

const PdfTwo = ({ project, info }) => {
    const deanName = info?.deanName;
    const anio = getYear();
    const actualData = getWrittenDate();
    return (
        <PdfBase commemorativeText={false}>
            <Text style={styles?.h1}>
                INFORME Nº {formatNumberWithZero(project?.id)}-{anio}-D. UIFI-UNAMBA
            </Text>
            <View style={styles?.table}>
                {/* Row 1 */}
                <View style={styles?.tableRow}>
                    <Text style={styles?.tableColHeader}>A</Text>
                    <View style={styles?.tableCol}>
                        <Text>
                            <Text style={styles?.bold}>:</Text> {deanName}
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
                            <Text>{getWrittenDate(project.referenceDate)}</Text>
                            <Text style={styles?.bold}>                                    Reg. N° {formatNumberWithZero(project.registrationNumber)}</Text>
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
                            <Text>Abancay, {actualData}</Text>
                        </Text>
                    </View>
                </View>
                <Text>-------------------------------------------------------------------------------------------------------------</Text>
            </View>

            {/* Sección condicional para uno o dos estudiantes */}
            {project?.titleReservationStepOne?.studentTwo ? (
                // Formato para dos estudiantes
                <View style={styles?.section}>
                    <Text>
                        Por intermedio del presente, me dirijo a usted, para informarle que,
                        <Text style={styles?.bold}>
                            {` ${project?.titleReservationStepOne?.student?.firstNames} ${project?.titleReservationStepOne?.student?.middleName} ${project?.titleReservationStepOne?.student?.lastName}`}
                        </Text>{' '}
                        identificado con DNI N°{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.student?.dni}</Text> y con código de matrícula N°{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.student?.studentCode}</Text>, junto con{' '}
                        <Text style={styles?.bold}>
                            {`${project?.titleReservationStepOne?.studentTwo?.firstNames} ${project?.titleReservationStepOne?.studentTwo?.middleName} ${project?.titleReservationStepOne?.studentTwo?.lastName}`}
                        </Text>{' '}
                        identificado con DNI N°{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.studentTwo?.dni}</Text> y con código de matrícula N°{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.studentTwo?.studentCode}</Text> Bachilleres de la
                        <Text style={styles?.bold}>
                            {' '}
                            E.A.P. de {project?.titleReservationStepOne?.student?.career.name}
                        </Text>{' '}
                        de la Facultad de Ingeniería, han presentado el proyecto de tesis titulado:{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.title}</Text>; cuyo asesor es el{' '}
                        <Text style={styles?.bold}>
                            {`${project?.adviser?.firstNames} ${project?.adviser?.middleName} ${project?.adviser?.lastName}`}
                        </Text>{' '}
                        y Co asesor{' '}
                        <Text style={[styles?.bold, styles?.blueText]}>
                            {`${project?.coadviser?.firstNames} ${project?.coadviser?.middleName} ${project?.coadviser?.lastName}`}
                        </Text>
                        , en cumplimiento con los requisitos exigidos para la
                        <Text style={styles?.bold}> aprobación del proyecto de tesis</Text> según reglamento de investigación UNAMBA (Artículos
                        <Text style={styles?.bold}> 5, 7, 17, 24 y 27</Text>), adjunto los antecedentes que detallo a continuación:
                    </Text>
                </View>
            ) : (
                // Formato para un estudiante
                <View style={styles?.section}>
                    <Text>
                        Por intermedio del presente, me dirijo a usted, para informarle que,
                        <Text style={styles?.bold}>
                            {` ${project?.titleReservationStepOne?.student?.firstNames} ${project?.titleReservationStepOne?.student?.middleName} ${project?.titleReservationStepOne?.student?.lastName}`}
                        </Text>{' '}
                        identificado con DNI N°{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.student?.dni}</Text> y con código de matrícula N°{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.student?.studentCode}</Text>, Bachiller de la
                        <Text style={styles?.bold}>
                            {' '}
                            E.A.P. de {project?.titleReservationStepOne?.student?.career.name}
                        </Text>{' '}
                        de la Facultad de Ingeniería, ha presentado el proyecto de tesis titulado:{' '}
                        <Text style={styles?.bold}>{project?.titleReservationStepOne?.title}</Text>; cuyo asesor es el{' '}
                        <Text style={styles?.bold}>
                            {`${project?.adviser?.firstNames} ${project?.adviser?.middleName} ${project?.adviser?.lastName}`}
                        </Text>{' '}
                        y Co asesor{' '}
                        <Text style={[styles?.bold, styles?.blueText]}>
                            {`${project?.coadviser?.firstNames} ${project?.coadviser?.middleName} ${project?.coadviser?.lastName}`}
                        </Text>
                        , en cumplimiento con los requisitos exigidos para la
                        <Text style={styles?.bold}> aprobación del proyecto de tesis</Text> según reglamento de investigación UNAMBA (Artículos
                        <Text style={styles?.bold}> 5, 7, 17, 24 y 27</Text>), adjunto los antecedentes que detallo a continuación:
                    </Text>
                </View>
            )}

            {/* Resto del contenido permanece igual */}
            <View style={styles?.ul}>
                <Text style={styles?.ulLi}>1. Solicitud de aprobación de proyecto de tesis</Text>
                <Text style={styles?.ulLi}>2. Anexo 4 (Informe de asesoría según reglamento de investigación)</Text>
                <Text style={styles?.ulLi}>3. Constancia de filtro de similitud y reporte de Software COMPILATIO magister</Text>
                <Text style={styles?.ulLi}>4. Ejemplar de proyecto de tesis en físico.</Text>
                <Text style={styles?.ulLi}>5. Constancias de haber aprobado Metodología de investigación.</Text>
                <Text style={styles?.ulLi}>6. Pagos de S/.20.00 por concepto de revisión y aprobación de proyecto de tesis</Text>
                <Text style={styles?.ulLi}>7. CTI Vitae de CONCYTEC de Asesor.</Text>
            </View>
            <View style={styles?.section}>
                <Text>
                    En concordancia a los artículos 17, 24 y 27 del Reglamento de Investigación UNAMBA vigente, la Dirección
                    de la Unidad de Investigación de la Facultad de Ingeniería{' '}
                    <Text style={styles?.underline}>
                        cumple con elevar el presente informe para la
                        formalización y aprobación del presente proyecto de tesis mediante acto resolutivo.
                    </Text>{' '}
                    Indicando que el interesado a partir de la aprobación del proyecto, tiene un plazo máximo de un año para la ejecución
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
