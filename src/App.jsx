import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dataset from './pages/Dataset'
import Framework from './pages/Framework'
import LearnMore from './pages/LearnMore'
import Paper from './pages/Paper'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/framework" element={<Framework />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/paper" element={<Paper />} />
      </Routes>
      <Footer />
    </>
  )
}
