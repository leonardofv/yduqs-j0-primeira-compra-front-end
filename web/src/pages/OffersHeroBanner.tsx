import { Box, Typography }  from "@mui/material";

function OffersHeroBanner() {
    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                px: { xs: '16px', md: '88px' },
                py: { xs: '24px', md: '40px' },
                bgcolor: 'primary.main',
                color: 'common.white'
            }}
        >
            <Typography variant="h1" sx={{ fontSize: { xs: '24px', md: '32px' } }}>
                Vamos começar, escolha as opções do seu curso
            </Typography>
            <Typography variant="body1">
                Use os filtros para saber o preço do seu curso e fazer sua inscrição.
            </Typography>
        </Box>
    )
}

export default OffersHeroBanner;