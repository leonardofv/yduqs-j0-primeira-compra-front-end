import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { theme } from '../theme/theme';

// Components read colors and typography from the app theme, so tests must
// render them under the same provider used in main.tsx.
export function renderWithTheme(ui: ReactNode) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
