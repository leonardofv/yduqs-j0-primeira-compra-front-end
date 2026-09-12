import Box from '@mui/material/Box';
import estacioLogo from '../../assets/estacio-logo.svg';

function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: { xs: 64, md: 88 },
        px: { xs: '16px', md: '88px' },
        bgcolor: 'common.white',
      }}
    >
      <Box
        component="img"
        src={estacioLogo}
        alt="Estácio"
        sx={{ display: 'block', width: { xs: 127, md: 159 }, height: { xs: 32, md: 40 } }}
      />
    </Box>
  );
}

export default Header;
