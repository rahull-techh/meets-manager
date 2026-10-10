import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

const Teams = () => {
    const [teams, setTeams] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchTeams = async () => {
        const token = localStorage.getItem('access_token')

        try {
            const response = await fetch(
                'http://meets-manager.onrender.com/meetings/teams/',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error('Failed to fetch teams')
            }

            const data = await response.json()

            if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch teams')
            }

setTeams(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Unable to load teams')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTeams()
    }, [])

    const createTeam = async (e) => {
        e.preventDefault()

        if (!teamName.trim()) {
            return
        }

        const token = localStorage.getItem('access_token')

        try {
            const response = await fetch(
                'http://meets-manager.onrender.com/meetings/teams/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: teamName,
                        description: description
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to create team')
            }

            setTeams((oldTeams) => [data, ...oldTeams])

            setTeamName('')
            setDescription('')
            setShowForm(false)

        } catch (err) {
            console.error(err)
            alert('Unable to create team')
        }
    }

    return (
        <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>

            <Sidebar />

            <main className='flex-1 p-6 md:p-10'>

                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-3xl font-bold text-[#263A43]'>
                            Teams
                        </h1>

                        <p className='text-[#687780] mt-2'>
                            Manage your teams and members.
                        </p>
                    </div>

                    <button
                        className='bg-[#477568] text-white px-5 py-3 rounded-lg'
                        onClick={() => setShowForm(!showForm)}
                    >
                        Create Team
                    </button>
                </div>

                {showForm && (
                    <form
                        onSubmit={createTeam}
                        className='bg-white border border-[#E5E7E3] rounded-xl p-6 mt-6 max-w-2xl'
                    >
                        <h2 className='text-xl font-bold text-[#263A43]'>
                            Create Team
                        </h2>

                        <label className='block text-sm font-medium text-[#263A43] mt-5'>
                            Team Name
                        </label>

                        <input
                            type='text'
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder='Enter team name'
                            className='w-full border border-[#E5E7E3] rounded-lg p-3 mt-2'
                        />

                        <label className='block text-sm font-medium text-[#263A43] mt-5'>
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Enter team description'
                            className='w-full border border-[#E5E7E3] rounded-lg p-3 mt-2'
                        />

                        <div className='flex gap-3 mt-5'>
                            <button
                                className='bg-[#477568] text-white px-5 py-2 rounded-lg'
                                type='submit'
                            >
                                Create
                            </button>

                            <button
                                className='bg-[#E7EFEB] text-[#263A43] px-5 py-2 rounded-lg'
                                type='button'
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <section className='mt-8'>

                    <h2 className='text-xl font-bold text-[#263A43]'>
                        Your Teams
                    </h2>

                    {loading && (
                        <p className='text-[#687780] mt-5'>
                            Loading teams...
                        </p>
                    )}

                    {error && (
                        <p className='text-red-600 mt-5'>
                            {error}
                        </p>
                    )}

                    {!loading && !error && teams.length === 0 && (
                        <p className='text-[#687780] mt-5'>
                            You don't have any teams yet.
                        </p>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className='bg-white border border-[#E5E7E3] rounded-xl p-6'
                            >
                                <h3 className='text-xl font-semibold text-[#263A43]'>
                                    {team.name}
                                </h3>

                                {team.description && (
                                    <p className='text-[#687780] mt-2'>
                                        {team.description}
                                    </p>
                                )}

                                <p className='text-[#687780] mt-2'>
                                    {team.members} members
                                </p>

                                <button
                                    className='mt-5 bg-[#E7EFEB] text-[#263A43] px-4 py-2 rounded-lg'
                                >
                                    View Team
                                </button>
                            </div>
                        ))}

                    </div>

                </section>

            </main>

        </div>
    )
}

export default Teams