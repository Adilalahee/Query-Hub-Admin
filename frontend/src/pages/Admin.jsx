import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await axios.get("/api/contacts", { withCredentials: true });
    setContacts(res.data);
  };

  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  const handleDelete = async () => {
    await axios.post("/api/contacts/delete", { ids: selected }, { withCredentials: true });
    fetchContacts();
    setSelected([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
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
            {contacts.map((contact) => (
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
            ))}
          </tbody>
        </table>
      </div>
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
