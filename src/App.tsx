import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme/theme';
import { store } from './store';
import { HeaderNav } from './components/Common/HeaderNav';
import { Footer } from './components/Common/Footer';

// Placeholder route containers until page features are built in next tasks
const CatalogPageLazy = React.lazy(() => import('./pages/CatalogPage'));
const MovieDetailPageLazy = React.lazy(() => import('./pages/MovieDetailPage'));
const MyTicketsPageLazy = React.lazy(() => import('./pages/MyTicketsPage'));
const NotFoundPageLazy = React.lazy(() => import('./pages/NotFoundPage'));

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: 'background.default',
            }}
          >
            <HeaderNav />
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
              <React.Suspense fallback={<Box sx={{ minHeight: '60vh' }} />}>
                <Routes>
                  <Route path="/" element={<CatalogPageLazy />} />
                  <Route path="/show/:id" element={<MovieDetailPageLazy />} />
                  <Route path="/my-tickets" element={<MyTicketsPageLazy />} />
                  <Route path="*" element={<NotFoundPageLazy />} />
                </Routes>
              </React.Suspense>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
