import React from "react"

import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='w-full md:w-64 bg-white border-r border-[#E5E7E3] p-6 flex flex-col'>
      
      <div>
        <h1 className='text-3xl font-bold text-[#263A43]'>
          VOXE<span className='text-[#477568]'>.</span>
        </h1>
        <p className='text-xs text-[#687780] mt-1'>
          your Voice, your Space
        </p>
      </div>

      
      <nav className='mt-10 flex flex-row md:flex-col gap-2'>
        <Link
          to='/dashboard'
          className='bg-[#E7EFEB] text-[#315C50] rounded-lg px-4 py-3 font-medium'
        >
          Dashboard
        </Link>

        <Link
          to='/meetings'
          className='text-[#687780] hover:bg-[#F6F6F2] rounded-lg px-4 py-3 transition-colors'>
            Meetings
        </Link>

        <Link
          to='/contacts'
          className='text-[#687780] hover:bg-[#F6F6F2] rounded-lg px-4 py-3 transition-colors'>
            Contacts </Link>

        <a
          href='#settings'
          className='text-[#687780] hover:bg-[#F6F6F2] rounded-lg px-4 py-3 transition-colors'
        >
          Settings
        </a>
      </nav>

      
      <div className='mt-auto pt-8 hidden md:block'>
        <Link
          to='/login'
          className='text-sm text-[#687780] hover:text-[#477568] transition-colors'
        >
          Log out
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar