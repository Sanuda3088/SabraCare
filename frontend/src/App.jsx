
import DoctorList from "./components/Doctors/DoctorList"
import FaqList from "./components/Faq/FaqList"
import Testimonial from "./components/Testimonial/Testimonial"
import './App.css'

import Doctors from "./pages/Doctors/Doctors"
import DoctorDetails from "./pages/Doctors/DoctorDetails"

import Header from "./components/Header/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


  {/*import "./index.css";
import Layout from "./layout/Layout";*/}



function App() {
  return (
    <>

      {/* <DoctorList/>
      <FaqList/>
      <Testimonial/> 
      <Layout/> */}
      {/* <Doctors/>
      <DoctorDetails/> */}

      <Header/>
      <Login/>
      <Signup/>
      <Home/>
      <DoctorList/>
      <FaqList/>
      <Testimonial/>
      <DoctorDetails/>
      <Footer/> 
      {/*<Layout/>*/}

    </>

  )
}

export default App
