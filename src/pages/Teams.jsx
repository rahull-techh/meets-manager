import React from 'react'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/meetings/teams/'

const Teams = () => {
    const [teams, setTeams] = useState([
        {
            id: 1,
            name: 'Development Team',
            members: 8
        },
        {
            id: 2,
            name: 'Design Team',
            members: 5
        }
    ])

    const [showForm, setShowForm] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [description, setDescription] = useState('')
<<<<<<< Updated upstream

    const createTeam = (e) => {
=======
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState('')

    // Fetch teams belonging to the logged-in user
    const fetchTeams = async () => {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('access_token')

        if (!token) {
            setError('Please log in to view your teams.')
            setLoading(false)
            return
        }

        try {
            const response = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.detail || 'Failed to fetch teams.'
                )
            }

            setTeams(
                Array.isArray(data) ? data : data.results || []
            )
        } catch (err) {
            console.error('Fetch teams error:', err)
            setError(err.message || 'Unable to load teams.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTeams()
    }, [])

    // Create a new team through the Django API
    const createTeam = async (e) => {
>>>>>>> Stashed changes
        e.preventDefault()
        setError('')

        if (!teamName.trim()) {
            setError('Please enter a team name.')
            return
        }

<<<<<<< Updated upstream
        const newTeam = {
            id: Date.now(),
            name: teamName,
            description: description,
            members: 0
=======
        const token = localStorage.getItem('access_token')

        if (!token) {
            setError('Please log in before creating a team.')
            return
        }

        setCreating(true)

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: teamName.trim(),
                    description: description.trim(),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                const errorMessage =
                    data.detail ||
                    Object.values(data).flat().join(' ') ||
                    'Failed to create team.'

                throw new Error(errorMessage)
            }

            setTeams((oldTeams) => [data, ...oldTeams])
            setTeamName('')
            setDescription('')
            setShowForm(false)
        } catch (err) {
            console.error('Create team error:', err)
            setError(err.message || 'Unable to create team.')
        } finally {
            setCreating(false)
>>>>>>> Stashed changes
        }

        setTeams([...teams, newTeam])

        setTeamName('')
        setDescription('')
        setShowForm(false)
    }

    return (
        <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>
            <Sidebar />

            <main className='flex-1 p-6 md:p-10'>
                <div className='flex justify-between items-center gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold text-[#263A43]'>
                            Teams
                        </h1>

                        <p className='text-[#687780] mt-2'>
                            Manage your teams and members.
                        </p>
                    </div>

<<<<<<< Updated upstream
                    <button className='bg-[#477568] text-white px-5 py-3 rounded-lg'
                    onClick={() => setShowForm(!showForm)}>
                        Create Team
=======
                    <button
                        className='bg-[#477568] text-white px-5 py-3 rounded-lg'
                        onClick={() => {
                            setError('')
                            setShowForm(!showForm)
                        }}
                    >
                        {showForm ? 'Close Form' : 'Create Team'}
>>>>>>> Stashed changes
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={createTeam}  className='bg-white border border-[#E5E7E3] rounded-xl p-6 mt-6 max-w-2xl'>
                        <h2 className='text-xl font-bold text-[#263A43]'>
                            Create Team
                        </h2>

                        <label className='block text-sm font-medium text-[#263A43] mt-5'>
                            Team Name
                        </label>

<<<<<<< Updated upstream
                        <input type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder='Enter team name' className='w-full border border-[#E5E7E3] rounded-lg p-3 mt-2'/>
=======
                        <input
                            type='text'
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder='Enter team name'
                            required
                            maxLength={200}
                            className='w-full border border-[#E5E7E3] rounded-lg p-3 mt-2'
                        />
>>>>>>> Stashed changes

                        <label className='block text-sm font-medium text-[#263A43] mt-5'>
                            Description
                        </label>

                        <textarea value={description} className='w-full border border-[#E5E7E3] rounded-lg p-3 mt-2' 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder='Enter team description'/>

                        <div className='flex gap-3 mt-5'>
<<<<<<< Updated upstream
                            <button className='bg-[#477568] text-white px-5 py-2 rounded-lg'
                            type='submit'>
                                Create
                            </button>

                          <button className='bg-[#E7EFEB] text-[#263A43] px-5 py-2 rounded-lg'
                          type='button'
                          onClick={() => setShowForm(false)} >
                            Cancel
                          </button>

=======
                            <button
                                className='bg-[#477568] text-white px-5 py-2 rounded-lg disabled:opacity-60'
                                type='submit'
                                disabled={creating}
                            >
                                {creating ? 'Creating...' : 'Create'}
                            </button>

                            <button
                                className='bg-[#E7EFEB] text-[#263A43] px-5 py-2 rounded-lg'
                                type='button'
                                onClick={() => {
                                    setShowForm(false)
                                    setError('')
                                }}
                            >
                                Cancel
                            </button>
>>>>>>> Stashed changes
                        </div>
                    </form>
                )}

                {error && (
                    <p
                        role='alert'
                        className='text-red-600 mt-5'
                    >
                        {error}
                    </p>
                )}

                <section className='mt-8'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-bold text-[#263A43]'>
                            Your Teams
                        </h2>

                        <button
                            onClick={fetchTeams}
                            disabled={loading}
                            className='text-sm text-[#477568] font-medium disabled:opacity-50'
                        >
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>

<<<<<<< Updated upstream
=======
                    {loading && (
                        <p className='text-[#687780] mt-5'>
                            Loading teams...
                        </p>
                    )}

                    {!loading && !error && teams.length === 0 && (
                        <p className='text-[#687780] mt-5'>
                            You don't have any teams yet.
                        </p>
                    )}

>>>>>>> Stashed changes
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                        {!loading && teams.map((team) => (
                            <div
                                key={team.id}
                                className='bg-white border border-[#E5E7E3] rounded-xl p-6'
                            >
                               <h3 className='text-xl font-semibold text-[#263A43]'>
                                    {team.name}
                                </h3>

                                <p className='text-[#687780] mt-2'>
                                    {team.members ?? 0} members
                                </p>

<<<<<<< Updated upstream
                                <button className='mt-5 bg-[#E7EFEB] text-[#263A43] px-4 py-2 rounded-lg'>
=======
                                {team.owner_username && (
                                    <p className='text-[#687780] mt-2 text-sm'>
                                        Owner: {team.owner_username}
                                    </p>
                                )}

                                <button
                                    type='button'
                                    onClick={() => {
                                        alert(
                                            `Team: ${team.name}\n\n${team.description || 'No description provided.'}`
                                        )
                                    }}
                                    className='mt-5 bg-[#E7EFEB] text-[#263A43] px-4 py-2 rounded-lg'
                                >
>>>>>>> Stashed changes
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