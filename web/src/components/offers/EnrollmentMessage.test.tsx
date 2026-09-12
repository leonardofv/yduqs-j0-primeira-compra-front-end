import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test/renderWithTheme';
import EnrollmentMessage from './EnrollmentMessage';

const MESSAGE = 'Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!';

describe('EnrollmentMessage', () => {
    it('shows the enrollment call to action', () => {
        renderWithTheme(<EnrollmentMessage />);

        expect(screen.getByText(MESSAGE)).toBeInTheDocument();
    });

    it('shows the same message on the drawer variant', () => {
        renderWithTheme(<EnrollmentMessage variant="drawer" />);

        expect(screen.getByText(MESSAGE)).toBeInTheDocument();
    });

    it('marks the icon as decorative so screen readers skip it', () => {
        const { container } = renderWithTheme(<EnrollmentMessage />);

        expect(container.querySelector('img')).toHaveAttribute('alt', '');
    });
});
