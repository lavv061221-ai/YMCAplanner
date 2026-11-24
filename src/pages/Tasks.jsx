import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Empty } from "./Dashboard";

export default function Tasks() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("All");

  const filtered = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="content-panel">
      <div className="section-heading">
        <div>
          <h2>All Tasks</h2>
          <p>Manage all your tasks in one place.</p>
        </div>
        <span className="count-label">{tasks.length} tasks</span>
      </div>

      <div className="filter-tabs">
        {["All", "Pending", "Completed"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length ? (
        filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      ) : (
        <Empty message="No tasks found in this section." />
      )}
    </div>
  );
}