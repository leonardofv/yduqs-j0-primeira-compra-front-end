import { Box, Typography } from '@mui/material';
import OfferCard, { type CourseOffer } from './OfferCard';
import { useState } from 'react';
import OfferDetailsDrawer from './OfferDetailsDrawer';

const SECTION_PADDING_INLINE = { xs: '16px', md: '88px' };
const SECTION_PADDING_TOP = { xs: '24px', md: '32px' };
const SECTION_PADDING_BOTTOM = { xs: '24px', md: '56px' };
const CARDS_GAP = '24px';

const OFFERS: CourseOffer[] = [
    {
        id: '1',
        modality: 'Presencial',
        shift: 'Manhã',
        price: { 
            original: 'R$ 4.752,00',
            installments: 18, 
            installmentValue: 'R$ 169,95', 
            cash: 'R$ 2.613,60',
            installmentOptions: [
                { installments: 1, installmentValue: 'R$ 2.613,60', total: 'R$ 2.613,60' },
                { installments: 3, installmentValue: 'R$ 900,90', total: 'R$ 2.702,70' },
                { installments: 6, installmentValue: 'R$ 465,30', total: 'R$ 2.791,80' },
                { installments: 9, installmentValue: 'R$ 320,10', total: 'R$ 2.880,90' },
                { installments: 12, installmentValue: 'R$ 247,50', total: 'R$ 2.946,00' },
                { installments: 15, installmentValue: 'R$ 200,97', total: 'R$ 3.014,55' },
                { installments: 18, installmentValue: 'R$ 169,95', total: 'R$ 3.059,10' },    
            ], 
        },
        campus: {
            name: 'CAMPINAS - VILA INDUSTRIAL',
            address: 'RUA DR. SALES DE OLIVEIRA, Nº 1661 - VILA INDUSTRIAL - CAMPINAS - SP',
        },
    },
    {
        id: '2',
        modality: 'Digital (EaD)',
        campus: {
            name: 'BARRA DA TIJUCA - TOM JOBIM',
            address: 'AV. DAS AMÉRICAS, 4.200, BLOCO 11 - BARRA DA TIJUCA - RIO DE JANEIRO - RJ',
        },
    },
];

function OffersList() {
    const [selectedOffer, setSelectedOffer] = useState<CourseOffer | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    function openDetails(offer: CourseOffer) {
        setSelectedOffer(offer);
        setIsDetailsOpen(true);
    };
    
    function closeDetails() {
        setIsDetailsOpen(false);
    };

    const countLabel = OFFERS.length === 1 ? '1 opção encontrada' : `${OFFERS.length} opções encontradas`;

    return (
        <Box
            component="section"
            sx={{ px: SECTION_PADDING_INLINE, pt: SECTION_PADDING_TOP, pb: SECTION_PADDING_BOTTOM }}
        >
            <Typography sx={{ fontSize: '14px', lineHeight: '19px', display: { xs: 'none', md: 'block' }, mb: '16px' }}>
                {countLabel}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'flex-start' },
                    gap: CARDS_GAP,
                }}
            >
                {OFFERS.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} onAdvance={() => openDetails(offer)} />
                ))}
            </Box>
            <OfferDetailsDrawer 
                key={selectedOffer?.id}
                offer={selectedOffer} 
                open={isDetailsOpen} 
                onClose={closeDetails} 
            />
        </Box>
    );
}

export default OffersList;