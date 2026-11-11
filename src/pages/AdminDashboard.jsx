
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Archive,
  MessageCircle,
  X,
} from "lucide-react";

import {
  getAssignments,
  saveAssignments,
  getActiveAssignments,
  getArchivedAssignments,
  formatDate,
} from "../utils/storage";

import { shareAssignment } from "../utils/whatsapp";

const emptyForm = {
  title: "",
  subject: "Mathematics",
  className: "Class 10",
  teacher: "",
  description: "",
  dueDate: "",
};

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState(getAssignments);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [archive, setArchive] = useState(false);

  const navigate = useNavigate();

  const active = getActiveAssignments(assignments);
  const archived = getArchivedAssignments(assignments);

  const displayed = archive ? archived : active;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      subject: item.subject,
      className: item.className,
      teacher: item.teacher || "",
      description: item.description,
      dueDate: item.dueDate,
    });

    setEditingId(item.id);
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let updated;

    if (editingId) {
      updated = assignments.map((item) =>
        item.id === editingId
          ? { ...item, ...form }
          : item
      );
    } else {
      updated = [
        ...assignments,
        {
          ...form,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ];
    }

    setAssignments(updated);
    saveAssignments(updated);
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this homework?")) {
      return;
    }

    const updated = assignments.filter((item) => item.id !== id);

    setAssignments(updated);
    saveAssignments(updated);
  }

  function logout() {
    sessionStorage.removeItem("school_admin");
    navigate("/admin/login");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="text-indigo-600 font-bold text-sm">
            TEACHER CONTROL PANEL
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Admin Dashboard
          </h2>

          <p className="text-slate-500 mt-2">
            Manage school assignments easily.
          </p>
        </div>

        <button
          onClick={logout}
          className="border rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white rounded-2xl border p-5">
          <p className="text-slate-500 text-sm">Current Homework</p>
          <h3 className="text-3xl font-bold mt-2">{active.length}</h3>
        </div>

        <div className="bg-white rounded-2xl border p-5">
          <p className="text-slate-500 text-sm">Archived Homework</p>
          <h3 className="text-3xl font-bold mt-2">{archived.length}</h3>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <h3 className="text-xl font-bold">
          {archive ? "Archived Assignments" : "Manage Homework"}
        </h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setArchive(!archive)}
            className="border rounded-xl px-4 py-3 flex gap-2 items-center"
          >
            <Archive size={17} />
            {archive ? "Current Homework" : "Archive"}
          </button>

          {!archive && (
            <button
              onClick={openAdd}
              className="bg-indigo-600 text-white rounded-xl px-4 py-3 flex gap-2 items-center hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Homework
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-indigo-200 rounded-2xl p-5 sm:p-7 mt-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingId ? "Edit Assignment" : "Add New Homework"}
            </h3>

            <button
              type="button"
              aria-label="Close form"
              onClick={() => setShowForm(false)}
            >
              <X />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Assignment Title
              </label>

              <input
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Subject
              </label>

              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 bg-white"
              >
                {[
                  "Mathematics",
                  "Science",
                  "English",
                  "Hindi",
                  "Computer",
                  "Social Studies",
                  "Physics",
                  "Chemistry",
                  "Biology",
                ].map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Class
              </label>

              <select
                name="className"
                value={form.className}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 bg-white"
              >
                {Array.from(
                  { length: 12 },
                  (_, i) => `Class ${i + 1}`
                ).map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Teacher Name
              </label>

              <input
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                placeholder="Teacher name"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Due Date
              </label>

              <input
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Homework Instructions
              </label>

              <textarea
                required
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter assignment details..."
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700"
            >
              {editingId ? "Update Homework" : "Publish Homework"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4 mt-7">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4"
          >
            <div>
              <h4 className="text-lg font-bold">{item.title}</h4>

              <p className="text-sm text-indigo-600 mt-2">
                {item.className} · {item.subject}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Due: {formatDate(item.dueDate)}
              </p>

              <p className="text-sm text-slate-600 mt-2">
                {item.description}
              </p>
            </div>

            <div className="flex gap-2 items-start flex-wrap">
              <button
                onClick={() => shareAssignment(item)}
                title="Share on WhatsApp"
                aria-label={`Share ${item.title} on WhatsApp`}
                className="bg-green-50 text-green-700 p-3 rounded-xl"
              >
                <MessageCircle size={18} />
              </button>

              <button
                onClick={() => openEdit(item)}
                title="Edit"
                aria-label={`Edit ${item.title}`}
                className="bg-indigo-50 text-indigo-700 p-3 rounded-xl"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                title="Delete"
                aria-label={`Delete ${item.title}`}
                className="bg-red-50 text-red-600 p-3 rounded-xl"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <div className="bg-white border rounded-2xl p-12 text-center text-slate-500">
            No assignments available.
          </div>
        )}
      </div>
    </main>
  );
}
