import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const MeetingRoom = () => {
  const navigate = useNavigate()
  const { meetingId } = useParams()
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [micOn, setMicOn] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
  const token = localStorage.getItem('access_token')

  if (!token || !meetingId) {
    return
  }

  const socket = new WebSocket(
    `ws://127.0.0.1:8000/ws/meetings/${meetingId}/?token=${token}`
  )

  socket.onopen = () => {
    console.log('WebSocket connected')
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('WebSocket message:', data)
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  socket.onclose = () => {
    console.log('WebSocket disconnected')
  }

  return () => {
    socket.close()
  }
}, [meetingId])

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
    </div></div>
  )
}

   
export default MeetingRoom