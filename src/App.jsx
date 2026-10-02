import { BrowserRouter , Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'

const App = () => {
  return (
    <div>
     
      <Routes>
        <Route path= '/' element ={<Login />} />
        <Route path='/register' element ={<Registration />} />
      </Routes>
    </div>
  )
}

export default App