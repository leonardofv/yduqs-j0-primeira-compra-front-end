import { Box, Button, Divider, Typography } from "@mui/material";
import infoIcon from '../../assets/info-icon.svg';

type OfferPrice = {
    original: string;
    installments: number;
    installmentValue: string;
    cash: string;
};

export type CourseOffer = {
    id: string;
    modality: string;
    shift?: string;
    price?: OfferPrice;
    campus: { name: string, address: string };
};

const CARD_WIDTH = { xs: '100%', md: '376px' };
const CARD_RADIUS = '4px';
const CARD_PADDING_INLINE = '16px';
const BUTTON_HEIGHT = '48px';
const BUTTON_RADIUS = '8px';
const PRICE_FONT_SIZE = '40px';
const INFO_ICON_SIZE = '24px';
const ADDRESS_MAX_LINES = 2;
const HEADER_TEXT_STYLE = { fontSize: '16px', fontWeight: 500, lineHeight: '22px' };

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
                <Typography sx={{ fontSize: PRICE_FONT_SIZE, fontWeight: 600, lineHeight: '46px' }}>
                    {price.installmentValue}
                </Typography>
            </Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '21px', opacity: 0.9 }}>
                à vista {price.cash}
            </Typography>
        </Box>
    );
};

function EnrollmentMessage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box component="img" src={infoIcon} alt="" sx={{ width: INFO_ICON_SIZE, height: INFO_ICON_SIZE }} />
            <Typography sx={{ fontSize: '14px', lineHeight: '19px' }}>
                Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
        </Box>
    );
};

function OfferCard({ offer }: { offer: CourseOffer }) {
    const { modality, shift, price, campus } = offer;

    return (
        <Box
            component="article"
            sx={{
                width: CARD_WIDTH,
                border: 1,
                borderColor: 'primary.main',
                borderRadius: CARD_RADIUS,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    px: CARD_PADDING_INLINE,
                    py: '8px',
                    bgcolor: 'primary.dark',
                    color: 'common.white',
                }}
            >
                <Typography sx={HEADER_TEXT_STYLE}>{modality}</Typography>
                {shift && (
                    <>
                        <Divider orientation="vertical" flexItem sx={{ borderColor: 'common.white' }} />
                        <Typography sx={HEADER_TEXT_STYLE}>{shift}</Typography>
                    </>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    px: CARD_PADDING_INLINE,
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
                    sx={{
                        height: BUTTON_HEIGHT,
                        borderRadius: BUTTON_RADIUS,
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '16px',
                    }}
                >
                    Avançar
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: CARD_PADDING_INLINE, py: '16px' }}>
                <Typography noWrap sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '19px' }}>
                    {campus.name}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitLineClamp: ADDRESS_MAX_LINES,
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