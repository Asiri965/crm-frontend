import { useState, useEffect, use } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    source: "",
    status: "",
    dealValue: "",
  });

  const fetchLeads = async (search = "") => {
    try {
      const url = search ? `/leads?keyword=${search}` : "/leads";
      const { data } = await api.get(url);
      setLeads(data?.data || []);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads(searchText);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      source: "",
      status: "",
      dealValue: "",
    });
  };

  const handleEditClick = (lead) => {
    setFormData({
      name: lead.name,
      companyName: lead.companyName,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      source: lead.source,
      status: lead.status,
      dealValue: lead.dealValue,
    });
    setEditingId(lead._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        dealValue: Number(formData.dealValue),
      };

      if (editingId) {
        await api.put(`/leads/${editingId}`, payload);
      } else {
        await api.post("/leads", payload);
      }
      closeModal();
      fetchLeads();
    } catch (err) {
      alert("Failed to saving lead. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await api.delete(`/leads/${id}`);
        fetchLeads();
      } catch (err) {
        alert("Failed to delete lead. Please try again.");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      New: "bg-blue-100 text-blue-800",
      Contacted: "bg-yellow-100 text-yellow-800",
      Qualified: "bg-purple-100 text-purple-800",
      "Proposal Sent": "bg-indigo-100 text-indigo-800",
      Won: "bg-green-100 text-green-800",
      Lost: "bg-red-100 text-red-800",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <div className="p-8 text-center">Loading Leads...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Leads Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Lead
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, company, or email..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Company</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Source</th>
                <th className="p-4 font-semibold">Value (Rs.)</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                  </td>
                  <td className="p-4 text-gray-700">{lead.companyName}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">{lead.source}</td>
                  <td className="p-4 font-medium text-gray-700">
                    {lead.dealValue.toLocaleString()}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => navigate(`/leads/${lead._id}`)}
                      className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(lead)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No leads found. Add a new lead to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingId ? "Edit Lead" : "Add New Lead"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company & Email
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Company"
                      required
                      className="w-1/2 border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-1/2 border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded focus:ring-2 outline-none"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deal Value (Rs)
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full border p-2 rounded focus:ring-2 outline-none"
                      value={formData.dealValue}
                      onChange={(e) =>
                        setFormData({ ...formData, dealValue: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border p-2 rounded focus:ring-2 outline-none"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source
                    </label>
                    <select
                      className="w-full border p-2 rounded focus:ring-2 outline-none"
                      value={formData.source}
                      onChange={(e) =>
                        setFormData({ ...formData, source: e.target.value })
                      }
                    >
                      <option value="Website">Website</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? "Update Lead" : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
