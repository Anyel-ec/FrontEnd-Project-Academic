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
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    return `${day} de ${month} del ${year}`;
};

export const getYear = () => {
    const today = new Date();
    return today.getFullYear();
};

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('es-ES', options);
};
export const getWrittenDateFromInput = (inputDate) => {
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];

    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
};
export const getFullWrittenDateTimeFromInput = (inputDate) => {
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];

    const numbersToWords = {
        0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco',
        6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez', 11: 'once',
        12: 'doce', 13: 'trece', 14: 'catorce', 15: 'quince', 16: 'dieciséis',
        17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve', 20: 'veinte',
        21: 'veintiuno', 22: 'veintidós', 23: 'veintitrés', 24: 'veinticuatro'
    };

    const convertNumberToWords = (number) => {
        return numbersToWords[number] || number.toString();
    };

    const date = new Date(inputDate);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const yearInWords = `dos mil ${convertNumberToWords(year % 100)}`;

    // Obtener hora y minutos en números
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} de ${month} del año ${yearInWords}, siendo las ${hours}:${minutes} horas`;
};