// Convierte un número a su representación en letras (hasta 999)
// Ejemplo: numberALetters(123) => "ciento veintitrés"
export const numberALetters = (num) => {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['', '', 'veinti', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const cientos = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (typeof num !== 'number' || num < 0 || num >= 1000) {
        return 'Número fuera de rango o inválido';
    }
    if (num === 100) return 'cien';
    if (num < 10) return unidades[num];
    if (num < 20) return especiales[num - 10];
    if (num < 30) return num === 20 ? 'veinte' : `veinti${unidades[num % 10]}`;
    if (num < 100) return `${decenas[Math.floor(num / 10)]} y ${unidades[num % 10]}`.trim();
    if (num < 1000) return `${cientos[Math.floor(num / 100)]} ${numberALetters(num % 100)}`.trim();

    return 'Número fuera de rango';
};

// Obtiene la fecha actual en formato "1 de enero de 2025"
// Ejemplo: getWrittenDate() => "5 de enero del 2025"
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

// Obtiene solo el año actual
// Ejemplo: getYear() => 2025
export const getYear = () => new Date().getFullYear();

// Formatea una fecha en cadena (ej. ISO) al formato dd/mm/yyyy hh:mm
// Ejemplo: formatDate("2025-01-05T16:38:42.000+00:00") => "05/01/2025 16:38"
export const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    try {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    } catch {
        return 'Fecha inválida';
    }
};

// Convierte una fecha en formato ISO al formato "1 de enero de 2025"
// Ejemplo: getWrittenDateFromInput("2025-01-05") => "5 de enero del 2025"
export const getWrittenDateFromInput = (inputDate) => {
    if (!inputDate) return 'Fecha no disponible';
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    try {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} de ${month} del ${year}`;
    } catch {
        return 'Fecha inválida';
    }
};

// Convierte una fecha y hora completa al formato extendido con texto
// Ejemplo: getFullWrittenDateTimeFromInput("2025-01-05T16:38:42.000+00:00")
//          => "5 de enero del año dos mil veinticinco, siendo las 16:38 horas"
export const getFullWrittenDateTimeFromInput = (inputDate) => {
    if (!inputDate) return 'Fecha no disponible';

    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const numbersToWords = {
        0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco',
        6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez', 11: 'once',
        12: 'doce', 13: 'trece', 14: 'catorce', 15: 'quince', 16: 'dieciséis',
        17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve', 20: 'veinte',
        21: 'veintiuno', 22: 'veintidós', 23: 'veintitrés', 24: 'veinticuatro',
        25: 'veinticinco', 26: 'veintiséis', 27: 'veintisiete', 28: 'veintiocho',
        29: 'veintinueve', 30: 'treinta', 31: 'treinta y uno', 32: 'treinta y dos',
        33: 'treinta y tres', 34: 'treinta y cuatro', 35: 'treinta y cinco',
        36: 'treinta y seis', 37: 'treinta y siete', 38: 'treinta y ocho',
    };

    const date = new Date(inputDate);

    try {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const yearInWords = `dos mil ${numbersToWords[year % 100] || year % 100}`;
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} de ${month} del año ${yearInWords}, siendo las ${hours}:${minutes} horas`;
    } catch {
        return 'Fecha inválida';
    }
};

// Formatea un número al formato 3 dígitos con ceros a la izquierda (ej. "001")
// Ejemplo: formatNumberWithZero(7) => "007"
export const formatNumberWithZero = (number) => {
    if (typeof number !== 'number') return 'Número inválido';
    return number.toString().padStart(3, '0');
};

// Convierte una fecha en formato ISO a yyyy-mm-dd
// Ejemplo: formatISODateToSimpleDate("2025-01-05T16:38:42.000+00:00") => "2025-01-05"
export const formatISODateToSimpleDate = (isoDate) => {
    if (!isoDate) return 'Fecha no disponible';

    try {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
        const day = date.getDate().toString().padStart(2, '0'); // Día con dos dígitos

        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Fecha inválida';
    }
};
