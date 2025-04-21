
import Header from "../components/Header/Header";
import Navigation from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;