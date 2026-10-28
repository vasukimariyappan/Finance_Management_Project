import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import CustomerDataForm from './Component/CustomerDataForm'


function App() {
  return(
    <>
  <CustomerDataForm />
    <h1>Customer data</h1>
  </>
  );
}

export default App;