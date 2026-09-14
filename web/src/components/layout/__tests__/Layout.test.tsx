import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderWithTheme } from '../../../test/renderWithTheme';
import Layout from '../Layout';

function renderLayout() {
    return renderWithTheme(<Layout footer={<footer>rodapé da página</footer>} />);
}

describe('Layout', () => {
    it('renders a banner landmark', () => {
        renderLayout();

        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('shows the Estácio logo in the banner', () => {
        renderLayout();

        expect(
            within(screen.getByRole('banner')).getByRole('img', { name: 'Estácio' }),
        ).toBeInTheDocument();
    });

    it('renders a main landmark for the page content', () => {
        renderLayout();

        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders the footer it was given', () => {
        renderLayout();

        expect(screen.getByText('rodapé da página')).toBeInTheDocument();
    });
});
