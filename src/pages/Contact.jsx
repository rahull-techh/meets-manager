import React from 'react'
import Sidebar from '../components/Sidebar'

const Contact = () => {

    const contacts = [
        {
            id: 1,
            name: 'Rahul',
            email: 'rahul@gmail.com',
            status: 'Online'
        },
        {
            id: 2,
            name: 'Udit',
            email: 'udit@gamil.com',
            status: 'Offline'
        },
        {
            id: 3,
            name: 'Anshika',
            email: 'anshika@gamil.com',
            status: 'Online'
        }
    ]

  return (
    
    <div className='min-h-screen bg-[#F6F6F2]  flex flex-col md:flex-row'>
        <Sidebar />
        <div className='flex-1'>
        <div className='max-w-6xl mx-auto'>
            <div>
                <h1 className='text-3xl font-bold text-[#263A43]'>
                    Contacts
                </h1>
                <p className='text-[#687780] mt-2'>
                   Connect with your team members.
                </p>
                <button className='bg-[#477568] text-white px-5 py-3 rounded-lg'>
                    Add Contact
                </button>

                 </div>
                 <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {contacts.map((contact) => (
                        <div className='bg-white border border-[#E5E7E3] rounded-xl p-5'
                        key={contact.id}>
                             <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 rounded-full bg-[#E7EFEB] flex items-center justify-center text-[#477568] font-bold text-lg'>
                                    {contact.name.charAt(0)}
                                </div>

                                <div>
                                    <h2 className='text-lg font-bold text-[#263A43]'>
                                        {contact.name}
                                    </h2>
                                     <p className='text-sm text-[#687780]'>{contact.email}

                                     </p>
                                    
                                </div>
                            </div>

                            <div className='mt-5 flex justify-between items-center'>
                                <p className='text-sm text-[#687780]'>{contact.status}</p>
                                <button className='bg-[#E7EFEB] text-[#263A43] px-4 py-2 rounded-lg'>Message

                                </button>
                            </div>
                        </div>
                    ))}

                 </div>
            </div>
        </div>
    </div>

  )
}

export default Contact