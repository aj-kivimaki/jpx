import SocialSidebar from './components/sidebar/Sidebar';
import Header from './components/layout/Header';
import Banner from './components/layout/Banner';
import Gigs from './components/gigs/Gigs';
import Info from './components/info/Info';
import Footer from './components/layout/Footer';
import '@jpx/shared/styles/reset.css';
import '@jpx/shared/styles/global.css';

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
