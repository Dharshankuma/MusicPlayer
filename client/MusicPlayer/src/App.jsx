import React, { useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
import Player from "./components/Player/Player";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Custom hook manages streaming, state, and native HTML5 Audio globally
  const { 
    selectedSong, 
    isPlaying, 
    isSongLoading, 
    playSong, 
    togglePlay, 
    handleNext, 
    handlePrev,
    currentTime,
    duration,
    volume,
    seek,
    setVolume,
    hasNext,
    hasPrev
  } = useAudioPlayer();

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
              onSongSelect={playSong}
            />
          </div>
        </div>
      </div>

      {/* Fixed Player */}
      <div className="player-wrapper fixed-bottom">
        <Player
          selectedSong={selectedSong}
          isSongLoading={isSongLoading}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          seek={seek}
          setVolume={setVolume}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </div>
    </div>
  );
}

export default App;
