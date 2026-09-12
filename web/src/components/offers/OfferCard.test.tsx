import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test/renderWithTheme';
import { offerWithoutPrice, offerWithPrice } from '../../test/offerFixtures';
import OfferCard from './OfferCard';

describe('OfferCard', () => {
    it('shows the modality and the shift of the offer', () => {
        renderWithTheme(<OfferCard offer={offerWithPrice} onAdvance={vi.fn()} />);

        expect(screen.getByText('Presencial')).toBeInTheDocument();
        expect(screen.getByText('Manhã')).toBeInTheDocument();
    });

    it('omits the shift when the offer has none', () => {
        renderWithTheme(<OfferCard offer={offerWithoutPrice} onAdvance={vi.fn()} />);

        expect(screen.getByText('Digital (EaD)')).toBeInTheDocument();
        expect(screen.queryByText('Manhã')).not.toBeInTheDocument();
    });

    it('strikes through the original price and highlights the discounted one', () => {
        renderWithTheme(<OfferCard offer={offerWithPrice} onAdvance={vi.fn()} />);

        expect(screen.getByText('R$ 4.752,00').tagName).toBe('S');
        expect(screen.getByText('18x')).toBeInTheDocument();
        expect(screen.getByText('R$ 169,95')).toBeInTheDocument();
        expect(screen.getByText('à vista R$ 2.613,60')).toBeInTheDocument();
    });

    it('invites the user to enroll when the offer has no price', () => {
        renderWithTheme(<OfferCard offer={offerWithoutPrice} onAdvance={vi.fn()} />);

        expect(
            screen.getByText('Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!'),
        ).toBeInTheDocument();
        expect(screen.queryByText('18x')).not.toBeInTheDocument();
    });

    it('shows where the campus is', () => {
        renderWithTheme(<OfferCard offer={offerWithPrice} onAdvance={vi.fn()} />);

        expect(screen.getByText(offerWithPrice.campus.name)).toBeInTheDocument();
        expect(screen.getByText(offerWithPrice.campus.address)).toBeInTheDocument();
    });

    it('advances when the user confirms the offer', async () => {
        const onAdvance = vi.fn();
        renderWithTheme(<OfferCard offer={offerWithPrice} onAdvance={onAdvance} />);

        await userEvent.click(screen.getByRole('button', { name: 'Avançar' }));

        expect(onAdvance).toHaveBeenCalledTimes(1);
    });
});
