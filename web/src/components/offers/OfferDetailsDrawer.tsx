import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import type { CourseOffer } from './OfferCard';
import closeIcon from '../../assets/close-icon.svg';
import { useState } from "react";
import InstallmentOptions from './InstallmentOptions';

const DRAWER_WIDTH = { xs: '100%', md: '600px' };
const CONTENT_PADDING_INLINE = { xs: '16px', md: '32px' };
const TITLE_ID = 'offer-details-title';

type OfferDetailsDrawerProps = {
    offer: CourseOffer | null;
    open: boolean;
    onClose: () => void;
};

function OfferDetailsDrawer({ offer, open, onClose }: OfferDetailsDrawerProps) {
    const [selectedInstallments, setSelectedInstallments ] = useState(offer?.price?.installments ?? 0);

    if (offer === null) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    role: 'dialog',
                    'aria-labelledby': TITLE_ID,
                    sx: { width: DRAWER_WIDTH, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    px: CONTENT_PADDING_INLINE,
                    pr: '16px',
                    py: { xs: '20px', md: '24px' },
                }}
            >
                <Typography id={TITLE_ID} variant="h1" component="h2" sx={{ fontSize: { xs: '24px', md: '32px' } }}>
                    Mais detalhes
                </Typography>
                <IconButton onClick={onClose} aria-label="Fechar" sx={{ p: '12px' }}>
                    <Box component="img" src={closeIcon} alt="" sx={{ width: '24px', height: '24px' }} />
                </IconButton>
            </Box>

            <Divider />

            <Box 
                sx={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: '24px', md: '32px' }, 
                    px: CONTENT_PADDING_INLINE, 
                    pt: { xs: '16px', md: '24px' } 
                }} 
            >
                {offer.price ? (
                    <InstallmentOptions 
                        price={offer.price}
                        selectedInstallments={selectedInstallments}
                        onSelect={setSelectedInstallments}
                    />
                ) : null}
            </Box>

            <Box sx={{ px: CONTENT_PADDING_INLINE, pt: '24px', pb: { xs: '16px', md: '24px' } }}>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ height: '48px', borderRadius: '8px', fontSize: '16px', fontWeight: 500, lineHeight: '16px' }}
                >
                    Avançar
                </Button>
            </Box>
        </Drawer>
    );
}

export default OfferDetailsDrawer;
