import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Newsletter from './Newsletter';

const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/destinations': 'Destinations',
  '/stays': 'Winter Stays',
  '/beach-houses': 'Beach Houses',
  '/stays/beach-houses': 'Beach Houses',
  '/experiences': 'Experiences',
  '/offers': 'Offers',
  '/list-property': 'List Property',
};

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update document title dynamically: Winterers | <Page Name>
    if (routeTitles[pathname]) {
      document.title = `Winterers | ${routeTitles[pathname]}`;
    } else if (pathname.startsWith('/stays/')) {
      document.title = 'Winterers | Property Detail';
    } else {
      document.title = 'Winterers';
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
