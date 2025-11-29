import { lazy, Suspense } from 'react';
import SocialSidebar from './components/sidebar/Sidebar';
import Header from './components/layout/Header';
import Banner from './components/layout/Banner';
import Gigs from './components/gigs/Gigs';
import Info from './components/info/Info';
import Footer from './components/layout/Footer';
import { useModalStore } from '../src/store/modalStore';
import 'shared/styles/reset.css';
import 'shared/styles/global.css';

const SettingsModal = lazy(() => import('./components/modal/SettingsModal'));

const App = () => {
  const { isSettingsOpen, closeSettings } = useModalStore();

  return (
    <div>
      <Header />
      <Banner />
      <Gigs />
      <Info />
      <Footer />
      <SocialSidebar />

      <Suspense fallback={<div>Loading modal...</div>}>
        <SettingsModal open={isSettingsOpen} onClose={closeSettings} />
      </Suspense>
    </div>
  );
};

export default App;
