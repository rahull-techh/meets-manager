
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Meetings = () => {

    const [meetings, setMeetings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const token = localStorage.getItem('access_token')

                const response = await fetch(
                    'http://meets-manager.onrender.com/meetings/my/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch meetings')
                }

                const data = await response.json()
                setMeetings(data)

            } catch (error) {
                console.error(error)
                setError('Unable to load meetings')
            } finally {
                setLoading(false)
            }
        }

        fetchMeetings()
    }, [])

    const upcomingMeetings = meetings.filter(
        meeting => new Date(meeting.scheduled_at) >= new Date()
    )

    const pastMeetings = meetings.filter(
        meeting => new Date(meeting.scheduled_at) < new Date()
    )

    const startMeeting = async (meetingId) => {
        const token = localStorage.getItem('access_token')
            try {
                const response = await fetch(
                     `http://meets-manager.onrender.com/meetings/start/${meetingId}/`,
                     {
                        method: 'POST',
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                     }
                )

                const data = await response.json()
                if (!response.ok) {
                    alert(data.detail || 'Unable to start meeting')
                    return
                }

                 setMeetings((oldMeetings) =>
                    oldMeetings.map((meeting) =>
                         meeting.meeting_id === meetingId
                             ? { ...meeting, is_active: true }
                            : meeting
)
                 )
                }catch (error) {
                    console.error(error)
                    alert('Unable to connect to Django server')
                }
    }

    const endMeeting = async (meetingId) => {
        const token = localStorage.getItem('access_token')

        try {
            const response = await fetch(
                `http://meets-manager.onrender.com/meetings/end/${meetingId}/`,
                {
                    method: 'POST',
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.json()

        if (!response.ok) {
            alert(data.detail || 'Unable to end meeting')
            return
        }
        setMeetings((oldMeetings) =>
            oldMeetings.map((meeting) =>
                meeting.meeting_id === meetingId
                    ? { ...meeting, is_active: false }
                    : meeting
            )
        )
        } catch (error) {
        console.error(error)
        alert('Unable to connect to Django server')
    }
}


    return (
        <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>
            <Sidebar />

            <div className='flex-1'>

                <div className='bg-white border-b border-[#E5E7E3] p-5'>
                    <div className='max-w-6xl mx-auto flex justify-between items-center'>

                        <div>
                            <h1 className='text-2xl font-bold text-[#263A43]'>
                                Meetings
                            </h1>

                            <p className='text-[#687780] mt-1'>
                                Manage your team meetings
                            </p>
                        </div>

                        <Link
                            to='/schedule-meeting'
                            className='bg-[#477568] text-white px-5 py-3 rounded-lg'
                        >
                            Schedule Meeting
                        </Link>

                    </div>
                </div>

                <div className='max-w-6xl mx-auto p-6'>

                    <h2 className='text-xl font-bold text-[#263A43]'>
                        Upcoming Meetings
                    </h2>

                    {loading && (
                        <p className='text-[#687780] mt-5'>
                            Loading meetings...
                        </p>
                    )}

                    {error && (
                        <p className='text-red-500 mt-5'>
                            {error}
                        </p>
                    )}

                    {!loading && !error && upcomingMeetings.length === 0 && (
                        <p className='text-[#687780] mt-5'>
                            No upcoming meetings.
                        </p>
                    )}

                    <div className='mt-5 space-y-4'>

                        {upcomingMeetings.map((meeting) => (
                            <div
                                key={meeting.meeting_id}
                                className='bg-white border border-[#E5E7E3] rounded-xl p-5 flex justify-between items-center'
                            >

                                <div>
                                    <h3 className='text-lg font-bold text-[#263A43]'>
                                        {meeting.title}
                                    </h3>

                                    <p className='text-[#687780] mt-2'>
                                        {new Date(meeting.scheduled_at).toLocaleString()}
                                    </p>
                                    {meeting.is_active ? (
                                        <p className='text-sm text-green-600 mt-2'> Live now
                                        </p>
                                        ) : (
                                            <p className='text-sm text-[#687780] mt-2'>Scheduled
                                            </p>
                                        )} 
                                </div>

                                <div className='flex gap-2'>
                                    {!meeting.is_active && (
                                        <button
                                         onClick={() => startMeeting(meeting.meeting_id)}
                                         className='bg-[#477568] text-white px-4 py-2 rounded-lg'>
                                            Start
                                         </button>
                                    )}
                                     {meeting.is_active && (
                                        <button onClick={() => endMeeting(meeting.meeting_id)}
                                        className='bg-red-500 text-white px-4 py-2 rounded-lg'>
                                            End
                                        </button>
                                     )}

                                <Link
                                    to={`/meeting/${meeting.meeting_id}`}
                                    className='bg-[#E7EFEB] text-[#263A43] px-5 py-2 rounded-lg'
                                >
                                    Join
                                </Link>
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className='mt-10'>

                        <h2 className='text-xl font-bold text-[#263A43]'>
                            Past Meetings
                        </h2>

                        <div className='mt-5 space-y-4'>

                            {!loading && pastMeetings.length === 0 && (
                                <div className='bg-white border border-[#E5E7E3] rounded-xl p-6'>
                                    <p className='text-[#687780]'>
                                        No past meetings available.
                                    </p>
                                </div>
                            )}

                            {pastMeetings.map((meeting) => (
                                <div
                                    key={meeting.meeting_id}
                                    className='bg-white border border-[#E5E7E3] rounded-xl p-5'
                                >
                                    <h3 className='text-lg font-bold text-[#263A43]'>
                                        {meeting.title}
                                    </h3>

                                    <p className='text-[#687780] mt-2'>
                                        {new Date(meeting.scheduled_at).toLocaleString()}
                                    </p>
                                    
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Meetings