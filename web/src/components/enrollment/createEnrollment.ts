import { format } from 'date-fns';
import { parseBirthDate, type PersonalData } from './personalDataSchema';

type ApiErrorBody = { message?: string | string[] };

const onlyDigits = (value: string) => value.replace(/\D/g, '');

function toEnrollmentPayload(personalData: PersonalData) {
  return {
    ...personalData,
    cpf: onlyDigits(personalData.cpf),
    phone: onlyDigits(personalData.phone),
    birthDate: format(parseBirthDate(personalData.birthDate), 'yyyy-MM-dd'),
  };
}

async function readErrorMessage(response: Response): Promise<string> {
  const body: ApiErrorBody | null = await response.json().catch(() => null);
  const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
  return message ?? 'Não foi possível enviar seus dados. Tente novamente.';
}

export async function createEnrollment(personalData: PersonalData): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error('VITE_API_URL is not defined');
  }

  let response: Response;
  
  try {
    response = await fetch(`${apiUrl}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toEnrollmentPayload(personalData)),
    });
  } catch {
    throw new Error('Não foi possível enviar seus dados. Tente novamente.');
  }

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
}