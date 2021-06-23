import i18next from 'i18next';
import {eng} from './en';
import {esp} from './es';

i18next.init({
    interpolacion: {
        escapeValue: false,
    },
    lng: 'es',
    resources: {
        es: {
            translation: esp,
        },
        en: {
            traslation: eng,
        },
    },
});

export default i18next;