import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { WritingIndex } from './pages/WritingIndex'
import { EvalGatedPullRequests } from './pages/posts/EvalGatedPullRequests'
import { BeyondWorkPage } from './pages/BeyondWorkPage'
import { BuildsPage } from './pages/BuildsPage'
import { MeetingsPage } from './pages/MeetingsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/writing" element={<WritingIndex />} />
        <Route path="/writing/eval-gated-pull-requests" element={<EvalGatedPullRequests />} />
        <Route path="/beyond-work" element={<BeyondWorkPage />} />
        <Route path="/builds" element={<BuildsPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
