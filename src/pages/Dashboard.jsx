import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
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
            <button className='mt-5 bg-[#E7EFEB] text-[#477568] px-5 py-2 rounded-lg font-medium'>
              Join Now
            </button>
          </div>
          <div className='bg-white border border-[#E5E7E3] rounded-xl p-6'>
            <h2 className='text-xl font-semibold text-[#263A43]'>
              Schedule Meeting
            </h2>
            <p className='mt-2 text-sm text-[#687780]'>
              Plan your next meeting with your team.
            </p>
            <button className='mt-5 bg-[#E7EFEB] text-[#477568] px-5 py-2 rounded-lg font-medium'>
              Schedule
            </button>
          </div>
        </section>


        <section className='mt-10'>
          <h2 className='text-xl font-bold text-[#263A43] mb-5'>
            Upcoming Meetings
          </h2>

          <div className='bg-white border border-[#E5E7E3] rounded-xl p-6'>
            <p className='text-[#687780] text-sm'>
              No upcoming meetings yet.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
