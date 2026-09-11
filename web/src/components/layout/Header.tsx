import Box from '@mui/material/Box';
import estacioLogo from '../../assets/estacio-logo.svg';

const HEADER_HEIGHT = { xs: 64, md: 88 };
const HEADER_PADDING_INLINE = { xs: '16px', md: '88px' };
const LOGO_WIDTH = { xs: 127, md: 159 };
const LOGO_HEIGHT = { xs: 32, md: 40 };

function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: HEADER_HEIGHT,
        px: HEADER_PADDING_INLINE,
        bgcolor: 'common.white',
      }}
    >
      <Box
        component="img"
        src={estacioLogo}
        alt="Estácio"
        sx={{ display: 'block', width: LOGO_WIDTH, height: LOGO_HEIGHT }}
      />
    </Box>
  );
}

export default Header;
