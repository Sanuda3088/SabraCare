 // eslint-disable-next-line no-unused-vars
 import React from 'react';
 import Header from '../components/Header/Header';
 import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';
import SessionWarning from '../components/SessionWarning/SessionWarning';


 const Layout = () => {
   return (
     <>
      <Header/>
      <main>
        <Routers/>  
      </main>
      <Footer/>
      <SessionWarning />
     </>
   )
 }
 
 export default Layout