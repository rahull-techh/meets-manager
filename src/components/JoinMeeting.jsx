import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinMeeting =() => {
     const navigate = useNavigate()
    const [meetingCode, setMeetingCode] = useState('')

    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleJoin = async (e) => {
        e.preventDefault();

        setError("");

        if (!meetingCode.trim()) {
            setError("Please enter a meeting code");
            return;
        }

        const token = localStorage.getItem("access_token");

        if (!token) {
            setError("Please login again");
            return;
        }
        navigate(`/meeting-room/${meetingCode.trim()}`)

        setLoading(true);

        try {
            const response = await fetch(
                `https://meets-manager.onrender.com/meetings/join-participant/${meetingCode.trim()}/`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.detail ||
                    data.error ||
                    "Unable to join meeting"
                );
                return;
            }

            // Meeting successfully joined
            navigate(`/meeting/${meetingCode.trim()}`);

        } catch (error) {
            console.error(error);
            setError("Unable to connect to Django server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#F6F6F2] flex items-center justify-center p-5'>

            <div className='bg-white p-8 rounded-xl border border-[#E5E7E3] w-full max-w-md'>

                <h1 className='text-2xl font-bold text-[#263A43]'>
                    Join a Meeting
                </h1>

                <p className='mt-2 text-[#687780]'>
                    Enter the meeting code to join your team.
                </p>
                <form onSubmit= {handleJoin} className='mt-6'>
                    <label className='text-sm font-medium text-[#263A43] mb-2'>
                        Meeting Code
                    </label>
                    
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
    );
};

export default JoinMeeting;