
import { useTasks } from "../context/TaskContext";
import { Trash2, CalendarDays } from "lucide-react";

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <button
        className={`task-check ${task.completed ? "checked" : ""}`}
        onClick={() => toggleTask(task.id)}
        aria-label="Toggle task completion"
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description || "No description provided."}</p>

        <div className="task-meta">
          <span className={`category-tag ${(task.category || "other").toLowerCase()}`}>
            {task.category || "Other"}
          </span>

          <span className="task-date">
            <CalendarDays size={13} />
            {task.date}
          </span>
        </div>
      </div>

      <div className="task-right">
        <span className={`priority ${(task.priority || "medium").toLowerCase()}`}>
          {task.priority || "Medium"}
        </span>

        <button
          className="delete-button"
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
