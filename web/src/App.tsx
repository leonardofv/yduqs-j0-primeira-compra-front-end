import Footer from './components/layout/Footer';
import { Route, Routes } from 'react-router';
import OffersPage from './pages/OffersPage';
import PersonalDataPage from './pages/PersonalDataPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
        <Route element={<Layout footer={<Footer />} />}>
            <Route path='/' element={<OffersPage />} />
        </Route>
        <Route element={<Layout footer={<Footer variant="enrollment" />} />}>
            <Route path='/dados-pessoais' element={<PersonalDataPage />} />
        </Route>
    </Routes>
  )
}

export default App;
