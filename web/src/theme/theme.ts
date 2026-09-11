import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        common: { white: '#FFFFFF' },
        primary: { main: '#144BC8', dark: '#001F66', contrastText: '#FFFFFF' },
        secondary: { main: '#EE325D', contrastText: '#FFFFFF' },
        text: { primary: '#121212', secondary: '#3D3D3D' },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: { 
            fontFamily: 'Montserrat, sans-serif', 
            fontWeight: 500, 
            fontSize: '2rem', 
            lineHeight: 1.2, 
        },
        body1: { letterSpacing: 0 },
        body2: { letterSpacing: 0 },
        button: { textTransform: 'none', letterSpacing: 0 },
    },
});