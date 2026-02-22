import React from "react";
import {
  Home as HomeIcon,
  Search,
  Library,
  PlusSquare,
  Heart,
} from "lucide-react";
import "./SideBar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container p-3">
      <div className="logo mb-4">
        <h3 className="text-white fw-bold">MyMusic</h3>
      </div>

      <ul className="nav flex-column mb-4">
        <li className="nav-item">
          <a
            href="#"
            className="nav-link active d-flex align-items-center gap-3"
          >
            <HomeIcon size={24} />
            <span>Home</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link d-flex align-items-center gap-3">
            <Search size={24} />
            <span>Search</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link d-flex align-items-center gap-3">
            <Library size={24} />
            <span>Your Library</span>
          </a>
        </li>
      </ul>

      <div className="sidebar-actions">
        <button className="btn-sidebar d-flex align-items-center gap-3 mb-3">
          <div className="icon-box bg-secondary">
            <PlusSquare size={16} />
          </div>
          <span>Create Playlist</span>
        </button>
        <button className="btn-sidebar d-flex align-items-center gap-3">
          <div className="icon-box bg-gradient-heart">
            <Heart size={16} fill="white" />
          </div>
          <span>Liked Songs</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
