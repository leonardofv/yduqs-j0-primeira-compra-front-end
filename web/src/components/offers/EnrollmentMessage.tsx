import { Box, Typography } from "@mui/material";
import infoIcon from '../../assets/info-icon.svg';

function EnrollmentMessage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box component="img" src={infoIcon} alt="" sx={{ width: '24px', height: '24px' }} />
            <Typography sx={{ fontSize: '14px', lineHeight: '19px' }}>
                Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
        </Box>
    );
};

export default EnrollmentMessage;