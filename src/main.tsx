import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/global.css'
import './assets/style/normalize.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
