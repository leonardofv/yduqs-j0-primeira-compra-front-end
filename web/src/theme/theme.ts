import { createTheme } from "@mui/material/styles";

const { breakpoints } = createTheme();

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
            fontSize: '24px', 
            lineHeight: 1.2, 
            letterSpacing: 0,
            [breakpoints.up('md')]: { fontSize: '32px' },
        },
        body1: { letterSpacing: 0 },
        body2: { letterSpacing: 0 },
        caption: { letterSpacing: 0 },
        button: { textTransform: 'none', letterSpacing: 0 },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: { color: '#6C6C6C' }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: { color: '#545454', lineHeight: '16px' },
                contained: { marginLeft: '12px', marginRight: '12px' }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: { height: '48px', borderRadius: '8px', fontSize: '16px', fontWeight: 500, lineHeight: '16px' },
            },
        }
    }
});
