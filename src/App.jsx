import Box from '@mui/material/Box';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';

const App = () => {
  return (
    <Box>
      <Box className='header-bg-gradient'>
        <Navbar />
        <Header />
        <Transactions />
        <Footer />
      </Box>
    </Box>
  );
};

export default App;
