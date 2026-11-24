import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Work",
    date: new Date().toISOString().split("T")[0],
    priority: "Medium",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    addTask({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });

    navigate("/tasks");
  };

  return (
    <div className="form-container">
      <Link to="/tasks" className="back-link">
        <ArrowLeft size={16} /> Back to tasks
      </Link>

      <div className="form-heading">
        <span className="eyebrow">STAY ORGANIZED</span>
        <h2>Create a New Task</h2>
        <p>Add details to keep your schedule organized.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label>Task Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Complete assignment"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add some details about your task..."
          rows="4"
        />

        <div className="form-row">
          <div>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Work</option>
              <option>Study</option>
              <option>Personal</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <label>Due Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button type="submit" className="primary-button submit-button">
          <Plus size={18} /> Create Task
        </button>
      </form>
    </div>
  );
}