import { randomBytes } from 'crypto';
/**
 * Generar un nombre aleatorio con la estrategia de bytes aleatorios de crypto
 *
 * @private
 * @param {number} [bytes=8] - Cantidad de bytes
 * @returns {string} - Nombre aleatorio
 */
export const randomCode= (bytes = 4): string => {
  return randomBytes(bytes).toString('hex');
};

/**
 * Formatea las partes del nombre de un objeto dado, convirtiendo el nombre y apellido
 * a formato de título (capitalizando la primera letra de cada palabra).
 *
 * @template T - Un tipo que extiende de `NameParts`, asegurando que el objeto tenga
 * propiedades opcionales `firstname` y `lastname`.
 * @param {T} value - El objeto que contiene las partes del nombre a formatear.
 * @returns {T} - El mismo objeto recibido, pero con las propiedades `firstname` y
 * `lastname` formateadas si estaban presentes.
 */
export const getFullname = <T extends NameParts>(value: T): string => {
  value.firstname = titleCase(`${value?.firstname || ''}`);
  value.lastname = titleCase(`${value?.lastname || ''}`);

  return titleCase(`${value?.firstname || ''} ${value?.lastname || ''}`);
};

/**
 * Convierte una cadena de texto al formato de título, capitalizando la primera
 * letra de cada palabra y asegurando que el resto esté en minúsculas.
 *
 * @param {string} value - La cadena de texto a formatear.
 * @returns {string} - La cadena formateada en formato de título.
 */
export const titleCase = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

type NameParts = { firstname: string; lastname: string };
