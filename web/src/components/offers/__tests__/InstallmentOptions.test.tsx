import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../test/renderWithTheme';
import { priceFixture } from '../../../test/offerFixtures';
import InstallmentOptions from '../InstallmentOptions';

function renderOptions(selectedInstallments = priceFixture.installments) {
    const onSelect = vi.fn();

    renderWithTheme(
        <InstallmentOptions
            price={priceFixture}
            selectedInstallments={selectedInstallments}
            onSelect={onSelect}
        />,
    );

    return { onSelect };
}

describe('InstallmentOptions', () => {
    it('asks which installment plan the user prefers', () => {
        renderOptions();

        expect(screen.getByText('Qual dessas opções de parcelas você prefere?')).toBeInTheDocument();
    });

    it('renders one option per installment plan, labelled by count and value', () => {
        renderOptions();

        expect(screen.getAllByRole('radio')).toHaveLength(priceFixture.installmentOptions.length);
        expect(screen.getByRole('radio', { name: '1x R$ 2.613,60' })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: '12x R$ 247,50' })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: '18x R$ 169,95' })).toBeInTheDocument();
    });

    it('shows the total paid for each installment plan', () => {
        renderOptions();

        expect(screen.getByText('R$ 2.946,00')).toBeInTheDocument();
        expect(screen.getByText('R$ 3.059,10')).toBeInTheDocument();
    });

    it('checks the currently selected plan', () => {
        renderOptions(12);

        expect(screen.getByRole('radio', { name: '12x R$ 247,50' })).toBeChecked();
        expect(screen.getByRole('radio', { name: '18x R$ 169,95' })).not.toBeChecked();
    });

    it('reports the chosen plan as a number', async () => {
        const { onSelect } = renderOptions();

        await userEvent.click(screen.getByRole('radio', { name: '1x R$ 2.613,60' }));

        expect(onSelect).toHaveBeenCalledWith(1);
    });

    it('does not report a selection until the user picks one', () => {
        const { onSelect } = renderOptions();

        expect(onSelect).not.toHaveBeenCalled();
    });
});
