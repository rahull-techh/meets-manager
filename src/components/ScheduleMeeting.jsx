import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleMeeting = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSchedule = async (e) => {
        e.preventDefault();

        setError("");

        if (!title.trim() || !date || !time) {
            setError("Please fill all the fields");
            return;
        }

        const token = localStorage.getItem("access_token");

        if (!token) {
            setError("Please login again");
            return;
        }

        setLoading(true);

        try {
            const scheduledAt = new Date(
                `${date}T${time}`
            ).toISOString();

            const response = await fetch(
                "http://127.0.0.1:8000/meetings/create/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        scheduled_at: scheduledAt,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.detail ||
                    data.scheduled_at?.[0] ||
                    data.title?.[0] ||
                    "Failed to schedule meeting"
                );
                return;
            }

            alert("Meeting scheduled successfully!");

            navigate("/dashboard");

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
                    Schedule a Meeting
                </h1>

                <p className='mt-2 text-[#687780]'>
                    Plan your next meeting with your team.
                </p>

                <form onSubmit={handleSchedule} className='mt-6'>

                    {/* Meeting Title */}
                    <label className='block text-sm font-medium text-[#263A43] mb-2'>
                        Meeting Title
                    </label>

                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter meeting title'
                        className='w-full border border-[#E5E7E3] rounded-lg p-3 mb-4'
                    />

                    {/* Date */}
                    <label className='block text-sm font-medium text-[#263A43] mb-2'>
                        Date
                    </label>

                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='w-full border border-[#E5E7E3] rounded-lg p-3 mb-4'
                    />

                    {/* Time */}
                    <label className='block text-sm font-medium text-[#263A43] mb-2'>
                        Time
                    </label>

                    <input
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className='w-full border border-[#E5E7E3] rounded-lg p-3'
                    />

                    {/* Error */}
                    {error && (
                        <p className='mt-4 text-sm text-red-500'>
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full mt-5 bg-[#477568] text-white py-3 rounded-lg disabled:opacity-60'
                    >
                        {loading ? "Scheduling..." : "Schedule Meeting"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ScheduleMeeting;