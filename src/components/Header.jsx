
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Bell,
  LogOut,
  User,
  X,
} from "lucide-react";

import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const titles = {
  "/": "Dashboard",
  "/tasks": "All Tasks",
  "/add-task": "Add New Task",
  "/categories": "Categories",
  "/today": "Today's Tasks",
  "/upcoming": "Upcoming Tasks",
  "/resources": "Resources",
};

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { tasks } = useTasks();
  const { user, signOut } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const searchValue =
    location.pathname === "/tasks"
      ? searchParams.get("q") || ""
      : "";

  const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getLocalDate();

  // Pending tasks due within the next 3 days, including overdue tasks
  const notifications = tasks
    .filter((task) => {
      if (task.completed || !task.date) return false;

      const difference =
        (new Date(`${task.date}T00:00:00`).getTime() -
          new Date(`${today}T00:00:00`).getTime()) /
        (1000 * 60 * 60 * 24);

      return difference <= 3;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const handleSearch = (value) => {
    navigate(
      value.trim()
        ? `/tasks?q=${encodeURIComponent(value)}`
        : "/tasks",
      { replace: true }
    );
  };

  const handleSignOut = async () => {
    setSigningOut(true);

    const { error } = await signOut();

    setSigningOut(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/signin", { replace: true });
  };

  const studentName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Student";

  return (
    <header className="header">
      <div>
        <span className="breadcrumb">Workspace / YMCAplanner</span>
        <h1>{titles[location.pathname] || "YMCAplanner"}</h1>
      </div>

      <div className="header-actions">
        {/* Search */}
        <div className="search-box">
          <Search size={17} />
          <input
            type="search"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              aria-label="Clear search"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            className="icon-button"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          >
            <Bell size={19} />
            {notifications.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "3px",
                  right: "3px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#ef4444",
                }}
              />
            )}
          </button>

          {showNotifications && (
            <div style={dropdownStyle}>
              <div style={dropdownHeaderStyle}>
                <strong>Notifications</strong>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={closeButtonStyle}
                  aria-label="Close notifications"
                >
                  <X size={16} />
                </button>
              </div>

              {notifications.length === 0 ? (
                <p style={emptyStyle}>You're all caught up!</p>
              ) : (
                notifications.slice(0, 5).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate(
                        `/tasks?q=${encodeURIComponent(task.title)}`
                      );
                    }}
                    style={notificationItemStyle}
                  >
                    <strong>{task.title}</strong>
                    <span style={{ fontSize: "12px", color: "#888" }}>
                      {task.date < today
                        ? "Overdue"
                        : task.date === today
                          ? "Due today"
                          : `Due ${task.date}`}
                    </span>
                  </button>
                ))
              )}

              {notifications.length > 5 && (
                <p style={emptyStyle}>
                  And {notifications.length - 5} more tasks
                </p>
              )}
            </div>
          )}
        </div>

        {/* Student Profile */}
        <div style={{ position: "relative" }}>
          <button
            className="avatar"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            aria-label="Student profile"
            style={{ border: "none", cursor: "pointer" }}
          >
            {studentName.charAt(0).toUpperCase()}
          </button>

          {showProfile && (
            <div style={dropdownStyle}>
              <div style={dropdownHeaderStyle}>
                <strong>My Account</strong>
                <button
                  onClick={() => setShowProfile(false)}
                  style={closeButtonStyle}
                  aria-label="Close profile"
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ padding: "12px 14px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    marginBottom: "8px",
                  }}
                >
                  <User size={18} />
                  <strong>{studentName}</strong>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    overflowWrap: "anywhere",
                    margin: 0,
                  }}
                >
                  {user?.email}
                </p>
              </div>

              <button
                onClick={handleSignOut}
                disabled={signingOut}
                style={signOutButtonStyle}
              >
                <LogOut size={16} />
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const dropdownStyle = {
  position: "absolute",
  top: "48px",
  right: 0,
  width: "260px",
  maxWidth: "85vw",
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  zIndex: 1000,
  overflow: "hidden",
};

const dropdownHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "13px 14px",
  borderBottom: "1px solid #eee",
};

const closeButtonStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
};

const emptyStyle = {
  padding: "15px",
  fontSize: "13px",
  color: "#888",
  textAlign: "center",
};

const notificationItemStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "5px",
  padding: "12px 14px",
  border: "none",
  borderBottom: "1px solid #eee",
  background: "#fff",
  cursor: "pointer",
  textAlign: "left",
};

const signOutButtonStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "9px",
  padding: "13px 14px",
  border: "none",
  borderTop: "1px solid #eee",
  background: "#fff",
  color: "#dc2626",
  cursor: "pointer",
  textAlign: "left",
};
