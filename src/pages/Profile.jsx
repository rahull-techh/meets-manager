import React from 'react'
import Sidebar from '../components/Sidebar'
import { User, Mail, Shield, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'

const Profile = () => {

     const [user, setUser] = useState(null)
     useEffect(() => {

        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token')

            if (!token) {
                return
            }
             try {
                const response = await fetch(
                    'https://meets-manager.onrender.com/profile/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                 const data = await response.json()

                 if (response.ok) {git 
                    setUser(data)
                }
            } catch (error) {
                 console.error(error)
            }
        }
        fetchProfile()
    }, [])


  return (
     
    <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>
        <Sidebar />
        <div className='flex-1 p-6 md:p-10'>

        <h1 className='text-3xl font-bold text-[#263A43]'>
            My Profile
        </h1>
        <p className='text-[#687780] mt-2'>
            Manage your personal information.
        </p>
        <div className='bg-white border border-[#E5E7E3] rounded-xl p-6 mt-8 max-w-2xl'>
            <div className='flex items-center gap-4 mb-8'>
                <div className='w-16 h-16 rounded-full bg-[#E7EFEB] flex items-center justify-center text-xl font-bold text-[#477568]'>
                     {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>

                <div>
                    <h2 className='text-xl font-bold text-[#263A43]'>
                        {user?.username || 'User'}
                    </h2>
                    <p className='text-[#687780]'>
                        VOXE Member
                    </p>
                </div>
            </div>
            <div className='space-y-5'>

                <div className='flex items-center gap-3'>
                    <User className='w-5 h-5 text-[#477568]' />

                        <div>
                            <p className='text-sm text-[#687780]'>
                                Username
                            </p>

                            <p className='text-[#263A43] font-medium mt-1'>
                                {user?.username || 'Not available'}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                         <Mail className='w-5 h-5 text-[#477568]' />

                            <div>
                                <p className='text-sm text-[#687780]'>
                                    Email
                                </p>

                                <p className='text-[#263A43] font-medium mt-1'>
                                    {user?.email || 'Not available'}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <Shield className='w-5 h-5 text-[#477568]' />

                            <div>
                                <p className='text-sm text-[#687780]'>
                                Account
                                </p>

                                <p className='text-[#263A43] font-medium mt-1'>
                                Active Member
                                </p>
                    </div>
                </div>

            </div>
            <button className='mt-8 bg-[#477568] text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-[#3F685D]'>
                <Edit className='w-4 h-4' />
                     Edit Profile
            </button>
        </div>
    </div>
    </div>
  )
}

export default Profile