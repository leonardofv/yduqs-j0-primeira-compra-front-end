import { describe, expect, it } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test/renderWithTheme';
import { OffersProvider } from '../../contexts/offers/OffersProvider';
import { useOffers } from '../../contexts/offers/OffersContext';
import OfferDetailsDrawer from './OfferDetailsDrawer';
import { offerWithoutPrice, offerWithPrice } from '../../test/offerFixtures';
import type { CourseOffer } from '../../types/offer';

function renderDrawer(offer: CourseOffer) {
    function Harness() {
        const { openDetails } = useOffers();

        return (
            <>
                <button onClick={() => openDetails(offer)}>abrir detalhes</button>
                <OfferDetailsDrawer />
            </>
        );
    }

    return renderWithTheme(
        <OffersProvider>
            <Harness />
        </OffersProvider>,
    );
}

async function openDrawer(offer: CourseOffer) {
    renderDrawer(offer);
    await userEvent.click(screen.getByRole('button', { name: 'abrir detalhes' }));

    return screen.getByRole('dialog');
}

describe('OfferDetailsDrawer', () => {
    it('renders nothing until an offer is opened', () => {
        renderDrawer(offerWithPrice);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows the details title when open', async () => {
        const drawer = await openDrawer(offerWithPrice);

        expect(drawer).toHaveAccessibleName('Mais detalhes');
    });

    it('hides itself when the user dismisses it', async () => {
        const drawer = await openDrawer(offerWithPrice);

        await userEvent.click(within(drawer).getByRole('button', { name: 'Fechar' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('preselects the installment plan advertised on the card', async () => {
        const drawer = await openDrawer(offerWithPrice);

        expect(within(drawer).getByRole('radio', { name: '18x R$ 169,95' })).toBeChecked();
    });

    it('keeps the plan picked by the user', async () => {
        const drawer = await openDrawer(offerWithPrice);

        await userEvent.click(within(drawer).getByRole('radio', { name: '12x R$ 247,50' }));

        expect(within(drawer).getByRole('radio', { name: '12x R$ 247,50' })).toBeChecked();
        expect(within(drawer).getByRole('radio', { name: '18x R$ 169,95' })).not.toBeChecked();
    });

    it('invites the user to enroll when the offer has no price', async () => {
        const drawer = await openDrawer(offerWithoutPrice);

        expect(
            within(drawer).getByText('Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!'),
        ).toBeInTheDocument();
        expect(within(drawer).queryByRole('radio')).not.toBeInTheDocument();
    });

    it('lists the expandable detail sections', async () => {
        const drawer = await openDrawer(offerWithPrice);

        expect(within(drawer).getByText('Sobre a Bolsa Incentivo')).toBeInTheDocument();
        expect(within(drawer).getByText('Resumo das suas escolhas')).toBeInTheDocument();
    });

    it('offers a way to move forward with the chosen plan', async () => {
        const drawer = await openDrawer(offerWithPrice);

        expect(within(drawer).getByRole('button', { name: 'Avançar' })).toBeInTheDocument();
    });
});
