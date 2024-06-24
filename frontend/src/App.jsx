
import DoctorList from "./components/Doctors/DoctorList"
import FaqList from "./components/Faq/FaqList"
import Testimonial from "./components/Testimonial/Testimonial"
import './App.css'
import Header from "./components/Header/Header"

  {/*import "./index.css";
import Layout from "./layout/Layout";*/}



function App() {
  return (
    <>
      <Header/>
      <DoctorList/>
      <FaqList/>
      <Testimonial/>
      {/*<Layout/>*/}
    </>

  )
}

export default App
