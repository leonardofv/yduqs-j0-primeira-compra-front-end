import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test/renderWithTheme';
import OfferDetailsDrawer, { type OfferDetailsDrawerProps } from './OfferDetailsDrawer';
import { offerWithoutPrice, offerWithPrice } from '../../test/offerFixtures';

function renderDrawer(props: Partial<OfferDetailsDrawerProps> = {}) {
    return renderWithTheme(
        <OfferDetailsDrawer
            offer={offerWithPrice}
            open
            onClose={vi.fn()}
            selectedInstallments={18}
            onSelectInstallments={vi.fn()}
            {...props}
        />,
    );
}

describe('OfferDetailsDrawer', () => {
    it('renders nothing when no offer was selected', () => {
        renderDrawer({ offer: null });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('stays hidden while closed', () => {
        renderDrawer({ open: false });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows the details title when open', () => {
        renderDrawer();

        expect(screen.getByRole('dialog')).toHaveAccessibleName('Mais detalhes');
    });

    it('closes when the user dismisses it', async () => {
        const onClose = vi.fn();
        renderDrawer({ onClose });

        await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('preselects the installment plan advertised on the card', () => {
        renderDrawer();

        expect(screen.getByRole('radio', { name: '18x R$ 169,95' })).toBeChecked();
    });

    it('reports the plan picked by the user', async () => {
        const onSelectInstallments = vi.fn();
        renderDrawer({ onSelectInstallments });

        await userEvent.click(screen.getByRole('radio', { name: '12x R$ 247,50' }));

        expect(onSelectInstallments).toHaveBeenCalledWith(12);
    });

    it('invites the user to enroll when the offer has no price', () => {
        renderDrawer({ offer: offerWithoutPrice });

        expect(
            screen.getByText('Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!'),
        ).toBeInTheDocument();
        expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    });

    it('lists the expandable detail sections', () => {
        renderDrawer();

        expect(screen.getByText('Sobre a Bolsa Incentivo')).toBeInTheDocument();
        expect(screen.getByText('Resumo das suas escolhas')).toBeInTheDocument();
    });

    it('offers a way to move forward with the chosen plan', () => {
        renderDrawer();

        expect(screen.getByRole('button', { name: 'Avançar' })).toBeInTheDocument();
    });
});
