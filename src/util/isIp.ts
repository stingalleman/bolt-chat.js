import { isIP as netIsIp } from 'net';

/**
 * Check if IP is valid.
 *
 * @param ip IP to check.
 */
export function isIP(ip: string): boolean {
  return netIsIp(ip) !== 0;
}
