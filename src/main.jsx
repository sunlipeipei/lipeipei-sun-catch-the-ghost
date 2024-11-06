import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage.jsx'
import GameEasy from './Pages/GameEasy.jsx'
import GameMedium from './Pages/GameMedium.jsx'
import GameHard from './Pages/GameHard.jsx'
import { BoardProvider } from './Components/BoardContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/game/easy',
    element:(
      <BoardProvider key='easy' difficulty='easy'>
        <GameEasy />
      </BoardProvider>
    ) 
  },
  {
    path: '/game/medium',
    element:(
      <BoardProvider key='medium' difficulty='medium'>
        <GameMedium />
      </BoardProvider>
    ) ,
  },
  {
    path: '/game/hard',
    element:(
      <BoardProvider key='hard' difficulty='hard'>
        <GameHard />
      </BoardProvider>
    ) ,
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
