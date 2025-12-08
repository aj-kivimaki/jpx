import Header from './components/layout/Header';
import Banner from './components/layout/Banner';
import Gigs from './components/gigs/Gigs';
import '@jpx/shared/styles/reset.css';
import '@jpx/shared/styles/global.css';
import { lazy } from 'react';

const Info = lazy(() => import('./components/info/Info'));
const Footer = lazy(() => import('./components/layout/Footer'));
const SocialSidebar = lazy(() => import('./components/sidebar/Sidebar'));

const App = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Gigs />
      <Info />
      <Footer />
      <SocialSidebar />
    </div>
  );
};

export default App;
