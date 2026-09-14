import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import estacioLogo from '../../assets/estacio-logo.svg';

function Header() {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: { xs: 64, md: 88 },
                px: { xs: '16px', md: '88px' },
                bgcolor: 'common.white',
            }}
        >
            <Box
                component="img"
                src={estacioLogo}
                alt="Estácio"
                sx={{ display: 'block', width: { xs: 127, md: 159 }, height: { xs: 32, md: 40 } }}
            />
        </Box>
    );
}

function Layout({ footer }: { footer: ReactNode }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            {footer}
        </Box>
    );
}

export default Layout;
