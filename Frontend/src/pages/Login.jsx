import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || (state === 'Sign Up' && !name)) {
      toast.error('All fields are required');
      return;
    }

    const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login';

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state === 'Sign Up' ? { name, email, password } : { email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">{state}</h2>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 my-2 border border-gray-300 rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 my-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 my-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Please wait...' : state}
          </button>
        </form>

        <p className="mt-4 text-center">
          {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setState(state === 'Login' ? 'Sign Up' : 'Login');
              setEmail('');
              setPassword('');
              setName('');
            }}
            className="text-blue-500"
          >
            {state === 'Login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
