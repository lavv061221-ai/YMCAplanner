import { Sidebar } from "./Sidebar.jsx";
import { Header } from "./Header.jsx";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}