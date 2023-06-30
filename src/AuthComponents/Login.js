
import React, { useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
// import "../styles.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setError("Incorrect email or password");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-16 md:justify-center items-center min-h-screen space-y-5 w-11/12 bg-background sm:space-y-10">
      <div className="flex flex-col space-y-5 mt-10 md:mt-0 sm:space-y-10 sm:mt-16">
        <h1 className="text-5xl font-bold text-center sm:text-7xl md:whitespace-nowrap">Tweeting Ant</h1>
        <p className="text-justify text-sm sm:text-base max-w-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      <div>
        <div className="max-w-sm px-6 py-8 bg-secondary rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-center">Log in</h2>
          {error && <div className="text-red-500">{error}</div>}
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
                className="w-full px-3 py-2 leading-tight border-gray-300 rounded-md focus:outline-none focus:border-accent"
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
                className="w-full px-3 py-2 leading-tight border-gray-300 rounded-md focus:outline-none focus:border-accent"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-2 mt-4 text-white font-semibold bg-primary rounded-md focus:outline-none hover:bg-accent"
              type="submit"
            >
              Log In
            </button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/forgot-password" className="text-accent underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="mt-2 text-center">
          <p>Need an account? <Link to="/signup" className="text-accent underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
