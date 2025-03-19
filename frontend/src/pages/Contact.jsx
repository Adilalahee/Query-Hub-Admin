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
      await axios.post("/api/contact", formData);
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
        {/* Left Column - Branding + Form */}
        <div className="flex-1 p-10 relative">
          {/* Slanted Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 clip-path-left"></div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white">CyberCraft <span className="text-yellow-300">Bangladesh</span></h2>
            <p className="text-gray-200 mt-2">Where your creativity thrives</p>

            {/* Contact Form */}
            <form className="space-y-4 mt-6">
              <div>
                <label className="block text-white">Full Name</label>
                <input type="text" placeholder="Your full name" className="w-full p-3 rounded bg-white border" required />
              </div>
              <div>
                <label className="block text-white">Email</label>
                <input type="email" placeholder="example@gmail.com" className="w-full p-3 rounded bg-white border" required />
              </div>
              <div>
                <label className="block text-white">Message</label>
                <textarea placeholder="Write message" className="w-full p-3 rounded bg-white border h-24" required></textarea>
              </div>
              <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1 flex items-center justify-center bg-blue-300 relative">
          {/* Slanted Background */}
          <div className="absolute inset-0 bg-gradient-to-l from-blue-500 to-blue-700 clip-path-right"></div>
          <img src="/path-to-image.png" alt="Illustration" className="w-3/4 relative z-10" />
        </div>
      </div>
    </div>
    

<FacebookShareButton url={window.location.href}><button>Facebook</button></FacebookShareButton>
<TwitterShareButton url={window.location.href}><button>Twitter</button></TwitterShareButton>

    </>
  );
}
