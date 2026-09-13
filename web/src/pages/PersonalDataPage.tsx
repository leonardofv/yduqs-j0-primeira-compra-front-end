import { Box, Typography } from "@mui/material";
import PersonalDataForm from "../components/enrollment/PersonalDataForm";

function PersonalDataPage() {
    return (
        <>
            <Box component="section" sx={{ px: { xs:'16px', md:'88px' }, py: {xs:'24px', md:'40px'}, bgcolor: 'primary.main', color: 'common.white' }}
            >
                <Typography variant="h1" sx={{ fontSize: { xs: '24px', md: '32px' } }}>
                    Queremos saber um pouco mais sobre você
                </Typography>
            </Box>
            <Box sx={{ px: {xs:'16px', md:'88px'}, pt: { xs: '24px', md: '32px' }, pb: { xs: '40px', md: '56px' } }}>
                <PersonalDataForm />
            </Box>
        </>
    )
}

export default PersonalDataPage;