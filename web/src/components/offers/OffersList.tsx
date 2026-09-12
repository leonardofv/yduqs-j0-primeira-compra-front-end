import { Box, Typography } from '@mui/material';
import OfferDetailsDrawer from './OfferDetailsDrawer';
import OfferCard from './OfferCard';
import { useOffers } from '../../contexts/offers/OffersContext';

function OffersList() {

    const { offers } = useOffers();
    const countLabel = offers.length === 1 ? '1 opção encontrada' : `${offers.length} opções encontradas`;

    return (
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
    );
}

export default OffersList;