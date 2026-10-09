import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMeetings = async () => {
      const token = localStorage.getItem('access_token')

      if (!token) {
        setError('Please login again')
        setLoading(false)
        return
      }

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
    }

    fetchMeetings()
  }, [])

  return (
    <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>
      <Sidebar />

      <main className='flex-1 p-6 md:p-10'>
        <h1 className='text-3xl font-bold text-[#263A43]'>
          Welcome to VOXE
        </h1>

        <p className='mt-2 text-[#687780]'>
          Your meetings, your space.
        </p>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>

          
          <div className='bg-[#477568] text-white rounded-xl p-6'>
            <h2 className='text-xl font-semibold'>New Meeting</h2>

            <p className='mt-2 text-sm text-white/80'>
              Start an instant meeting with your team.
            </p>

            <button className='mt-5 bg-white text-[#477568] px-5 py-2 rounded-lg font-medium'>
              Start Meeting
            </button>
          </div>

          
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

        
        <section className='mt-10'>
          <h2 className='text-xl font-bold text-[#263A43] mb-5'>
            Upcoming Meetings
          </h2>

          {loading && (
            <p className='text-[#687780]'>
              Loading meetings...
            </p>
          )}

          {error && (
            <p className='text-red-500'>
              {error}
            </p>
          )}

          {!loading && !error && meetings.length === 0 && (
            <p className='text-[#687780]'>
              No upcoming meetings.
            </p>
          )}

          {!loading && !error && meetings.length > 0 && (
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

                  <Link
                    to={`/meeting/${meeting.meeting_id}`}
                    className='inline-block mt-4 bg-[#E7EFEB] text-[#477568] px-4 py-2 rounded-lg'
                  >
                    Join meeting
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