import { Box } from '@mui/material';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import OffersList from './components/offers/OffersList';
import OffersHeroBanner from './pages/OffersHeroBanner';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <OffersHeroBanner />
        <OffersList />
      </Box>
      <Footer />
    </Box>
  )
}

export default App;
