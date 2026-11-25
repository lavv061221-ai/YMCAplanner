
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Empty } from "./Dashboard";

export default function Tasks() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("All");
  const [searchParams] = useSearchParams();

  const searchQuery = (searchParams.get("q") || "").toLowerCase().trim();

  const filtered = tasks.filter((task) => {
    const matchesFilter =
      filter === "Completed"
        ? task.completed
        : filter === "Pending"
          ? !task.completed
          : true;

    const matchesSearch =
      !searchQuery ||
      task.title?.toLowerCase().includes(searchQuery) ||
      task.description?.toLowerCase().includes(searchQuery) ||
      task.category?.toLowerCase().includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="content-panel">
      <div className="section-heading">
        <div>
          <h2>
            {searchQuery ? "Search Results" : "All Tasks"}
          </h2>
          <p>
            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Manage all your tasks in one place."}
          </p>
        </div>

        <span className="count-label">
          {filtered.length} tasks
        </span>
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
        <Empty
          message={
            searchQuery
              ? "No tasks match your search."
              : "No tasks found in this section."
          }
        />
      )}
    </div>
  );
}
