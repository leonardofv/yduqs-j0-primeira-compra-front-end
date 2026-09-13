import { isValidCpf, isValidMobilePhone } from '@brazilian-utils/brazilian-utils';
import { differenceInYears, isValid, parse } from 'date-fns';
import { z } from 'zod';

const parseBirthDate = (value: string) => parse(value, 'dd/MM/yyyy', new Date());

export const personalDataSchema = z.object({
    fullName: z.string().trim()
        .regex(/^[A-Za-zÀ-ÿ'-]+(\s[A-Za-zÀ-ÿ'-]+)+$/, 'Informe nome e sobrenome')
        .refine((name) => name.split(/\s+/).every((part) => part.length >= 2),
        'Preencha o nome sem abreviações'),

    cpf: z.string().refine(isValidCpf, 'CPF inválido'),

    birthDate: z.string()
        .refine((value) => isValid(parseBirthDate(value)), 'Data inválida')
        .refine((value) => differenceInYears(new Date(), parseBirthDate(value)) >= 16,
            'Você precisa ter pelo menos 16 anos'),

    email: z.email('E-mail inválido'),

    phone: z.string().refine(isValidMobilePhone, 'Celular inválido'),

    graduationYear: z.number({ message: 'Selecione o ano de conclusão' }),
    acceptedTerms: z.boolean().refine((accepted) => accepted, 'É necessário aceitar os termos'),
    whatsappOptIn: z.boolean(),
});

export type PersonalData = z.infer<typeof personalDataSchema>;