import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Settings = () => {
    const [notifications, setNotifications] = useState(true)
    const [cameraPermission, setCameraPermission] = useState('Checking...')
    const [micPermission, setMicPermission] = useState('Checking...')

    useEffect(() => {
        const savedNotifications = localStorage.getItem('notifications')

        if (savedNotifications !== null) {
            setNotifications(savedNotifications === 'true')
        }

        checkPermissions()
    }, [])

    const checkPermissions = async () => {
        try {
            if (navigator.permissions) {
                const camera = await navigator.permissions.query({
                    name: 'camera'
                })

                const microphone = await navigator.permissions.query({
                    name: 'microphone'
                })

                setCameraPermission(camera.state)
                setMicPermission(microphone.state)

                camera.onchange = () => {
                    setCameraPermission(camera.state)
                }

                microphone.onchange = () => {
                    setMicPermission(microphone.state)
                }
            }
        } catch (error) {
            console.error(error)
            setCameraPermission('Not available')
            setMicPermission('Not available')
        }
    }

    const handleNotifications = () => {
        const newValue = !notifications

        setNotifications(newValue)
        localStorage.setItem('notifications', newValue)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')

        window.location.href = '/login'
    }
    return(
         <div className='min-h-screen bg-[#F6F6F2] flex flex-col md:flex-row'>
            
                <Sidebar />
            
            <div className='flex-1 p-6 md:p-10'>

                <h1 className='text-3xl font-bold text-[#263A43]'>
                    Settings
                </h1>

                <p className='text-[#687780] mt-2'>
                    Manage your VOXE preferences.
                </p>
                 
                 <div className='bg-white border border-[#E5E7E3] rounded-xl p-6 mt-8 max-w-2xl'>
                    <h2 className='text-xl font-bold text-[#263A43]'>
                        Notifications
                    </h2>

                    <div className='flex justify-between items-center mt-5'>
                       <div>
                            <p className='font-medium text-[#263A43]'>
                                Meeting notifications
                            </p>

                            <p className='text-sm text-[#687780] mt-1'>
                                Receive notifications about your meetings.
                            </p>
                        </div>

                        <button
                            onClick={handleNotifications}
                            className={`px-4 py-2 rounded-lg ${
                                notifications
                                    ? 'bg-[#477568] text-white'
                                    : 'bg-[#E7EFEB] text-[#263A43]'
                            }`}>
                            {notifications ? 'On' : 'Off'}
                        </button>


                    </div>
                 </div>

                 <div className='bg-white border border-[#E5E7E3] rounded-xl p-6 mt-5 max-w-2xl'>

                    <h2 className='text-xl font-bold text-[#263A43]'>
                        Privacy & Permissions
                    </h2>

                    <div className='mt-5 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='font-medium text-[#263A43]'>
                                    Camera
                                </p>

                                <p className='text-sm text-[#687780] mt-1'>
                                    Browser camera permission
                                </p>
                            </div>
                            <p className='text-sm text-[#477568] capitalize'>
                                {cameraPermission}
                            </p>
                        </div>


                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='font-medium text-[#263A43]'>
                                    Microphone
                                </p>

                                 <p className='text-sm text-[#687780] mt-1'>
                                    Browser microphone permission
                                </p>
                            </div>

                            <p className='text-sm text-[#477568] capitalize'>
                                {micPermission}
                            </p>
                        </div>
                    </div>
                </div>


                <div className='bg-white border border-[#E5E7E3] rounded-xl p-6 mt-5 max-w-2xl'>

                    <h2 className='text-xl font-bold text-[#263A43]'>
                        Account
                    </h2>

                    <div className='flex justify-between items-center mt-5'>

                        <div>
                            <p className='font-medium text-[#263A43]'>
                                Profile
                            </p>

                            <p className='text-sm text-[#687780] mt-1'>
                                Manage your personal information.
                            </p>
                        </div>

                        <Link
                            to='/profile'
                            className='bg-[#E7EFEB] text-[#263A43] px-4 py-2 rounded-lg' >

                            View Profile
                        </Link>

                    </div>

                    <div className='border-t border-[#E5E7E3] mt-5 pt-5'>

                        <button
                            onClick={logout}
                            className='bg-red-600 text-white px-4 py-2 rounded-lg' >
                                Log out
                        </button>

                    </div>
                
                </div>

            </div>
        </div>
    )
}

export default Settings