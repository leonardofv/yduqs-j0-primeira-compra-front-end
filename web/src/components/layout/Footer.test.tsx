import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test/renderWithTheme';
import Footer from './Footer';

describe('Footer', () => {
    it('renders a contentinfo landmark', () => {
        renderWithTheme(<Footer />);

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('shows the Estácio logo', () => {
        renderWithTheme(<Footer />);

        expect(screen.getByRole('img', { name: 'Estácio' })).toBeInTheDocument();
    });

    it('shows how to reach support', () => {
        renderWithTheme(<Footer />);

        expect(screen.getByText('0800 771 5055')).toBeInTheDocument();
        expect(screen.getByText('Precisa de ajuda?')).toBeInTheDocument();
    });

    it('marks the contact icons as decorative so screen readers skip them', () => {
        renderWithTheme(<Footer />);

        // Only the logo carries a description; the phone and WhatsApp icons repeat
        // the label next to them.
        expect(screen.getAllByRole('img')).toHaveLength(1);
    });

    it('shows the legal info in the enrollment variant', () => {
        renderWithTheme(<Footer variant="enrollment" />);

        expect(screen.getByRole('link', { name: 'Política de privacidade' })).toBeInTheDocument();
        expect(screen.getByText('Estácio Brasil - Todos os direitos reservados')).toBeInTheDocument();
    });

    it('keeps the Estácio logo in the enrollment variant', () => {
        renderWithTheme(<Footer variant="enrollment" />);

        // The logo is the only content left on mobile, where the contacts and the
        // legal info are hidden; the breakpoint itself is not testable here.
        expect(screen.getByRole('img', { name: 'Estácio' })).toBeInTheDocument();
    });

    it('keeps the support contacts in the enrollment variant', () => {
        renderWithTheme(<Footer variant="enrollment" />);

        expect(screen.getByText('0800 771 5055')).toBeInTheDocument();
        expect(screen.getByText('Precisa de ajuda?')).toBeInTheDocument();
    });
});
