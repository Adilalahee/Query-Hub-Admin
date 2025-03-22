import { useState } from "react";
import axios from "axios";
import { FacebookShareButton, TwitterShareButton } from "react-share";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg flex w-full max-w-5xl overflow-hidden relative">
          <div className="flex-1 p-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 clip-path-left"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white">CyberCraft <span className="text-yellow-300">Bangladesh</span></h2>
              <p className="text-gray-200 mt-2">Where your creativity thrives</p>
              <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-white">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className="w-full p-3 rounded bg-white border" required />
                </div>
                <div>
                  <label className="block text-white">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" className="w-full p-3 rounded bg-white border" required />
                </div>
                <div>
                  <label className="block text-white">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write message" className="w-full p-3 rounded bg-white border h-24" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
                  Submit
                </button>
              </form>
              {status && <p className="mt-2 text-white">{status}</p>}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center bg-blue-300 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500 to-blue-700 clip-path-right"></div>
            <img src="/path-to-image.png" alt="Illustration" className="w-3/4 relative z-10" />
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <FacebookShareButton url={typeof window !== "undefined" ? window.location.href : "#"}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Facebook</button>
        </FacebookShareButton>
        <TwitterShareButton url={typeof window !== "undefined" ? window.location.href : "#"}>
          <button className="bg-blue-400 text-white px-4 py-2 rounded">Twitter</button>
        </TwitterShareButton>
      </div>
    </>
  );
}
