import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import LanguageProvider from './i18n/LanguageProvider.jsx'
import ErrorBoundary from './components/ui/ErrorBoundary.jsx'
import CrashScreen from './components/ui/CrashScreen.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <ErrorBoundary fallback={<CrashScreen />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </LanguageProvider>
  </StrictMode>
)
