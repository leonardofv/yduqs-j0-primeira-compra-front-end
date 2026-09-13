import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithTheme } from '../../test/renderWithTheme';
import PersonalDataForm from './PersonalDataForm';

// Built from the current date so the minimum age rule keeps holding as time passes.
function birthDateYearsAgo(years: number): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function submitButton() {
    return screen.getByRole('button', { name: 'Avançar' });
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText('Nome completo'), 'Maria da Silva Souza');
    await user.type(screen.getByLabelText('CPF'), '52998224725');
    await user.type(screen.getByLabelText('Data de nascimento'), birthDateYearsAgo(30).replace(/\D/g, ''));
    await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com');
    await user.type(screen.getByLabelText('Celular para contato'), '11987654321');

    await user.click(screen.getByLabelText('Ano de conclusão do ensino médio'));
    await user.click(screen.getByRole('option', { name: String(new Date().getFullYear() - 5) }));
}

describe('PersonalDataForm', () => {
    it('keeps the submit button disabled while the form is empty', () => {
        renderWithTheme(<PersonalDataForm />);

        expect(submitButton()).toBeDisabled();
    });

    it('enables the submit button once every field is valid and the terms are accepted', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        await fillValidForm(user);
        await user.click(screen.getByRole('checkbox', { name: /Li e concordo com os termos do edital/ }));

        await waitFor(() => expect(submitButton()).toBeEnabled());
    });

    it('keeps the submit button disabled when the terms are not accepted', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        await fillValidForm(user);

        await waitFor(() => expect(screen.queryByText('CPF inválido')).not.toBeInTheDocument());
        expect(submitButton()).toBeDisabled();
    });

    it('does not require the WhatsApp opt-in', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        await fillValidForm(user);
        await user.click(screen.getByRole('checkbox', { name: /Li e concordo com os termos do edital/ }));

        expect(screen.getByRole('checkbox', { name: /WhatsApp/ })).not.toBeChecked();
        await waitFor(() => expect(submitButton()).toBeEnabled());
    });

    it('reports an invalid CPF once the field is left', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        await user.type(screen.getByLabelText('CPF'), '123');
        await user.tab();

        expect(await screen.findByText('CPF inválido')).toBeInTheDocument();
    });

    it('rejects a name written with abbreviations', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        await user.type(screen.getByLabelText('Nome completo'), 'Maria S Souza');
        await user.tab();

        expect(await screen.findByText('Preencha o nome sem abreviações')).toBeInTheDocument();
    });

    it('rejects someone younger than the minimum age', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        await user.type(
            screen.getByLabelText('Data de nascimento'),
            birthDateYearsAgo(10).replace(/\D/g, ''),
        );
        await user.tab();

        expect(await screen.findByText('Você precisa ter pelo menos 16 anos')).toBeInTheDocument();
    });

    it('masks the phone number as it is typed', async () => {
        const user = userEvent.setup();
        renderWithTheme(<PersonalDataForm />);

        const phone = screen.getByLabelText('Celular para contato');
        await user.type(phone, '11987654321');

        expect(phone).toHaveValue('(11) 98765-4321');
    });
});
