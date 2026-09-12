import { Box, Button, Divider, Typography } from "@mui/material";
import EnrollmentMessage from "./EnrollmentMessage";

type InstallmentOption = {
    installments: number;
    installmentValue: string;
    total: string;
};

export type OfferPrice = {
    original: string;
    installments: number;
    installmentValue: string;
    cash: string;
    installmentOptions: InstallmentOption[];
};

export type CourseOffer = {
    id: string;
    modality: string;
    shift?: string;
    price?: OfferPrice;
    campus: { name: string, address: string };
};

function PriceDetails({ price }: { price: OfferPrice }) {
    return (
        <Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '18px', opacity: 0.9, mb: '4px' }}>
                De <s>{price.original}</s> por até
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px' }}>
                    {price.installments}x
                </Typography>
                <Typography sx={{ fontSize: '40px', fontWeight: 600, lineHeight: '46px' }}>
                    {price.installmentValue}
                </Typography>
            </Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '21px', opacity: 0.9 }}>
                à vista {price.cash}
            </Typography>
        </Box>
    );
};

type OfferCardProps = {
    offer: CourseOffer;
    onAdvance: () => void;
}

function OfferCard({ offer, onAdvance }: OfferCardProps) {
    const { modality, shift, price, campus } = offer;

    return (
        <Box
            component="article"
            sx={{
                width: { xs: '100%', md: '376px' },
                border: 1,
                borderColor: 'primary.main',
                borderRadius: '4px',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    px: '16px',
                    py: '8px',
                    bgcolor: 'primary.dark',
                    color: 'common.white',
                }}
            >
                <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px' }}>{modality}</Typography>
                {shift && (
                    <>
                        <Divider orientation="vertical" flexItem sx={{ borderColor: 'common.white' }} />
                        <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px' }}>{shift}</Typography>
                    </>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    px: '16px',
                    pt: '24px',
                    pb: '16px',
                    bgcolor: 'primary.main',
                    color: 'common.white',
                }}
            >
                {price ? <PriceDetails price={price} /> : <EnrollmentMessage />}
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={onAdvance}
                    sx={{
                        height: '48px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '16px',
                    }}
                >
                    Avançar
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: '16px', py: '16px' }}>
                <Typography noWrap sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '19px' }}>
                    {campus.name}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {campus.address}
                </Typography>
            </Box>
        </Box>
    );
}

export default OfferCard;