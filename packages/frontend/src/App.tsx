import SocialSidebar from './components/sidebar/SocialSidebar';
import Header from './components/layout/Header';
import Banner from './components/layout/Banner';
import Gigs from './components/gigs/Gigs';
import Info from './components/info/Info';
import Footer from './components/layout/Footer';
import 'shared/styles/reset.css';
import 'shared/styles/global.css';

const App = () => {
  return (
    <div>
      <SocialSidebar />
      <Header />
      <Banner />
      <Gigs />
      <Info />
      <Footer />
    </div>
  );
};

export default App;
