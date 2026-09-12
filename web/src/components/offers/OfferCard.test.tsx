import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test/renderWithTheme';
import { offerWithoutPrice, offerWithPrice } from '../../test/offerFixtures';
import { OffersProvider } from '../../contexts/offers/OffersProvider';
import OfferCard from './OfferCard';
import type { CourseOffer } from '../../types/offer';

function renderCard(offer: CourseOffer) {
    return renderWithTheme(
        <OffersProvider>
            <OfferCard offer={offer} />
        </OffersProvider>,
    );
}

describe('OfferCard', () => {
    it('shows the modality and the shift of the offer', () => {
        renderCard(offerWithPrice);

        expect(screen.getByText('Presencial')).toBeInTheDocument();
        expect(screen.getByText('Manhã')).toBeInTheDocument();
    });

    it('omits the shift when the offer has none', () => {
        renderCard(offerWithoutPrice);

        expect(screen.getByText('Digital (EaD)')).toBeInTheDocument();
        expect(screen.queryByText('Manhã')).not.toBeInTheDocument();
    });

    it('strikes through the original price and highlights the discounted one', () => {
        renderCard(offerWithPrice);

        expect(screen.getByText('R$ 4.752,00').tagName).toBe('S');
        expect(screen.getByText('18x')).toBeInTheDocument();
        expect(screen.getByText('R$ 169,95')).toBeInTheDocument();
        expect(screen.getByText('à vista R$ 2.613,60')).toBeInTheDocument();
    });

    it('invites the user to enroll when the offer has no price', () => {
        renderCard(offerWithoutPrice);

        expect(
            screen.getByText('Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!'),
        ).toBeInTheDocument();
        expect(screen.queryByText('18x')).not.toBeInTheDocument();
    });

    it('shows where the campus is', () => {
        renderCard(offerWithPrice);

        expect(screen.getByText(offerWithPrice.campus.name)).toBeInTheDocument();
        expect(screen.getByText(offerWithPrice.campus.address)).toBeInTheDocument();
    });
});
