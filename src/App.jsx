import './global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'

function App() {

  return (
    <AuthProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
