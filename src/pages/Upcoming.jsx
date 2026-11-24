import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Empty } from "./Dashboard";
import { CalendarDays } from "lucide-react";

export default function Upcoming() {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  const upcoming = tasks
    .filter((task) => task.date > today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const groups = upcoming.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div>
      <div className="page-intro">
        <h2>Upcoming Tasks</h2>
        <p>Plan ahead and stay prepared for what's next.</p>
      </div>

      <div className="content-panel">
        {Object.keys(groups).length ? (
          Object.entries(groups).map(([date, dateTasks]) => (
            <div className="date-group" key={date}>
              <div className="date-group-heading">
                <CalendarDays size={18} />
                <h3>
                  {new Date(`${date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </h3>
                <span>{dateTasks.length} tasks</span>
              </div>

              {dateTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ))
        ) : (
          <Empty message="No upcoming tasks. You're all caught up!" />
        )}
      </div>
    </div>
  );
}