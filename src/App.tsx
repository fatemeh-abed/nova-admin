import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './Shared/GlobalStyles';
import AppRoutes from './Routes/AppRoutes';

const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
