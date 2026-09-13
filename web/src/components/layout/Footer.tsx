import { Box, Divider, Link, Typography } from "@mui/material";
import estacioLogo from '../../assets/estacio-logo-footer.svg';
import foneIcon from '../../assets/telefone-icon.svg';
import whatsappIcon from '../../assets/whatsapp-icon.svg';

type ContactItemsProps = {
    icon: string;
    label: string;
}

type FooterVariant = 'default' | 'enrollment';

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

function ContactList() {
    return (
       <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '56px' }}>
            <ContactItem icon={foneIcon} label="0800 771 5055" />
            <ContactItem icon={whatsappIcon} label="Precisa de ajuda?" />
        </Box> 
    )
}

function LegalInfo() {
    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '16px', color: 'common.white' }}>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '16px', lineHeight: 1.5, opacity: 0.9 }}>
                Política de privacidade
            </Link>
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#FFFFFF66', my: '4px' }} />
            <Typography sx={{ fontSize: '14px', lineHeight: 1.33, opacity: 0.72 }}>
                Estácio Brasil - Todos os direitos reservados
            </Typography>
        </Box>
    );
}

function BrandLogo({ hideOnDesktop = false }: { hideOnDesktop?: boolean }) {
    return (
        <Box
            component="img"
            src={estacioLogo}
            alt="Estácio"
            sx={{
                display: hideOnDesktop ? { xs: 'block', md: 'none' } : 'block',
                width: { xs: 127, md: 159 },
                height: { xs: 32, md: 40 },
            }}
        />
    );
}

function Footer({ variant = 'default' }: { variant?: FooterVariant }) {
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
                backgroundImage: 'linear-gradient(#FFFFFF1F, #FFFFFF1F)'
            }}
        >
            {variant === 'enrollment' ? (
                <>
                    <BrandLogo hideOnDesktop />
                    <ContactList />
                    <LegalInfo />
                </>
            ) : (
                <>
                    <BrandLogo />
                    <ContactList /> 
                </>
            )}
        </Box>
    )
}

export default Footer;