import SocialSidebar from './components/SocialSidebar';
import Header from './components/HeaderComponent';
import Banner from './components/Banner';
import Gigs from './components/Gigs';
import Info from './components/Info';
import Footer from './components/Footer';
import './components/styles/reset.css';
import './components/styles/global.css';
import './components/styles/App.css';

const App = () => {
  return (
    <div>
      <title>J. Partynen</title>
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
