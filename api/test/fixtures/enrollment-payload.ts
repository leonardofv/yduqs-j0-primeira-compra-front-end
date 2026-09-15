// Calculada a partir da data atual para que as regras de idade mínima e de ano de conclusão continuem valendo com a passagem do tempo.
export function isoDateYearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().slice(0, 10);
}

export const validEnrollmentPayload = {
  fullName: 'Maria da Silva Souza',
  cpf: '52998224725',
  birthDate: isoDateYearsAgo(30),
  email: 'maria@exemplo.com',
  phone: '11987654321',
  graduationYear: new Date().getFullYear() - 5,
  acceptedTerms: true,
  whatsappOptIn: false,
};
