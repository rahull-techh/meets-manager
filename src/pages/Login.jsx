import { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
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
        await new Promise((resolve) => setTimeout(resolve, 800));

      const users = [
        {
          username: 'admin',
          password: '123456'
        }
      ];
       const user = users.find((item) => item.username === username);

      if (!user) {
        setError('No account exists with this username');
        return;
      }

      if (user.password !== password) {
        setError('Incorrect password');
        return;
      }
      console.log('Login successful');
    } catch (error) {
      setError('Something went wrong. Please try again.');
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
              className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
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
              className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
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
            className='w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register'
          className='text-indigo-600 hover:underline'>
            Create account
          </Link>
        </p>
        </div>
    </div>
  );
};

export default Login

