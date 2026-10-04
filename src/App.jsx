import { BrowserRouter , Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import JoinMeeting from './components/JoinMeeting'
import ScheduleMeeting from './components/ScheduleMeeting'
import MeetingRoom from './pages/MeetingRoom'


const App = () => {
  return (
    <div>
     
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path= '/login' element ={<Login />} />
        <Route path='/register' element ={<Registration />} />
        <Route path='/dashboard' element= {<Dashboard />} />
        <Route path='/join-meeting' element= {<JoinMeeting />} />
        <Route path='/schedule-meeting' element= {<ScheduleMeeting />} />
        <Route path='/meeting-room' element={ <MeetingRoom />} />
      </Routes>
    </div>
  )
}

export default App