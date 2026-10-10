<<<<<<< Updated upstream
import { useEffect, useState } from 'react'
=======
import React, { useEffect, useState } from 'react'
>>>>>>> Stashed changes
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const API_URL = 'http://127.0.0.1:8000'

const Dashboard = () => {
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [startingMeeting, setStartingMeeting] = useState(false)

  const navigate = useNavigate()

  const fetchMeetings = async () => {
    const token = localStorage.getItem('access_token')

<<<<<<< Updated upstream
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/meetings/my/',
          {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          setError(data.detail || 'Failed to load meetings')
          return
        }

        setMeetings(data)
      } catch (error) {
        console.error(error)
        setError('Unable to connect to Django server')
      } finally {
        setLoading(false)
      }
=======
    if (!token) {
      setError('Please log in again.')
      setLoading(false)
      return
>>>>>>> Stashed changes
    }

    try {
      const response = await fetch(`${API_URL}/meetings/my/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to load meetings.')
      }

      setMeetings(
        Array.isArray(data) ? data : data.results || []
      )
    } catch (err) {
      console.error('Fetch meetings error:', err)
      setError(err.message || 'Unable to connect to Django server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

<<<<<<< Updated upstream
  const startMeeting = async () => {
    const token = localStorage.getItem('access_token')
  

  if (!token) {
    alert('Unable to start meet')
    return
  }
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/meetings/create/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Instant Meeting',
          scheduled_at: new Date().toISOString()
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      alert(data.detail || 'Unable to start meeting')
      return
    }

     navigate(`/meeting/${data.meeting_id}`)
  } catch (error) {
    console.error(error)
    alert('Unable to connect to Django server')
  }
}
=======
  // Create an instant meeting through the existing Django API.
  const handleStartMeeting = async () => {
    const token = localStorage.getItem('access_token')

    if (!token) {
      setError('Please log in before starting a meeting.')
      return
    }

    setError('')
    setStartingMeeting(true)

    try {
      const response = await fetch(`${API_URL}/meetings/create/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Instant Meeting',
          scheduled_at: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail ||
          Object.values(data).flat().join(' ') ||
          'Unable to create meeting.'
        )
      }

      if (!data.meeting_id) {
        throw new Error('Meeting created, but no meeting ID was returned.')
      }

      navigate(`/meeting/${data.meeting_id}`)
    } catch (err) {
      console.error('Start meeting error:', err)
      setError(err.message || 'Unable to start meeting.')
    } finally {
      setStartingMeeting(false)
    }
  }
>>>>>>> Stashed changes

  return (
    <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>
      <Sidebar />

      <main className='flex-1 p-6 md:p-10'>
        <h1 className='text-3xl font-bold text-[#263A43]'>
          Welcome to CONVEO
        </h1>

        <p className='mt-2 text-[#687780]'>
          Your meetings, your space.
        </p>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
          {/* Start an instant meeting */}
          <div className='bg-[#477568] text-white rounded-xl p-6'>
            <h2 className='text-xl font-semibold'>
              New Meeting
            </h2>

            <p className='mt-2 text-sm text-white/80'>
              Start an instant meeting with your team.
            </p>

<<<<<<< Updated upstream
            <button className='mt-5 bg-white text-[#477568] px-5 py-2 rounded-lg font-medium'
            onClick={startMeeting}>
              Start Meeting
=======
            <button
              type='button'
              onClick={handleStartMeeting}
              disabled={startingMeeting}
              className='mt-5 bg-white text-[#477568] px-5 py-2 rounded-lg font-medium disabled:opacity-60'
            >
              {startingMeeting ? 'Starting...' : 'Start Meeting'}
>>>>>>> Stashed changes
            </button>
          </div>

          {/* Join an existing meeting */}
          <div className='bg-white border border-[#E5E7E3] rounded-xl p-6'>
            <h2 className='text-xl font-semibold text-[#263A43]'>
              Join Meeting
            </h2>

            <p className='mt-2 text-sm text-[#687780]'>
              Join an existing meeting using a code.
            </p>

            <Link
              to='/join-meeting'
              className='inline-block mt-5 bg-[#E7EFEB] px-5 py-2 rounded-lg font-medium'
            >
              Join Now
            </Link>
          </div>

          {/* Schedule a meeting */}
          <div className='bg-white border border-[#E5E7E3] rounded-xl p-6'>
            <h2 className='text-xl font-semibold text-[#263A43]'>
              Schedule Meeting
            </h2>

            <p className='mt-2 text-sm text-[#687780]'>
              Plan your next meeting with your team.
            </p>

            <Link
              to='/schedule-meeting'
              className='inline-block mt-5 bg-[#E7EFEB] px-5 py-2 rounded-lg font-medium'
            >
              Schedule a Meeting
            </Link>
          </div>
        </section>

        {/* Meeting list */}
        <section className='mt-10'>
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-xl font-bold text-[#263A43]'>
              Your Meetings
            </h2>

            <button
              type='button'
              onClick={fetchMeetings}
              disabled={loading}
              className='text-sm font-medium text-[#477568] disabled:opacity-50'
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <p role='alert' className='text-red-500 mb-4'>
              {error}
            </p>
          )}

          {loading && (
            <p className='text-[#687780]'>
              Loading meetings...
            </p>
          )}

          {!loading && !error && meetings.length === 0 && (
            <p className='text-[#687780]'>
              No meetings found. Start or schedule your first meeting.
            </p>
          )}

          {!loading && meetings.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              {meetings.map((meeting) => (
                <div
                  key={meeting.meeting_id}
                  className='bg-white border border-[#E5E7E3] rounded-xl p-5'
                >
                  <h3 className='text-lg font-semibold text-[#263A43]'>
                    {meeting.title}
                  </h3>

                  <p className='mt-2 text-sm text-[#687780]'>
                    {new Date(meeting.scheduled_at).toLocaleDateString()}
                  </p>

                  <p className='mt-2 text-sm text-[#687780]'>
                    {new Date(meeting.scheduled_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                  <p className='mt-2 text-sm text-[#687780]'>
                    Status: {meeting.is_active ? 'Active' : 'Scheduled / Inactive'}
                  </p>

                  <Link
                    to={`/meeting/${meeting.meeting_id}`}
                    className='inline-block mt-4 bg-[#E7EFEB] text-[#477568] px-4 py-2 rounded-lg'
                  >
                    Open Meeting
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Dashboard