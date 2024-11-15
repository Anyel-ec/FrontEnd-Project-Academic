export const numberALetters = (num) => {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['', '', 'veinti', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const cientos = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (num === 100) return 'cien';
    if (num < 10) return unidades[num];
    if (num < 20) return especiales[num - 10];
    if (num < 30) return num === 20 ? 'veinte' : `veinti${unidades[num % 10]}`;
    if (num < 100) return `${decenas[Math.floor(num / 10)]} y ${unidades[num % 10]}`.trim();
    if (num < 1000) return `${cientos[Math.floor(num / 100)]} ${numberALetters(num % 100)}`.trim();
    return '';
};

export const getWrittenDate = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][fecha.getMonth()];
    const año = `dos mil ${numberALetters(fecha.getFullYear() % 100)}`;

    return `a los ${dia} días del mes de ${mes} del año ${año}`;
};
export const getYear = () => {
    return new Date().getFullYear();
};
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('es-ES', options);
};
