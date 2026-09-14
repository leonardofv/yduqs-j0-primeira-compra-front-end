import { Box, Typography } from "@mui/material";

type PageHeroProps = {
    title: string;
    subtitle?: string;
};

function PageHero({ title, subtitle }: PageHeroProps) {
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
                {title}
            </Typography>
            {subtitle && <Typography variant="body1">{subtitle}</Typography>}
        </Box>
    )
}

export default PageHero;