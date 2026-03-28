import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { AboutPage } from './pages/AboutPage';
import { DictionaryPage } from './pages/DictionaryPage';
import { HomePage } from './pages/HomePage';
import { StylesPage } from './pages/StylesPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#fff3c6_0%,#ffe2b8_30%,#ffd2a8_55%,#f7ede4_100%)] text-zinc-900">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/styles" element={<StylesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
