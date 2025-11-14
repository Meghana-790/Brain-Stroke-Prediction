import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import InfoPage from './pages/InfoPage'
import PredictPage from './pages/PredictPage'
import ChatbotPage from './pages/ChatbotPage'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/info" element={<InfoPage/>}/>
        <Route path="/predict" element={<PredictPage/>}/>
        <Route path="/chatbot" element={<ChatbotPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
