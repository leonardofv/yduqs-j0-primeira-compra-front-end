import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test/renderWithTheme';
import Header from './Header';

describe('Header', () => {
    it('renders a banner landmark', () => {
        renderWithTheme(<Header />);

        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('shows the Estácio logo', () => {
        renderWithTheme(<Header />);

        expect(screen.getByRole('img', { name: 'Estácio' })).toBeInTheDocument();
    });
});
