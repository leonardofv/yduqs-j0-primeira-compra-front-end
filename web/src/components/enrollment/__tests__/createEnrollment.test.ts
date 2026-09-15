import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createEnrollment } from '../createEnrollment';
import type { PersonalData } from '../personalDataSchema';

const personalData: PersonalData = {
    fullName: 'Maria da Silva Souza',
    cpf: '529.982.247-25',
    birthDate: '20/05/2000',
    email: 'maria@exemplo.com',
    phone: '(11) 98765-4321',
    graduationYear: 2018,
    acceptedTerms: true,
    whatsappOptIn: false,
};

function jsonResponse(body: unknown, status: number) {
    return new Response(JSON.stringify(body), { status });
}

describe('createEnrollment', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_API_URL', 'http://api.test');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    it('posts digits-only cpf and phone and an ISO birth date to the enrollments endpoint', async () => {
        const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: '1' }, 201));
        vi.stubGlobal('fetch', fetchMock);

        await createEnrollment(personalData);

        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe('http://api.test/enrollments');
        expect(init.method).toBe('POST');
        expect(JSON.parse(init.body)).toEqual({
            ...personalData,
            cpf: '52998224725',
            phone: '11987654321',
            birthDate: '2000-05-20',
        });
    });

    it('throws the api message when the cpf is already registered', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'CPF já cadastrado' }, 409)));

        await expect(createEnrollment(personalData)).rejects.toThrow('CPF já cadastrado');
    });

    it('throws the first validation message when the api rejects the payload', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(jsonResponse({ message: ['E-mail inválido', 'CPF inválido'] }, 400)),
        );

        await expect(createEnrollment(personalData)).rejects.toThrow(new Error('E-mail inválido'));
    });

    it('throws a generic message when the api answers without a json body', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('Bad Gateway', { status: 502 })));

        await expect(createEnrollment(personalData)).rejects.toThrow('Não foi possível enviar seus dados. Tente novamente.');
    });

    it('throws a generic message when the network fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

        await expect(createEnrollment(personalData)).rejects.toThrow('Não foi possível enviar seus dados. Tente novamente.');
    });

    it('does not call the api when its url is not configured', async () => {
        vi.stubEnv('VITE_API_URL', '');
        const fetchMock = vi.fn();
        vi.stubGlobal('fetch', fetchMock);

        await expect(createEnrollment(personalData)).rejects.toThrow('VITE_API_URL is not defined');
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
