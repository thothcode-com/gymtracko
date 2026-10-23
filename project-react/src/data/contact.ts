const WHATSAPP_NUMBER = '5491125015698';
const JOBS_MESSAGE = 'Hola, quiero trabajar con GYMTRACKO.';
const RADIOGRAFIA_MESSAGE = 'Hola, quiero hacer una radiografía gratis de mi gimnasio.';

export const RADIOGRAFIA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RADIOGRAFIA_MESSAGE)}`;
export const JOBS_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(JOBS_MESSAGE)}`;
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const RADIOGRAFIA_LABEL = 'Hacé una radiografía gratis de tu gimnasio';
