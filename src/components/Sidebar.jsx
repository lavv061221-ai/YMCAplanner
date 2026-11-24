import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  BookOpen,
  Folder,
  Sun,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "All Tasks", path: "/tasks", icon: ListTodo },
  { name: "Add Task", path: "/add-task", icon: PlusCircle },
  { name: "Resources", path: "/resources", icon: BookOpen },
  { name: "Categories", path: "/categories", icon: Folder },
  { name: "Today's Tasks", path: "/today", icon: Sun },
  { name: "Upcoming", path: "/upcoming", icon: CalendarDays },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <CheckCircle2 size={25} />
        </div>
        <div>
          <h2>YMCAplanner</h2>
          <span>Plan your day better</span>
        </div>
      </div>

      <p className="nav-label">MENU</p>

      <nav className="navigation">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-message">
          <div className="message-icon">✨</div>
          <h4>Stay productive!</h4>
          <p>Small steps lead to big achievements.</p>
        </div>
        <p className="sidebar-footer">© 2026 YMCAplanner</p>
      </div>
    </aside>
  );
}