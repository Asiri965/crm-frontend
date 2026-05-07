import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadAndNotes = async () => {
      try {
        setLoading(true);
        const leadResponse = await api.get(`/leads/${id}`);
        setLead(leadResponse.data?.data || leadResponse.data);

        const notesResponse = await api.get(`/notes/${id}`);
        setNotes(notesResponse.data?.data || notesResponse.data);

        setLoading(false);
      } catch (err) {
        alert("Failed to load lead details. Please try again.");
        setLoading(false);
      }
    };
    fetchLeadAndNotes();
  }, [id]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const { data } = await api.post("/notes", {
        leadId: id,
        content: newNote,
      });
      const savedNote = data?.data || data?.note || data;
      setNotes([savedNote, ...notes]);
      setNewNote("");
    } catch (err) {
      alert("Failed to add note. Please try again.");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading details...</div>;
  if (!lead)
    return <div className="p-8 text-center text-red-500">Lead not found</div>;

  return (
    <div>
      <button
        onClick={() => navigate("/leads")}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Leads
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side Lead's information */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{lead.name}</h2>
          <p className="text-gray-500 mb-6">{lead.companyName}</p>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500 block">Email</span>{" "}
              <span className="font-medium">{lead.email}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Phone</span>{" "}
              <span className="font-medium">{lead.phoneNumber || "-"}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Status</span>
              <span className="inline-block mt-1 px-2 py-1 bg-gray-100 rounded text-gray-700">
                {lead.status}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Source</span>{" "}
              <span className="font-medium">{lead.source}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Deal Value</span>{" "}
              <span className="font-medium text-green-600">
                Rs. {lead.dealValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {/* Right side Notes section */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Internal Notes
          </h3>
          {/* Notes Form */}
          <form onSubmit={handleAddNote} className="mb-8">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              rows="3"
              placeholder="Add a note about this lead (e.g., Called them today, next meeting on Monday...)"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            ></textarea>
            <div className="text-right">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save Note
              </button>
            </div>
          </form>
          {/* Showing existing notes */}
          <div className="space-y-4">
            {notes.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No notes added yet.
              </p>
            ) : (
              notes.map((note, index) => {
                const noteDate = note?.createdAt
                  ? new Date(note.createdAt)
                  : null;
                const isValidDate = noteDate && !isNaN(noteDate.getTime());
                return (
                  <div
                    key={note._id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                  >
                    <p className="text-gray-800 mb-2 whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        By: {note?.createdBy?.email || "Unknown User"}
                      </span>
                      <span>
                        {isValidDate ? noteDate.toLocaleString() : "Just now"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
