import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import NoPage from './components/NoPage'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Homepage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
