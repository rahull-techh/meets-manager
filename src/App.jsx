import { BrowserRouter , Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
     
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path= '/login' element ={<Login />} />
        <Route path='/register' element ={<Registration />} />
        <Route path='/dashboard' element= {<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App