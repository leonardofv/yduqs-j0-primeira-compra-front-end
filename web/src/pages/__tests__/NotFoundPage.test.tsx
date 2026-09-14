import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithTheme } from '../../test/renderWithTheme';
import App from '../../App';

describe('NotFoundPage', () => {
    it('is rendered for an unknown address', () => {
        renderWithTheme(<App />, '/rota-que-nao-existe');

        expect(screen.getByRole('heading', { name: 'Não encontramos essa página' })).toBeInTheDocument();
    });

    it('keeps the header and footer around the message', () => {
        renderWithTheme(<App />, '/rota-que-nao-existe');

        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('links back to the offers page', () => {
        renderWithTheme(<App />, '/rota-que-nao-existe');

        expect(screen.getByRole('link', { name: 'Ver as opções de curso' })).toHaveAttribute('href', '/');
    });
});