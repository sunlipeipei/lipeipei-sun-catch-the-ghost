import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './Pages/LandingPage.jsx'
import GameEasy from './Pages/GameEasy.jsx'
import GameMedium from './Pages/GameMedium.jsx'
import GameHard from './Pages/GameHard.jsx'
import CatchTheGhostProvider from './Components/CatchTheGhostProvider.jsx'
import Rules from './Pages/Rules.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/game/easy',
    element: 
    <CatchTheGhostProvider key='easy' difficulty='easy'>
      <GameEasy/>
    </CatchTheGhostProvider>
  },
  {
    path: '/game/medium',
    element: 
    <CatchTheGhostProvider key='medium' difficulty='medium'>
      <GameMedium/>
    </CatchTheGhostProvider>
  },
  {
    path: '/game/hard',
    element: 
    <CatchTheGhostProvider key='hard' difficulty='hard'>
      <GameHard/>
    </CatchTheGhostProvider>
  },
  {
    path: '/rules',
    element: <Rules />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
