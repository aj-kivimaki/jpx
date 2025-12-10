import { lazy } from 'react';

import Gigs from './components/gigs/Gigs';
import Banner from './components/layout/Banner';
import Header from './components/layout/Header';

const Info = lazy(() => import('./components/info/Info'));
const Footer = lazy(() => import('./components/layout/Footer'));
const SocialSidebar = lazy(() => import('./components/sidebar/Sidebar'));

const App = () => {
  return (
    <>
      <Header />
      <SocialSidebar />
      <main>
        <Banner />
        <Gigs />
        <Info />
      </main>
      <Footer />
    </>
  );
};

export default App;
