import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme.ts'
import CssBaseline  from '@mui/material/CssBaseline'
import { OffersProvider } from './contexts/offers/OffersProvider.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OffersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OffersProvider>
    </ThemeProvider>
  </StrictMode>,
)
