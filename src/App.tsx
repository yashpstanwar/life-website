import { useEffect, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import { PageId, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { HomePage } from './pages/HomePage';
import { DonatePage } from './pages/DonatePage';
import { DonateSuccessPage, DonateFailurePage } from './pages/DonateSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { TrainingPage } from './pages/TrainingPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useLanguage } from './lib/useLanguage';

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  donate: '/donate',
  'donate-success': '/donate/success',
  'donate-failure': '/donate/failed',
  about: '/about',
  work: '/our-work',
  'programme-detail': '/our-work',
  training: '/training',
  'get-involved': '/get-involved',
  contact: '/contact',
  legal: '/privacy',
};

const PATH_TO_PAGE: Record<string, PageId> = {
  '/': 'home',
  '/donate': 'donate',
  '/about': 'about',
  '/our-work': 'work',
  '/training': 'training',
  '/get-involved': 'get-involved',
  '/contact': 'contact',
  '/privacy': 'legal',
  '/terms': 'legal',
  '/refund-policy': 'legal',
};

function useLegacyNavigate() {
  const navigate = useNavigate();
  return useCallback(
    (page: PageId, extraData?: unknown) => {
      if (page === 'programme-detail' && typeof extraData === 'string') {
        navigate(`/our-work/${extraData}`);
        return;
      }
      if (page === 'donate' && extraData && typeof extraData === 'object') {
        navigate('/donate', { state: { preset: extraData } });
        return;
      }
      navigate(PAGE_PATHS[page] ?? '/');
    },
    [navigate],
  );
}

function ProgrammeDetailRoute({ language }: { language: Language }) {
  const { id } = useParams();
  const onNavigate = useLegacyNavigate();
  return <ProgrammeDetailPage programmeId={id} onNavigate={onNavigate} language={language} />;
}

function DonateRoute({ language }: { language: Language }) {
  const location = useLocation();
  const onNavigate = useLegacyNavigate();
  const preset = (location.state as { preset?: { amount: number; frequency: 'one-time' | 'monthly' } } | null)
    ?.preset;
  return <DonatePage initialPreset={preset} onNavigate={onNavigate} language={language} />;
}

function Layout({ language, onToggleLanguage }: { language: Language; onToggleLanguage: () => void }) {
  const location = useLocation();
  const onNavigate = useLegacyNavigate();
  const activePage =
    PATH_TO_PAGE[location.pathname] ?? (location.pathname.startsWith('/our-work') ? 'work' : 'home');
  const isReceiptPage = location.pathname.startsWith('/donate/');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:top-3 focus:left-3 focus:bg-amber-500 focus:text-slate-950 focus:px-4 focus:py-2 focus:rounded-lg font-bold text-xs"
      >
        Skip to main content
      </a>

      <Header
        activePage={activePage}
        onNavigate={onNavigate}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={onNavigate} language={language} />} />
          <Route path="/donate" element={<DonateRoute language={language} />} />
          <Route path="/donate/success" element={<DonateSuccessPage onNavigate={onNavigate} />} />
          <Route path="/donate/failed" element={<DonateFailurePage onNavigate={onNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={onNavigate} language={language} />} />
          <Route path="/our-work" element={<OurWorkPage onNavigate={onNavigate} language={language} />} />
          <Route path="/our-work/:id" element={<ProgrammeDetailRoute language={language} />} />
          <Route path="/training" element={<TrainingPage onNavigate={onNavigate} language={language} />} />
          <Route path="/get-involved" element={<GetInvolvedPage onNavigate={onNavigate} language={language} />} />
          <Route path="/contact" element={<ContactPage language={language} />} />
          <Route path="/privacy" element={<LegalPage doc="privacy" />} />
          <Route path="/terms" element={<LegalPage doc="terms" />} />
          <Route path="/refund-policy" element={<LegalPage doc="refund" />} />
          <Route path="/transparency" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<NotFoundPage onNavigate={onNavigate} />} />
        </Routes>
      </main>

      {!isReceiptPage && (
        <Footer onNavigate={onNavigate} language={language} onToggleLanguage={onToggleLanguage} />
      )}

      <FloatingMobileBar onNavigate={onNavigate} activePage={activePage} />
    </div>
  );
}

export default function App() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <BrowserRouter>
      <Layout language={language} onToggleLanguage={toggleLanguage} />
    </BrowserRouter>
  );
}
