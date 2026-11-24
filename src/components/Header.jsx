import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const titles = {
  "/": "Dashboard",
  "/tasks": "All Tasks",
  "/add-task": "Add New Task",
  "/categories": "Categories",
  "/today": "Today's Tasks",
  "/upcoming": "Upcoming Tasks",
};

export function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div>
        <span className="breadcrumb">Workspace / YMCAplanner</span>
        <h1>{titles[location.pathname] || "YMCAplanner"}</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Search tasks..." />
        </div>
        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
        </button>
        <div className="avatar">Y</div>
      </div>
    </header>
  );
}