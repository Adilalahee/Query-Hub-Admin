import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact", { withCredentials: true });
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:5000/api/employee/delete", { ids: selected }, { withCredentials: true });
      fetchContacts();
      setSelected([]);
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact/download-pdf", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "employees.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Contacts</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Search</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">No.</th>
              <th className="px-4 py-2 text-left text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-gray-600">message</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className="border-t">
                <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                <td className="px-4 py-2 text-gray-600">{contact.email}</td>
                <td className="px-4 py-2 text-gray-600">{contact.message}</td>
                <td className="px-4 py-2 text-gray-600 flex space-x-2">
                  <button onClick={() => handleSelect(contact.id)} className="p-2 bg-gray-300 rounded-md">
                    {selected.includes(contact.id) ? "✅" : "⬜"}
                  </button>
                  <span onClick={handleDownloadPDF} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                    ⬇️ PDF
                  </span>
                  <span onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                    🗑️ Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
