import { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Play from './pages/Play'
import ParticipantContext from './store/ParticipantContext'
import { QuizContextProvider } from './store/QuizContext'

function App() {
  const { participants } = useContext(ParticipantContext)

  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='play'
            element={
              participants.length < 1 ? (
                <Navigate to='/' />
              ) : (
                <QuizContextProvider>
                  <Play />
                </QuizContextProvider>
              )
            }
          />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
