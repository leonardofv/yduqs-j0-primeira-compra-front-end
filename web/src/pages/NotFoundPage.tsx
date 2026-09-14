import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import PageHero from "../components/layout/PageHero";

function NotFoundPage() {
    return (
        <>
            <PageHero
                title="Não encontramos essa página"
                subtitle="O endereço pode ter mudado ou não existe mais."
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '24px',
                    px: { xs: '16px', md: '88px' },
                    pt: { xs: '24px', md: '32px' },
                    pb: { xs: '40px', md: '56px' },
                }}
            >
                <Typography sx={{ fontSize: '16px', lineHeight: 1.5 }}>
                    Confira o endereço digitado ou volte para escolher as opções do seu curso.
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary" sx={{ px: '24px' }}>
                    Ver as opções de curso
                </Button>
            </Box>
        </>
    )
}

export default NotFoundPage;