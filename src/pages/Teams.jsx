import React from 'react'
import Sidebar from '../components/Sidebar'

const Teams = () => {
    const teams = [
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
    ]
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

                    <button className='bg-[#477568] text-white px-5 py-3 rounded-lg'>
                        Create Team
                    </button>
                </div>

                <section className='mt-8'>

                    <h2 className='text-xl font-bold text-[#263A43]'>
                        Your Teams
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className='bg-white border border-[#E5E7E3] rounded-xl p-6'
                            >
                               <h3 className='text-xl font-semibold text-[#263A43]'>
                                    {team.name}
                                </h3>

                                <p className='text-[#687780] mt-2'>
                                    {team.members} members
                                </p>

                                <button className='mt-5 bg-[#E7EFEB] text-[#263A43] px-4 py-2 rounded-lg'>
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