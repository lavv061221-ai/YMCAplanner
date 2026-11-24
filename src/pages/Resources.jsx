
import { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Download,
  ExternalLink,
  Search,
} from "lucide-react";
import "./Resources.css";

const resources = [
  {
    id: 1,
    title: "Engineering Mechanics",
    type: "pdf",
    category: "Notes",
    file: "/resources/mechanics.pdf",
  },
  {
    id: 2,
    title: "Basic Electrical Engineering",
    type: "pdf",
    category: "Notes",
    file: "/resources/electronics.pdf",
  },
  {
    id: 3,
    title: "Material Engineering",
    type: "image",
    category: "Photos",
    file: "/resources/diagram.jpg",
  },
  {
    id: 4,
    title: "Biology",
    type: "image",
    category: "Photos",
    file: "/resources/biology.jpg",
  },
  {
    id: 5,
    title: "Digital Electronics",
    type: "pdf",
    category: "Notes",
    file: "/resources/mechanics.pdf",
  },
  {
    id: 6,
    title: "Mathematics",
    type: "pdf",
    category: "Notes",
    file: "/resources/mechanics.pdf",
  },
  {
    id: 7,
    title: "Data Structures",
    type: "pdf",
    category: "Notes",
    file: "/resources/mechanics.pdf",
  },
];

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredResources = resources.filter((item) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "PDFs" && item.type === "pdf") ||
      (filter === "Photos" && item.type === "image");

    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="resources-page">
      <div className="resources-header">
        <div>
          <span className="eyebrow">YOUR STUDY LIBRARY</span>
          <h1>Resources 📚</h1>
          <p>All your study materials in one place.</p>
        </div>
      </div>

      <div className="resources-toolbar">
        <div className="resources-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="resource-filters">
          {["All", "PDFs", "Photos"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map((item) => (
          <div className="resource-card" key={item.id}>
            <div className="resource-preview">
              {item.type === "pdf" ? (
                <FileText size={55} />
              ) : (
                <img src={item.file} alt={item.title} />
              )}
            </div>

            <div className="resource-info">
              <span className="resource-category">
                {item.category}
              </span>

              <h3>{item.title}</h3>

              <div className="resource-actions">
                <a
                  href={item.file}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-open"
                >
                  <ExternalLink size={16} />
                  Open
                </a>

                <a
                  href={item.file}
                  download
                  className="resource-download"
                  aria-label="Download resource"
                >
                  <Download size={17} />
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="empty-state">
            <p>No resources found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
