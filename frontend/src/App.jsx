import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Home from './pages/Home'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App