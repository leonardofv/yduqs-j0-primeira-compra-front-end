import { Box, Typography } from "@mui/material";
import infoIcon from '../../assets/info-icon.svg';

type EnrollmentMessageProps = {
    variant?: 'card' | 'drawer';
};

const VARIANT_STYLES = {
    card: { gap: '8px', lineHeight: '19px' },
    drawer: { gap: '24px', lineHeight: '24px' },
};

function EnrollmentMessage({ variant = 'card' }: EnrollmentMessageProps) {
    const { gap, lineHeight } = VARIANT_STYLES[variant];
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
            <Box component="img" src={infoIcon} alt="" sx={{ width: '24px', height: '24px' }} />
            <Typography sx={{ fontSize: '14px', lineHeight }}>
                Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
        </Box>
    );
};

export default EnrollmentMessage;