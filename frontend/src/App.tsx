import SocialSidebar from './components/SocialSidebar';
import Header from './components/Header';
import Banner from './components/Banner';
import Gigs from './components/Gigs';
import Info from './components/Info';
import Footer from './components/Footer';


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
}

export default App;
