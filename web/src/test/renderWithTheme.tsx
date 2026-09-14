import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { theme } from '../theme/theme';

// Components read colors and typography from the app theme, and some of them
// navigate, so tests must render them under the same providers used in main.tsx.
export function renderWithTheme(ui: ReactNode, initialPath = '/') {
    return render(
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
        </ThemeProvider>,
    );
}
