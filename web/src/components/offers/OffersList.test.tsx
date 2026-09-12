import { describe, expect, it } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test/renderWithTheme';
import OffersList from './OffersList';

const ENROLLMENT_MESSAGE = 'Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!';

async function advanceOnCard(index: number) {
    const cards = screen.getAllByRole('article');
    await userEvent.click(within(cards[index]).getByRole('button', { name: 'Avançar' }));

    return screen.getByRole('dialog');
}

describe('OffersList', () => {
    it('tells how many offers were found', () => {
        renderWithTheme(<OffersList />);

        expect(screen.getByText('2 opções encontradas')).toBeInTheDocument();
    });

    it('renders one card per offer', () => {
        renderWithTheme(<OffersList />);

        expect(screen.getAllByRole('article')).toHaveLength(2);
    });

    it('keeps the details drawer closed until an offer is chosen', () => {
        renderWithTheme(<OffersList />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens the details of the offer the user advanced on', async () => {
        renderWithTheme(<OffersList />);

        const drawer = await advanceOnCard(0);

        expect(within(drawer).getByRole('radio', { name: '18x R$ 169,95' })).toBeChecked();
    });

    it('opens the enrollment message for an offer without price', async () => {
        renderWithTheme(<OffersList />);

        const drawer = await advanceOnCard(1);

        expect(within(drawer).getByText(ENROLLMENT_MESSAGE)).toBeInTheDocument();
        expect(within(drawer).queryByRole('radio')).not.toBeInTheDocument();
    });

    it('closes the details drawer when dismissed', async () => {
        renderWithTheme(<OffersList />);
        const drawer = await advanceOnCard(0);

        await userEvent.click(within(drawer).getByRole('button', { name: 'Fechar' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });
});
