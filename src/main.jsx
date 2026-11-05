import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './reference.css'
import './themes.css'
import './interactive.css'
import './portfolio.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
