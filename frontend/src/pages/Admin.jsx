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
    <div className="min-h-screen bg-gray-50 p-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-700">Employees</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search Employees by Name, ID, etc."
        />
        <button className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>

    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-gray-600">Select</th>
            <th className="p-3 text-left text-gray-600">Name</th>
            <th className="p-3 text-left text-gray-600">Email</th>
            <th className="p-3 text-left text-gray-600">Message</th>
            <th className="p-3 text-left text-gray-600">Date</th>
            <th className="p-3 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} className="border-t">
              <td className="px-4 py-2 text-gray-600">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 text-gray-600">{employee.name}</td>
              <td className="px-4 py-2 text-gray-600">{employee.email}</td>
              <td className="px-4 py-2 text-gray-600">{employee.message}</td>
              <td className="px-4 py-2 text-gray-600">{employee.date}</td>
              <td className="px-4 py-2 text-gray-600 flex space-x-2">
                <button
                  onClick={() => handleAction("view", employee.id)}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  aria-label={`View employee ${employee.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927a2.988 2.988 0 00-2.122 0l-7.387 3.79a3 3 0 00-1.717 2.632v7.586a3 3 0 001.717 2.632l7.387 3.79a2.988 2.988 0 002.122 0l7.387-3.79a3 3 0 001.717-2.632V9.349a3 3 0 00-1.717-2.632l-7.387-3.79a2.988 2.988 0 00-2.122 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleAction("download", employee.id)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label={`Download employee data for ${employee.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v4m4-4v4m-8-4v4m8-8h-4m4 0h-4m-4 0h4m-4-4h8M4 12h16" />
                  </svg>
                </button>
                <button
                  onClick={() => handleAction("delete", employee.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  aria-label={`Delete employee ${employee.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
