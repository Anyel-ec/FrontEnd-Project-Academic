// Estilos para Modo Claro
export const lightModeStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#F7F9FC',
        color: '#333',
        borderColor: '#D1D5DB',
        padding: '0rem 0.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '0.475rem',
        '&:hover': {
            borderColor: '#A0AEC0',
        },
        '&:focus-within': {
            outline: 'none',
            borderColor: '#3182CE',
            boxShadow: '0 0 0 2px rgba(49, 130, 206, 0.5)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#3182CE' : '#F7F9FC',
        color: state.isSelected ? '#fff' : '#2D3748',
        padding: '0 0.5em 0 0.5rem',
        fontSize: '0.875rem',
        '&:hover': {
            backgroundColor: '#63B3ED',
            color: '#fff',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#2D3748',
        fontSize: '0.875rem',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#F7F9FC',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#E2E8F0',
        padding: '0',
        marginTop: '1px',
        marginBottom: '0',
        overflow: 'hidden',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#A0AEC0',
        fontSize: '0.875rem',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#718096',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
    }),
};

// Estilos para Modo Oscuro
export const darkModeStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#121E32',
        color: '#798099',
        borderColor: '#17263C',
        padding: '0rem 0.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '0.475rem',
        '&:hover': {},
        '&:focus-within': {
            outline: 'none',
            borderColor: '#243778',
            boxShadow: '0 0 0 2px rgba(18, 30, 50, 0.5)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#1967D2' : '#121E32',
        color: state.isSelected ? '#fff' : '#888E8D',
        padding: '0 0.5em 0 0.5rem',
        fontSize: '0.875rem',
        '&:hover': {
            backgroundColor: '#1967D2',
            color: '#fff',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#888E8D',
        fontSize: '0.875rem',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#121E32',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#fff',
        padding: '0',
        marginTop: '1px',
        marginBottom: '0',
        overflow: 'hidden',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#646B7A',
        fontSize: '0.875rem',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#5F6675',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
    }),
};
// Función para manejar los modos (claro/oscuro)
export const HandleMode = (isDarkMode) => {
    return isDarkMode ? darkModeStyles : lightModeStyles;
};