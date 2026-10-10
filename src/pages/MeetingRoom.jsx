import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate , useParams} from 'react-router-dom'

const MeetingRoom = () => {

  const navigate = useNavigate()
  const{meetingId} = useParams()

  const socketRef = useRef(null)
  const [message, setMessage] = useState('')

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)

  const [micOn, setMicOn] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if(!token){
        navigate('/login')
        return 
    }

    const socket = new WebSocket(
        `wss://meets-manager.onrender.com/ws/meetings/${meetingId}/?token=${token}`
    )

    socketRef.current = socket
    socket.onopen =() =>{
        setConnected(true)
    }
    socket.onmessage =(event) =>{
        const data = JSON.parse(event.data)
        
        setMessages((oldMessages) => [
            ...oldMessages,
            data
        ])
    }

    socket.onclose = () => {
        setConnected(false)
    }
    socket.onerror = (error) => {
        console.log('WebSocket error : ', error);
        
    }
    return () => {
        socket.close()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
     }
  }, [meetingId,navigate])
  const sendMessage = (e) => {
    e.preventDefault()
    if(!message.trim()){
        return
    }
    if(socketRef.current?.readyState === WebSocket.OPEN){
        socketRef.current.send(
            JSON.stringify({
                message: message
            })
        )

        setMessage('')
    }
  }

  const toggleMedia = async (type) => {
    const isCamera = type === 'video'
    const isOn = isCamera ? cameraOn : micOn
    const setIsOn = isCamera ? setCameraOn : setMicOn

    setError('')

    const existingTrack = streamRef.current?.getTracks().find(
      (track) => track.kind === type
    )

    if (existingTrack) {
      existingTrack.enabled = !isOn
      setIsOn(!isOn)
      return
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: type === 'audio',
        video: type === 'video'
      })

        let stream = streamRef.current

      if (!stream) {
        stream = new MediaStream()
        streamRef.current = stream
      }
      newStream.getTracks().forEach((track) => {
        stream.addTrack(track)
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setIsOn(true)
    }
    catch (err) {
      console.error(err)
      setError(
        type === 'video'
          ? 'Unable to access camera. Please check permission.'
          : 'Unable to access microphone. Please check permission.'
      )
    }
  }
  const leaveMeeting = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    navigate('/dashboard')
  }
  return (
    <div className='min-h-screen bg-[#F6F6F2] flex flex-col'>
        <div className='bg-white p-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-[#263A43]'>VOXE</h1>
        <h2 className='text-sm text-[#687780]'>Team Meeting</h2>
        <p className='text-sm text-[#687780]'>
            {connected ? 'Connected' : ' Connecting...'}
        </p>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center p-4'>
        <div className='bg-[#263A43] w-full max-w-4xl aspect-video rounded-xl overflow-hidden flex items-center justify-center relative'>
            <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              cameraOn ? 'block' : 'hidden'
            }`}  />

            {!cameraOn && (
            <div className='text-center text-white'>
              <div className='text-5xl mb-3'>👤</div>
              <h2>Camera is off</h2>
            </div>
          )}

            <div className='absolute bottom-3 left-3 text-white bg-black/50 px-3 py-1 rounded'>
            You
            </div>
        </div>

        {error && (
            <p className='text-red-600 mt-3 text-sm text-center'>
            {error}
            </p>
        )}
      </div>
      <div className='bg-white p-4 flex justify-center items-center gap-3 flex-wrap'>
        <button
          onClick={() => toggleMedia('audio')}
          className='bg-[#E7EFEB] text-[#263A43] px-4 py-3 rounded-lg'>
          {micOn ? 'Mute' : 'Unmute'}
        </button>

        <button
          onClick={() => toggleMedia('video')}
          className='bg-[#E7EFEB] text-[#263A43] px-4 py-3 rounded-lg'>
          {cameraOn ? 'Turn camera off' : 'Turn camera on'}
        </button>

        <button
          onClick={leaveMeeting}
          className='bg-red-600 text-white px-4 py-3 rounded-lg'>
          Leave
        </button>
    </div>
    <div className='bg-white p-4'>
        <h2 className='text-lg font-bold text-[#263A43]'>
            Chat
        </h2>
    <div className='h-40 overflow-y-auto border rounded-lg p-3 mt-3'>
        {messages.map((item, index) => (
            <div key={index}>
                {item.type === 'chat_message' && (
                    <p>
                        <b>{item.username}:</b>{item.message}
                    </p>)}

                    {item.type === 'user_joined' && (
                        <p className='text-gray-500'>
                            {item.username} joined the meeting
                        </p>
                    )}

                    {item.type === 'user_left' && (
                        <p className='text-gray-500'>
                            {item.username} left the meeting 
                        </p>
                    )}
                </div>
        ))}

    </div>

    <form onSubmit = {sendMessage} className='flex gap-2 mt-3'>
        <input type='text' value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message ... '
        className='border rounded-lg p-2 flex-1' />

        <button type= 'submit' className='bg-[#477568] text-white px-4 py-2 rounded-lg'>Send</button>
    </form>
    </div>
    </div>
  )
}

   
export default MeetingRoom