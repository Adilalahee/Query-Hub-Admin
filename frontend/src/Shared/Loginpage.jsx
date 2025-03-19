import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials or server error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left Side - Branding Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-8 rounded-l-lg">
          <h2 className="text-3xl font-bold mb-4">CyberCraft Bangladesh</h2>
          <p className="text-lg text-center">
            Unlock your creativity and innovation with CyberCraft.  
            Your journey starts here.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 rounded-r-lg">
          {/* Logo for Mobile */}
          <div className="md:hidden flex items-center justify-center mb-6">
            <h2 className="text-blue-600 text-2xl font-bold">CyberCraft Bangladesh</h2>
          </div>

          <h2 className="text-xl text-center mb-4 text-gray-600">
            Welcome back! Log in to continue.
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
