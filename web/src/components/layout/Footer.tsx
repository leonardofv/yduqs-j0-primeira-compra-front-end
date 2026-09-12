import { Box, Typography } from "@mui/material";
import estacioLogo from '../../assets/estacio-logo-footer.svg';
import foneIcon from '../../assets/telefone-icon.svg';
import whatsappIcon from '../../assets/whatsapp-icon.svg';

type ContactItemsProps = {
    icon: string;
    label: string;
}

function ContactItem({ icon, label }: ContactItemsProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'common.white',
            }}
        >
            <img src={icon} alt="" />
            <Typography sx={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
                {label}
            </Typography>
        </Box>
    )
}

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: { xs: 64, md: 88 },
                px: { xs: '16px', md: '88px' },
                bgcolor: 'primary.dark',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
            }}
        >
            <Box
                component="img"
                src={estacioLogo}
                alt="Estácio"
                sx={{ display: 'block', width: { xs: 127, md: 159 }, height: { xs: 32, md: 40 } }}
            />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '56px' }}>
                <ContactItem icon={foneIcon} label="0800 771 5055" />
                <ContactItem icon={whatsappIcon} label="Precisa de ajuda?" />
            </Box>
        </Box>
    )
}

export default Footer;