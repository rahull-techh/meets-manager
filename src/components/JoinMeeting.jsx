import { useState } from "react";

const JoinMeeting =() => {
    const [meetingCode, setMeetingCode] = useState(' ')

    const handleJoin =(e) => {
        e.preventDefault()
        if(!meetingCode.trim()){
            alert('Please enter a meeting code')
            return
        }
        alert (`meeting code entered : ${meetingCode}`)

    }

    return (
        <div  className='min-h-screen bg-[#F6F6F2] flex items-center justify-center p-5'>
            <div className='bg-white p-8 rounded-xl border border-[#E5E7E3] w-full max-w-md'>
                <h1 className='text-2xl font-bold text-[#263A43]'>
                    Join a Meeting
                </h1>
                <p className="mt-2 text-[#687780]">
                    Enter the meeting code to join your team.
                </p>
                <form onSubmit= {handleJoin} className='mt-6'>
                    <lable className='text-sm font-medium text-[#263AA43] mb-2'>
                        Meeting Code
                    </lable>
                    
                    <input type='text' value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    placeholder='Enter meeting code'
                    className='w-full border border-[#E5E7E3] rounded-lg p-3 outline-none focus:border-[#477568]' />
                    <button type='submit'
                    className='w-full mt-5 bg-[#477568] text-white py-3 rounded-xl'>
                        Join a Meeting
                        </button> 

                    </form>
            </div>
        </div>
    )
}
export default JoinMeeting