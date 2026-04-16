import React, { useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
import Player from "./components/Player/Player";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSong, setSelectedSong] = useState(null);
  const [isSongLoading, setIsSongLoading] = useState(false);

  return (
    <div className="app-container bg-dark text-light">
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 h-100">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 d-none d-md-block sidebar-wrapper">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9 col-lg-10 main-content">
            <Home 
              activeTab={activeTab} 
              onSongSelect={(song) => {
                setSelectedSong(song);
                setIsSongLoading(true);
                // Simulate loading when song is selected
                setTimeout(() => setIsSongLoading(false), 1500); 
              }} 
            />
          </div>
        </div>
      </div>

      {/* Fixed Player */}
      <div className="player-wrapper fixed-bottom">
        <Player selectedSong={selectedSong} isSongLoading={isSongLoading} />
      </div>
    </div>
  );
}

export default App;
