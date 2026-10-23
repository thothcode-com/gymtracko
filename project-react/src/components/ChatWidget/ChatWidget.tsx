import { useEffect, useRef, useState } from 'react';
import type { SubmitEvent } from 'react';
import styles from './ChatWidget.module.css';

interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

interface Rule {
  keywords: string[];
  reply: string;
}

const GREETING =
  '¡Hola! 👋 Soy el asistente virtual de GYMTRACKO. Preguntame sobre precios, funcionalidades o cómo hacer una radiografía gratis de tu gimnasio.';

const FALLBACK =
  'Todavía estoy aprendiendo y no tengo una respuesta exacta para eso. Escribinos por WhatsApp o a soporte@gymtracko.com y nuestro equipo resuelve cualquier duda puntual.';

const RULES: Rule[] = [
  {
    keywords: ['precio', 'precios', 'costo', 'cuesta', 'plan', 'planes', 'pagar'],
    reply:
      'Nuestros planes se adaptan al tamaño de tu negocio. Escribinos por WhatsApp y nuestro equipo te arma una propuesta a medida.',
  },
  {
    keywords: ['radiografia', 'diagnostico', 'gratis', 'analisis'],
    reply:
      'La radiografía es gratuita: analizamos los datos de asistencia, bajas e ingresos de tu gimnasio y te mostramos dónde perdés socios. Pedila por WhatsApp.',
  },
  {
    keywords: ['funciona', 'funcionalidad', 'funcionalidades', 'feature', 'app', 'aplicacion', 'aplicación'],
    reply:
      'GYMTRACKO incluye app para alumnos, panel de administración, control de asistencia, FitCoins y mucho más. ¿Querés conocer más detalles de alguna?',
  },
  {
    keywords: ['contacto', 'whatsapp', 'telefono', 'teléfono', 'email', 'correo', 'hablar'],
    reply: 'Podés escribirnos por WhatsApp o a soporte@gymtracko.com. Atendemos de lunes a viernes de 8 a 22 hs.',
  },
  {
    keywords: ['hola', 'buenas', 'hey', 'buenos dias', 'buenos días', 'buenas tardes'],
    reply: '¡Hola! ¿En qué te puedo ayudar hoy?',
  },
  {
    keywords: ['gracias'],
    reply: '¡De nada! Cualquier otra duda, acá estoy 💪',
  },
];

function findReply(input: string): { text: string } {
  const normalized = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

  for (const rule of RULES) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return { text: rule.reply };
    }
  }
  return { text: FALLBACK };
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, from: 'bot', text: GREETING }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function pushMessage(message: Omit<ChatMessage, 'id'>) {
    setMessages((prev) => [...prev, { ...message, id: nextId.current++ }]);
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isTyping) return;

    pushMessage({ from: 'user', text });
    setInputValue('');
    setIsTyping(true);

    const { text: replyText } = findReply(text);
    window.setTimeout(() => {
      setIsTyping(false);
      pushMessage({ from: 'bot', text: replyText });
    }, 650);
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls="chat-widget-panel"
        aria-label={isOpen ? 'Cerrar chat de ayuda' : 'Abrir chat de ayuda'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5h16v11H8l-4 4V5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        id="chat-widget-panel"
        className={`${styles.panel} ${isOpen ? styles['panel--open'] : ''}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby="chat-widget-title"
        hidden={!isOpen}
      >
        <div className={styles.header}>
          <div className={styles.headerAvatar} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#FF5C1A" strokeWidth="1.5" />
              <path d="M8 13c1.2 1.4 2.6 2 4 2s2.8-.6 4-2" stroke="#FF5C1A" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="10" r="1" fill="#FF5C1A" />
              <circle cx="15" cy="10" r="1" fill="#FF5C1A" />
            </svg>
          </div>
          <div>
            <h3 id="chat-widget-title">Asistente GYMTRACKO</h3>
            <p className={styles.headerStatus}>En línea</p>
          </div>
        </div>

        <div className={styles.log} ref={logRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[`message--${message.from}`]}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.message} ${styles['message--bot']}`} aria-hidden="true">
              <span className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          )}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="chat-widget-input" className={styles.srOnly}>
            Escribe tu mensaje
          </label>
          <input
            ref={inputRef}
            id="chat-widget-input"
            type="text"
            placeholder="Escribí tu pregunta..."
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className={styles.send} aria-label="Enviar mensaje" disabled={!inputValue.trim()}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12l16-7-6 7 6 7-16-7z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
