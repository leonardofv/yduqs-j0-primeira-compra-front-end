import { Box, Typography } from "@mui/material";
import estacioLogo from '../../assets/estacio-logo-footer.svg';
import foneIcon from '../../assets/telefone-icon.svg';
import whatsappIcon from '../../assets/whatsapp-icon.svg';

const FOOTER_HEIGHT = { xs: 64, md: 88 };
const FOOTER_PADDING_INLINE = { xs: '16px', md: '88px' };
const FOOTER_OVERLAY = 'rgba(255, 255, 255, 0.12)';
const LOGO_WIDTH = { xs: 127, md: 159 };
const LOGO_HEIGHT = { xs: 32, md: 40 };
const CONTACTS_GAP = '56px';
const PHONE_NUMBER = '0800 771 5055';

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
                height: FOOTER_HEIGHT,
                px: FOOTER_PADDING_INLINE,
                bgcolor: 'primary.dark',
                backgroundImage: `linear-gradient(${FOOTER_OVERLAY}, ${FOOTER_OVERLAY})`,
            }}
        >
            <Box
                component="img"
                src={estacioLogo}
                alt="Estácio"
                sx={{ display: 'block', width: LOGO_WIDTH, height: LOGO_HEIGHT }}
            />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: CONTACTS_GAP }}>
                <ContactItem icon={foneIcon} label={PHONE_NUMBER} />
                <ContactItem icon={whatsappIcon} label="Precisa de ajuda?" />
            </Box>
        </Box>
    )
}

export default Footer;