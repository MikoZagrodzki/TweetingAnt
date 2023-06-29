import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate('/', { replace: true });
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-5 md:justify-center items-center min-h-screen space-y-5 w-11/12 bg-background">
      <div className="flex flex-col space-y-5 mt-10 md:mt-0 ">
        <h1 className="text-5xl font-bold text-center">Tweeting Ant</h1>
        <p className="text-justify max-w-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      <div>
      <div className="max-w-md px-6 py-8 bg-secondary rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              className="w-full px-3 py-2 leading-tight border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              required
              className="w-full px-3 py-2 leading-tight border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password-confirm" className="block mb-2 text-sm font-medium text-gray-700">
              Password Confirmation
            </label>
            <input
              type="password"
              id="password-confirm"
              ref={passwordConfirmRef}
              required
              className="w-full px-3 py-2 leading-tight border-gray-300 rounded-md focus:outline-none focus:border-accent"
            />
          </div>
          <button
            id="sign-up-button"
            disabled={loading}
            className="w-full py-2 mt-4 text-white bg-primary rounded-md focus:outline-none hover:bg-accent font-semibold"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-accent underline">
          Login
        </Link>
        </div>
      </div>
    </div>
  );
}