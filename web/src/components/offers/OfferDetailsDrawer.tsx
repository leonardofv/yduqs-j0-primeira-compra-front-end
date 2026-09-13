import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import closeIcon from '../../assets/close-icon.svg';
import InstallmentOptions from './InstallmentOptions';
import EnrollmentMessage from "./EnrollmentMessage";
import plusIcon from '../../assets/plus-icon.svg';
import { useOffers } from "../../contexts/offers/OffersContext";
import { useNavigate } from "react-router";

function SectionRow({ title }: { title: string }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                px: '16px',
                py: '16px',
                border: 1,
                borderColor: 'divider',
                borderRadius: '4px',
            }}
        >
            <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.15 }}>{title}</Typography>
            <Box sx={{ display: 'flex', flexShrink: 0, width: '24px', height: '24px', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="img" src={plusIcon} alt="" sx={{ width: '16px', height: '16px' }} />
            </Box>
        </Box>
    );
}

function OfferDetailsDrawer() {

    const { selectedOffer, isDetailsOpen, closeDetails, selectedInstallments, selectInstallments } = useOffers();
    const navigate = useNavigate();

    if (selectedOffer === null) return null;

    return (
        <Drawer
            anchor="right"
            open={isDetailsOpen}
            onClose={closeDetails}
            slotProps={{
                paper: {
                    role: 'dialog',
                    'aria-labelledby': 'offer-details-title',
                    sx: { width: { xs: '100%', md: '600px' }, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    pl: { xs: '16px', md: '32px' },
                    pr: '16px',
                    py: { xs: '20px', md: '24px' },
                }}
            >
                <Typography id="offer-details-title" variant="h1" component="h2" sx={{ fontSize: { xs: '24px', md: '32px' } }}>
                    Mais detalhes
                </Typography>
                <IconButton onClick={closeDetails} aria-label="Fechar" sx={{ p: '8px' }}>
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
                    px: { xs: '16px', md: '32px' }, 
                    pt: { xs: '16px', md: '24px' } 
                }} 
            >
                {selectedOffer.price ? (
                    <InstallmentOptions 
                        price={selectedOffer.price}
                        selectedInstallments={selectedInstallments}
                        onSelect={selectInstallments}
                    />
                ) : (
                   <Box
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'common.white',
                            px: { xs: '16px', md: '32px' },
                            py: '24px',
                            mx: { xs: '-16px', md: '-32px' },
                            mt: { xs: '-16px', md: '-24px' },
                        }}
                    >
                        <EnrollmentMessage variant="drawer" />
                    </Box> 
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <SectionRow title="Sobre a Bolsa Incentivo" />
                    <SectionRow title="Resumo das suas escolhas" />
              </Box>
            </Box>

            <Box sx={{ px: { xs: '16px', md: '32px' }, py: { xs: '16px', md: '24px' } }}>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => { closeDetails(); navigate('/dados-pessoais'); }}
                >
                    Avançar
                </Button>
            </Box>
        </Drawer>
    );
}

export default OfferDetailsDrawer;
