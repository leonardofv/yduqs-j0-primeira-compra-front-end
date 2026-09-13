import { Box } from "@mui/material";
import type { ReactNode } from "react";
import Header from "./Header";
import { Outlet } from "react-router";

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