import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;
  const todayTasks = tasks.filter((t) => t.date === today);
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <div>
      <div className="welcome-section">
        <div>
          <span className="eyebrow">YOUR PRODUCTIVITY SPACE</span>
          <h2>Welcome back! 👋</h2>
          <p>Let's make today a productive day.</p>
        </div>

        <Link to="/add-task" className="primary-button">
          <Plus size={18} /> Add New Task
        </Link>
      </div>

      <div className="stats-grid">
        <Stat
          title="Total Tasks"
          value={tasks.length}
          icon={<ListTodo />}
          color="purple"
        />
        <Stat
          title="Completed"
          value={completed}
          icon={<CheckCircle2 />}
          color="green"
        />
        <Stat
          title="Pending"
          value={pending}
          icon={<Clock />}
          color="orange"
        />
      </div>

      <div className="dashboard-grid">
        <section className="content-panel">
          <div className="section-heading">
            <div>
              <h2>Today's Tasks</h2>
              <p>Keep track of your daily activities</p>
            </div>
            <Link to="/today" className="text-link">
              View all <ArrowRight size={15} />
            </Link>
          </div>

          {todayTasks.length ? (
            todayTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <Empty message="No tasks scheduled for today." />
          )}
        </section>

        <section className="content-panel progress-panel">
          <h2>Your Progress</h2>
          <p>You're making great progress!</p>

          <div className="progress-circle" style={{
            "--progress": `${progress}%`,
          }}>
            <div>
              <strong>{progress}%</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="progress-details">
            <span>Completed tasks</span>
            <strong>{completed}</strong>
          </div>
          <div className="progress-details">
            <span>Remaining tasks</span>
            <strong>{pending}</strong>
          </div>
        </section>
      </div>

      <section className="content-panel recent-panel">
        <div className="section-heading">
          <div>
            <h2>Recent Tasks</h2>
            <p>Your latest task activities</p>
          </div>
          <Link to="/tasks" className="text-link">
            See all <ArrowRight size={15} />
          </Link>
        </div>

        {tasks.slice(-3).reverse().map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
      <footer className="dashboard-footer">
        Project made by Roll No. 25001020015 – Lavish
      </footer>

    </div>
  );
}

function Stat({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export function Empty({ message }) {
  return <div className="empty-state">📝<p>{message}</p></div>;
}