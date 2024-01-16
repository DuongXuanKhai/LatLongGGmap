import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddressParser from './pages/AddressParser';
import Home from './pages/Home';
import LatLong from './pages/LatLong'
import DiaChiComponent from './pages/diachi';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addressAnalysis" element={<AddressParser />} />
          <Route path='/searchAddress' element={<LatLong />} />
          <Route path='/diachi' element={<DiaChiComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
