export const handleApiErrors = (error) => {
    if (error.response) {
        return {
            ok: false,
            message: error.response.data.message || 'Error desconocido del servidor',
        };
    } else if (error.request) {
        return {
            ok: false,
            message: 'No se recibió respuesta del servidor. Intenta de nuevo más tarde.',
        };
    } else {
        return {
            ok: false,
            message: 'Ocurrió un error inesperado. Intenta de nuevo más tarde.',
        };
    }
};