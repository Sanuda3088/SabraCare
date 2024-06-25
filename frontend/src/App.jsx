
import DoctorList from "./components/Doctors/DoctorList"
import FaqList from "./components/Faq/FaqList"
import Testimonial from "./components/Testimonial/Testimonial"
import './App.css'
import Header from "./components/Header/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer/Footer"

  {/*import "./index.css";
import Layout from "./layout/Layout";*/}



function App() {
  return (
    <>
      <Header/>
      <Home/>
      <DoctorList/>
      <FaqList/>
      <Testimonial/>
      <Footer/>
      {/*<Layout/>*/}
    </>

  )
}

export default App
