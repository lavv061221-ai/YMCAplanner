
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

import Layout from "./components/Layout.jsx";

import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";

import Resources from "./pages/Resources.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import AddTask from "./pages/AddTask.jsx";
import Categories from "./pages/Categories.jsx";
import Today from "./pages/Today.jsx";
import Upcoming from "./pages/Upcoming.jsx";

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading your account...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public authentication pages */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Protected student pages */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/today" element={<Today />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/resources" element={<Resources />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
