import { describe, expect, it } from 'vitest';
import { clinic } from '../lib/clinic';

describe('Confirmed clinic contact information', () => {
  it('addresses WhatsApp to the supplied number and appointment message', () => {
    const url = new URL(clinic.whatsapp);
    expect(url.pathname).toBe('/5511976931164');
    expect(url.searchParams.get('text')).toBe('Olá, Dra. Mônica! Gostaria de agendar uma consulta.');
  });
  it('keeps the confirmed address in the directions destination', () => {
    expect(new URL(clinic.maps).searchParams.get('query')).toBe('Av. São José, 111 - Centro, Diadema - SP');
  });
  it('uses the confirmed phone and email', () => {
    expect(clinic.phoneHref).toBe('tel:+5511976931164');
    expect(clinic.email).toBe('monica_cristina26@hotmail.com');
  });
});