import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../test/renderWithTheme';
import OffersHeroBanner from './OffersHeroBanner';

describe('OffersHeroBanner', () => {
    it('announces the step as the main heading', () => {
        renderWithTheme(<OffersHeroBanner />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
            'Vamos começar, escolha as opções do seu curso',
        );
    });

    it('explains what the filters are for', () => {
        renderWithTheme(<OffersHeroBanner />);

        expect(
            screen.getByText('Use os filtros para saber o preço do seu curso e fazer sua inscrição.'),
        ).toBeInTheDocument();
    });
});
