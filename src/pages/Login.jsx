import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  setError('');

  if (!username || !password) {
    setError('Please enter username and password');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://meets-manager.onrender.com/login/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify({
    username: username,
    password: password,
  }),
});

    const data = await response.json();

    if (!response.ok) {
      setError(
        data.non_field_errors?.[0] ||
        data.error ||
        'Invalid username or password'
      );
      return;
    }

    
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    
    localStorage.setItem('user', JSON.stringify(data.user));

    console.log('Login successful:', data.user);
    navigate('/dashboard')

  } catch (error) {
    console.error(error);
    setError('Unable to connect to the Django server');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-md p-8'>
      <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Welcome 
          </h1>

          <p className='text-gray-500 mt-2'>
            Sign in to continue to your meetings
          </p>
        </div>

        <form onSubmit={handleLogin} className='space-y-5'>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#477568]'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#477568]'
            />
          </div>

          {error && (
            <div className='bg-red-50 text-red-600 text-sm rounded-lg p-3'>
              {error}
            </div>
          )}
           <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#477568] text-white py-3 rounded-lg font-medium hover:bg-[#3e6459] disabled:bg-[#518576]'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register'
          className='text-[#477568] hover:underline'>
            Create account
          </Link>
        </p>
        </div>
    </div>
  );
};

export default Login

