import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Seo from './Seo';
import StructuredData from './StructuredData';

/** App chrome shared by every route. ScrollRestoration belongs here with the data router. */
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100">
      <Seo />
      <StructuredData />

      <div className="blob-container" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-0">
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}
