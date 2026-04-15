import React from "react";
import {
  Home as HomeIcon,
  Search,
  Library,
} from "lucide-react";
import "./SideBar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar-container p-3 d-flex flex-column h-100">
      <div className="logo mb-4">
        <h3 className="text-white fw-bold">MyMusic</h3>
      </div>

      <ul className="nav flex-column gap-3 mb-4 flex-grow-1 mt-3">
        <li className="nav-item">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab("home"); }}
            className={`nav-link d-flex align-items-center gap-3 ${activeTab === "home" ? "active" : ""}`}
          >
            <HomeIcon size={24} />
            <span className="fs-6">Home</span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab("search"); }}
            className={`nav-link d-flex align-items-center gap-3 ${activeTab === "search" ? "active" : ""}`}
          >
            <Search size={24} />
            <span className="fs-6">Search</span>
          </a>
        </li>
        <li className="nav-item">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab("library"); }}
            className={`nav-link d-flex align-items-center gap-3 ${activeTab === "library" ? "active" : ""}`}
          >
            <Library size={24} />
            <span className="fs-6">Your Library</span>
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
