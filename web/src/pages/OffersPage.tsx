import { Box, Typography } from "@mui/material";
import PageHero from "../components/layout/PageHero";
import { useOffers } from "../contexts/offers/OffersContext";
import OfferCard from "../components/offers/OfferCard";
import OfferDetailsDrawer from "../components/offers/OfferDetailsDrawer";

function OffersPage() {
    const { offers } = useOffers();
    const countLabel = offers.length === 1 ? '1 opção encontrada' : `${offers.length} opções encontradas`;

    return (
        <>
            <PageHero 
                title="Vamos começar, escolha as opções do seu curso" 
                subtitle="Use os filtros para saber o preço do seu curso e fazer sua inscrição." 
            />
            <Box
                component="section"
                sx={{ px: { xs: '16px', md: '88px' }, pt: { xs: '24px', md: '32px' }, pb: { xs: '24px', md: '56px' } }}
            >
                <Typography sx={{ fontSize: '14px', lineHeight: '19px', display: { xs: 'none', md: 'block' }, mb: '16px' }}>
                    {countLabel}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { md: 'flex-start' },
                        gap: '24px',
                    }}
                >
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </Box>
                <OfferDetailsDrawer />
            </Box>
        </>
    )
}

export default OffersPage;