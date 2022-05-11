import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Nav from './components/Nav'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import RegisterScreen from './screens/RegisterScreen'
import CreatePostScreen from './screens/CreatePostScreen'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className='container mt-5'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/create-post' element={<CreatePostScreen />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
