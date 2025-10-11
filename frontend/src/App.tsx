import Header from './components/Header';
import Banner from './components/Banner';
import Gigs from './components/Gigs';
import News from './components/News';
import Contact from './components/Contact';
import Promo from './components/Promo';
import SocialSidebar from './components/SocialSidebar';

function App() {
  return (
    <div>
      <SocialSidebar />
      <Header />
      <Banner />
      <Gigs />
      <News />
      <Promo />
      <Contact />
    </div>
  );
}

export default App;
