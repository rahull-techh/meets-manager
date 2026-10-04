import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'



const Registration = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSendOtp = async () => {
  setError('')
  setMessage('')

  if (!username || !email || !password) {
    setError('Please enter username, email, and password first')
    return
  }

  const formData = new FormData()
  formData.append('username', username)
  formData.append('email', email)
  formData.append('password', password)

  try {
    const response = await fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || 'Could not send OTP')
      return
    }

    setMessage('OTP sent to your email. Please check your inbox.')
  } catch (error) {
    setError('Unable to connect to the Django server')
  }
}

  const handleRegister = async (e) => {
  e.preventDefault()

  setError('')
  setMessage('')

  if (!name || !username || !email || !otp || !password) {
    setError('Please fill in all the fields')
    return
  }

  const formData = new FormData()
  formData.append('email', email)
  formData.append('otp', otp)

  try {
    const response = await fetch('http://127.0.0.1:8000/verifyotp/', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || 'OTP verification failed')
      return
    }

    setMessage('Account verified successfully. You can now login.')
    navigate('/login')
  } catch (error) {
    setError('Unable to connect to the Django server')
  }
}

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-lg bg-white rounded-2xl shadow-lg p-8'>

        <div className='text-center mb-7'>
          <h1 className='text-3xl font-bold text-slate-800'>
            Create your account
          </h1>

          <p className='text-slate-500 mt-2'>
            Create an account to start your meetings
          </p>
        </div>

        <form onSubmit={handleRegister} className='space-y-4'>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Full Name
            </label>

            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your full name'
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Username
            </label>

            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Choose a unique username'
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500'
            />

            <p className='text-xs text-slate-400 mt-1'>
              This username will be used to identify you
            </p>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Email
            </label>

            <div className='flex gap-2'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500'
              />

              <button
                type='button'
                onClick={handleSendOtp}
                className='px-4 py-3 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200'
              >
                Send OTP
              </button>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              OTP
            </label>

            <input
              type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder='Enter 6-digit OTP'
              maxLength={6}
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Password
            </label>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Create a password'
                className='w-full border border-slate-300 rounded-lg px-4 py-3 pr-20 outline-none focus:border-indigo-500'
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-600'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div className='bg-red-50 text-red-600 text-sm rounded-lg p-3'>
              {error}
            </div>
          )}

          {message && (
            <div className='bg-indigo-50 text-indigo-700 text-sm rounded-lg p-3'>
              {message}
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700'
          >
            Create Account
          </button>

        </form>

        <p className='text-center text-sm text-slate-500 mt-6'>
          Already have an account?{' '}

          <Link
            to='/login'
            className='text-indigo-600 font-medium hover:underline'
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Registration