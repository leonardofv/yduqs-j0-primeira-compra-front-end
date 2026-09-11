import { Box, Typography }  from "@mui/material";

const BANNER_PADDING_INLINE = { xs: '16px', md: '88px' };
const BANNER_PADDING_BLOCK = { xs: '24px', md: '40px' };
const TEXT_GAP = '8px';
const TITLE_FONT_SIZE = { xs: '24px', md: '32px' };

function OffersHeroBanner() {
    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: TEXT_GAP,
                px: BANNER_PADDING_INLINE,
                py: BANNER_PADDING_BLOCK,
                bgcolor: 'primary.main',
                color: 'common.white'
            }}
        >
            <Typography variant="h1" sx={{ fontSize: TITLE_FONT_SIZE }}>
                Vamos começar, escolha as opções do seu curso
            </Typography>
            <Typography variant="body1">
                Use os filtros para saber o preço do seu curso e fazer sua inscrição.
            </Typography>
        </Box>
    )
}

export default OffersHeroBanner;