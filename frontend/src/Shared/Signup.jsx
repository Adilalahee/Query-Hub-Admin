import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // **Validation**
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful! Please log in.");

      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response);
        setError(err.response.data.message || "Signup failed. Try again.");
      } else {
        console.error("Signup error:", err.message);
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-wrap">
        {/* Left Side - Image or Info */}
        <div className="w-full md:w-1/2 bg-blue-600 flex items-center justify-center text-white p-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome to CyberCraft</h2>
            <p className="mt-2">Sign up and start your journey today!</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Create an Account</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSignup} className="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Full Name" className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password (8+ characters)" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
          </form>

          <p className="text-center text-gray-600 mt-4">Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a></p>
        </div>
      </div>
    </div>
  );
}
