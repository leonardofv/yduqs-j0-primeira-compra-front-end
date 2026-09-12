import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test/renderWithTheme';
import { offerWithoutPrice, offerWithPrice } from '../../test/offerFixtures';
import OfferDetailsDrawer from './OfferDetailsDrawer';

describe('OfferDetailsDrawer', () => {
    it('renders nothing when no offer was selected', () => {
        renderWithTheme(<OfferDetailsDrawer offer={null} open onClose={vi.fn()} />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('stays hidden while closed', () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open={false} onClose={vi.fn()} />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows the details title when open', () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open onClose={vi.fn()} />);

        expect(screen.getByRole('dialog')).toHaveAccessibleName('Mais detalhes');
    });

    it('closes when the user dismisses it', async () => {
        const onClose = vi.fn();
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open onClose={onClose} />);

        await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('preselects the installment plan advertised on the card', () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open onClose={vi.fn()} />);

        expect(screen.getByRole('radio', { name: '18x R$ 169,95' })).toBeChecked();
    });

    it('keeps the plan picked by the user', async () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open onClose={vi.fn()} />);

        await userEvent.click(screen.getByRole('radio', { name: '12x R$ 247,50' }));

        expect(screen.getByRole('radio', { name: '12x R$ 247,50' })).toBeChecked();
        expect(screen.getByRole('radio', { name: '18x R$ 169,95' })).not.toBeChecked();
    });

    it('invites the user to enroll when the offer has no price', () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithoutPrice} open onClose={vi.fn()} />);

        expect(
            screen.getByText('Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!'),
        ).toBeInTheDocument();
        expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    });

    it('lists the expandable detail sections', () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open onClose={vi.fn()} />);

        expect(screen.getByText('Sobre a Bolsa Incentivo')).toBeInTheDocument();
        expect(screen.getByText('Resumo das suas escolhas')).toBeInTheDocument();
    });

    it('offers a way to move forward with the chosen plan', () => {
        renderWithTheme(<OfferDetailsDrawer offer={offerWithPrice} open onClose={vi.fn()} />);

        expect(screen.getByRole('button', { name: 'Avançar' })).toBeInTheDocument();
    });
});
