import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Navbar/Header";
import Footer from "./components/Navbar/Footer";
import About from "./components/About/About";
import Projects from "./components/Project/Projects";
import Contact from "./components/Contact/Contact";
import Gallery from "./components/Gallery/Gallery";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      {/* Header Component */}
      <ScrollToTop/>
      <Header/>

      {/* Routes Section */}
       <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chethan-jodidhar/about-us" element={<About />} />
          <Route path="/chethan-jodidhar/projects" element={<Projects/>}/>
          <Route path="/chethan-jodidhar/gallery" element={<Gallery/>}/>
          <Route path="/chethan-jodidhar/contact" element={<Contact/>}/>
        </Routes>
      </main> 

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;
