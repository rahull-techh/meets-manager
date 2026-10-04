import React from "react";
import { useState } from "react";

const ScheduleMeeting =() => {
    const [title, setTitle] = useState(' ')
    const [date, setDate] = useState(' ')
    const [time, setTime] = useState(' ')
    const handleSchedule = (e) => {
        e.preventDefault()

        if(!title.trim() || !date || !time) {
            alert('please fill all the fields')
            return
        }

        alert('meeting details entered successfully!')
    }
    return(
        <div className='min-h-screen bg-[#F6F6F2] flex items-center justify-center p-5'>
            <div className='bg-white p-8 rounded-xl border border-[#E5E7E3] w-full max-w-md'>
                <h1 className='text-2xl font-bold text-[#263A43]'>
                    Schedule a Meeting
                </h1>
                <p className='mt-2 text-[#687780]'>
                    Plan your next meeting with your team.
                </p>
                <form onSubmit={handleSchedule} className='mt-6'>
                    <label className='block text-sm font-medium text-[#263A43] mb-2'>
                        Meeting Title
                    </label>
                    <input type='text' value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter meeting title'
                    className='w-full border border-[#E5E7E3] rounded-lg p-3 mb-4'/>
                    
                    <lable className=' text-sm font-medium text-[#263A43] mb-2'>
                        Date
                    </lable>

                    <input type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='w-full border border-[#E5E7E3] rounded-lg p-3 mb-4'/>

                    <label className=" text-sm font-medium text-[#263A43] mb-2">
                        Time
                    </label>
                    <input type='time' value={time} 
                    onChange={(e ) => setTime(e.target.value)}
                    className="w-full border border-[#E5E7E3] rounded-lg p-3" />

                    <button type='submit'
                    className='w-full border bg-[#477568] text-white py-3 rounded-lg ' >
                        Schedule Meeting </button>
                                        </form>
            </div>

        </div>
    )
}

export default ScheduleMeeting