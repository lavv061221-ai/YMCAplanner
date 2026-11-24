import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TaskProvider } from "./context/TaskContext.jsx";
import Layout from "./components/Layout.jsx";
import Resources from "./pages/Resources.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import AddTask from "./pages/AddTask.jsx";
import Categories from "./pages/Categories.jsx";
import Today from "./pages/Today.jsx";
import Upcoming from "./pages/Upcoming.jsx";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/today" element={<Today />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;