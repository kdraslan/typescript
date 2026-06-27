import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.css'

// `!` is a non-null assertion: we tell the compiler this element exists (it does, see index.html).
// That single character is itself a tiny TypeScript lesson, so the app demonstrates the subject.
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
