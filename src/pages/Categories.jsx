import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Empty } from "./Dashboard";
import { Folder, BookOpen, Heart, Briefcase, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Work", icon: Briefcase, color: "purple" },
  { name: "Study", icon: BookOpen, color: "blue" },
  { name: "Personal", icon: Folder, color: "orange" },
  { name: "Health", icon: Heart, color: "green" },
  { name: "Other", icon: MoreHorizontal, color: "pink" },
];

export default function Categories() {
  const { tasks } = useTasks();

  return (
    <div>
      <div className="page-intro">
        <h2>Task Categories</h2>
        <p>Organize your tasks according to different areas of life.</p>
      </div>

      <div className="category-grid">
        {categories.map(({ name, icon: Icon, color }) => {
          const list = tasks.filter((t) => t.category === name);
          const done = list.filter((t) => t.completed).length;

          return (
            <div className="category-card" key={name}>
              <div className={`category-icon ${color}`}>
                <Icon size={23} />
              </div>
              <h3>{name}</h3>
              <p>{list.length} tasks</p>
              <div className="mini-progress">
                <div style={{
                  width: `${list.length ? done / list.length * 100 : 0}%`,
                }} />
              </div>
              <small>{done} completed · {list.length - done} pending</small>
            </div>
          );
        })}
      </div>

      {categories.map(({ name }) => {
        const list = tasks.filter((t) => t.category === name);

        if (!list.length) return null;

        return (
          <section className="content-panel category-section" key={name}>
            <h2>{name}</h2>
            {list.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </section>
        );
      })}

      {!tasks.length && <Empty message="No tasks added yet." />}
    </div>
  );
}