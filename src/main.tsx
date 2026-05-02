import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { WritingIndex } from './pages/WritingIndex'
import { EvalGatedPullRequests } from './pages/posts/EvalGatedPullRequests'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/writing" element={<WritingIndex />} />
        <Route path="/writing/eval-gated-pull-requests" element={<EvalGatedPullRequests />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
