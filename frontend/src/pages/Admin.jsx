import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/contacts", { withCredentials: true });
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Select/Deselect contacts
  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  // Delete selected contacts
  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:5000/api/contact/delete", { ids: selected }, { withCredentials: true });
      fetchContacts();
      setSelected([]);
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };

  // Download contacts as PDF
  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact/download-pdf", {
        responseType: "blob", // Handle binary response
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "contacts.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Download as PDF
      </button>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Select</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(contacts) && contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="border-b">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(contact._id)}
                      onChange={() => handleSelect(contact._id)}
                    />
                  </td>
                  <td className="p-3">{contact.name}</td>
                  <td className="p-3">{contact.email}</td>
                  <td className="p-3">{contact.message}</td>
                  <td className="p-3">{new Date(contact.submittedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Button */}
      {selected.length > 0 && (
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Selected
        </button>
      )}
    </div>
  );
}
