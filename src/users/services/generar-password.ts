import { randomBytes } from 'crypto';

export function generarCodigo() {
  const cadenaAleatoria = randomBytes(3).toString('hex').substring(0, 5);
  return cadenaAleatoria.toUpperCase();
}
