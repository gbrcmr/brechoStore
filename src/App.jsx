import './global.css'
import { ChakraProvider } from '@chakra-ui/react'
import {Router} from './Router'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <ChakraProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
