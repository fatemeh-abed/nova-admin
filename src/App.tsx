import { BrowserRouter } from 'react-router-dom';
import AppThemeProvider from './Shared/AppThemeProvider';
import { GlobalStyles } from './Shared/Styles/GlobalStyles';
import AppRoutes from './Routes/AppRoutes';

const App = () => (
  <AppThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppThemeProvider>
);

export default App;
