import { Box } from "@mui/material";
import PersonalDataForm from "../components/enrollment/PersonalDataForm";
import PageHero from "../components/layout/PageHero";

function PersonalDataPage() {
    return (
        <>
            <PageHero 
                title="Queremos saber um pouco mais sobre você"
            />
            <Box sx={{ px: {xs:'16px', md:'88px'}, pt: { xs: '24px', md: '32px' }, pb: { xs: '40px', md: '56px' } }}>
                <PersonalDataForm />
            </Box>
        </>
    )
}

export default PersonalDataPage;