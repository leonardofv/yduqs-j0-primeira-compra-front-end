import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../test/renderWithTheme';
import PageHero from '../PageHero';

const TITLE = 'Vamos começar, escolha as opções do seu curso';
const SUBTITLE = 'Use os filtros para saber o preço do seu curso e fazer sua inscrição.';

describe('PageHero', () => {
    it('announces the title as the main heading', () => {
        renderWithTheme(<PageHero title={TITLE} />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(TITLE);
    });

    it('shows the subtitle when one is given', () => {
        renderWithTheme(<PageHero title={TITLE} subtitle={SUBTITLE} />);

        expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
    });

    it('shows only the heading when there is no subtitle', () => {
        renderWithTheme(<PageHero title={TITLE} />);

        expect(screen.queryByText(SUBTITLE)).not.toBeInTheDocument();
    });
});
