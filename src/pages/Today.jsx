import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Empty } from "./Dashboard";
import { Sun } from "lucide-react";

export default function Today() {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter((task) => task.date === today);

  const completed = todayTasks.filter((t) => t.completed).length;

  return (
    <div>
      <div className="date-banner">
        <div className="date-icon"><Sun size={28} /></div>
        <div>
          <h2>Today's Focus</h2>
          <p>{new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}</p>
        </div>
        <div className="date-count">
          <strong>{completed}/{todayTasks.length}</strong>
          <span>Completed</span>
        </div>
      </div>

      <section className="content-panel">
        <h2>Your Daily Tasks</h2>
        <p className="muted">Everything you need to accomplish today.</p>

        {todayTasks.length ? (
          todayTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <Empty message="Your day is clear! Add a new task to get started." />
        )}
      </section>
    </div>
  );
}