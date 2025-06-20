import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Join } from '../features/auth/pages/Join';

export const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};
