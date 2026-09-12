import { Box, Typography } from "@mui/material";
import infoIcon from '../../assets/info-icon.svg';

const INFO_ICON_SIZE = '24px';

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

export default EnrollmentMessage;