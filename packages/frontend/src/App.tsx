import SocialSidebar from './components/sidebar/Sidebar';
import SettingsModal from './components/modal/SettingsModal';
import Header from './components/layout/Header';
import Banner from './components/layout/Banner';
import Gigs from './components/gigs/Gigs';
import Info from './components/info/Info';
import Footer from './components/layout/Footer';
import { useModalStore } from '../src/store/modalStore';
import 'shared/styles/reset.css';
import 'shared/styles/global.css';

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
      <SettingsModal open={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
};

export default App;
