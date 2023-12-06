import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { BUTTON_STYLING, SHADOW_STYLING } from '../tailwindCustomStyles';
// import './Login.css';



export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('hello');
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <div className={`flex flex-col md:flex-row md:space-y-0 md:space-x-16 md:justify-center items-center min-h-screen space-y-5 w-11/12 bg-background sm:space-y-10`}>
      <div className={`flex flex-col space-y-5 mt-10 md:mt-0 sm:space-y-10 sm:mt-16`}>
        <h1 className="text-5xl font-bold text-center sm:text-7xl md:whitespace-nowrap">Tweeting Ant</h1>
        {/* <p className="text-justify text-sm sm:text-base max-w-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
      </div>
      <div>
      <div className={`max-w-md px-6 py-8 bg-white bg-opacity-40 rounded-lg ${SHADOW_STYLING}`}>
        <h2 className="mb-4 text-2xl font-bold text-center">Password Reset</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}
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
              className={`text-black w-full px-3 py-2 leading-tight border-gray-300 rounded-md focus:outline-none focus:border-accent ${SHADOW_STYLING}`}
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 ${BUTTON_STYLING} font-semibold`}
            type="submit"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-accent underline">
            Log in
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center">
        Need an account?{' '}
        <Link to="/signup" className="text-accent underline">
          Sign Up
        </Link>
        </div>
      </div>
    </div>
  );
}