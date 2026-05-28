import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Project1 from './pages/Project1'
import Project2 from './pages/Project2'
import Project3 from './pages/Project3'

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/double-wishbone-suspension" element={<Project1 />} />
          <Route path="/project/naca-airfoil-cfd" element={<Project2 />} />
          <Route path="/project/autonomous-sorting-system" element={<Project3 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
