import React, { useState } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  ChevronDown
} from "lucide-react";
import "./Player.css";
import ExpandedPlayer from "../ReusableComponents/ExpandPlayer"

const PlayerBar = ({ onExpand, selectedSong, isSongLoading }) => {
  const handleControlClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="player-container px-4 h-100 d-flex flex-column flex-md-row align-items-center justify-content-between"
      onClick={onExpand}
      style={{ cursor: "pointer" }}
    >
      {/* Song Info */}
      <div className="d-flex align-items-center song-info-section" style={{ minWidth: "200px" }}>
        {isSongLoading ? (
          <div className="d-flex align-items-center">
            <div className="spinner-border text-secondary" style={{ width: "40px", height: "40px" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="ms-3 overflow-hidden">
              <div className="text-white fw-bold text-truncate">Loading...</div>
            </div>
          </div>
        ) : selectedSong ? (
          <>
            <img
              src={selectedSong.coverImage || `https://picsum.photos/seed/${selectedSong.id || 'current'}/60/60`}
              alt={selectedSong.title}
              className="rounded shadow"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
              referrerPolicy="no-referrer"
            />
            <div className="ms-3 overflow-hidden">
              <div className="text-white fw-bold text-truncate">{selectedSong.title}</div>
              <div className="text-secondary small text-truncate">{selectedSong.artist}</div>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <div className="bg-secondary rounded shadow d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
              <span className="text-dark small">No Song</span>
            </div>
            <div className="ms-3 overflow-hidden">
              <div className="text-white fw-bold text-truncate">Select a song</div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div
        className="controls-section d-none d-md-flex flex-column align-items-center"
        onClick={handleControlClick}
      >
        <div className="d-flex align-items-center gap-4 mb-1">
          {/* <button className="btn-icon text-secondary">
            <Shuffle size={18} />
          </button> */}
          <button className="btn-icon text-secondary" disabled={!selectedSong || isSongLoading}>
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button className="btn-play" disabled={!selectedSong || isSongLoading}>
            {isSongLoading ? (
               <div className="spinner-border spinner-border-sm text-dark" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
            ) : (
               <Play size={20} fill="black" />
            )}
          </button>
          <button className="btn-icon text-secondary" disabled={!selectedSong || isSongLoading}>
            <SkipForward size={20} fill="currentColor" />
          </button>
          {/* <button className="btn-icon text-secondary">
            <Repeat size={18} />
          </button> */}
        </div>
        <div className="progress-container d-flex align-items-center gap-2 w-100">
          <span className="time-text">0:00</span>
          <div className="progress-bar-custom flex-grow-1">
            <div className="progress-fill" style={{ width: "0%" }}></div>
          </div>
          <span className="time-text">{selectedSong ? selectedSong.duration || "0:00" : "0:00"}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div
        className="extras-section d-none d-md-flex align-items-center justify-content-end gap-3"
        onClick={handleControlClick}
      >
        <div className="volume-bar d-flex align-items-center gap-2 w-100 justify-content-end">
          <Volume2 size={16} className="text-secondary" />
          <div className="progress-bar-custom volume-slider">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>

      {/* Mobile Mini Play Button */}
      <div className="d-md-none d-flex align-items-center" onClick={handleControlClick}>
        <button className="btn-icon text-white" disabled={!selectedSong || isSongLoading}>
          {isSongLoading ? (
            <div className="spinner-border spinner-border-sm text-light" role="status"></div>
          ) : (
            <Play size={24} fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
};



const Player = ({ selectedSong, isSongLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <PlayerBar 
        onExpand={() => setIsExpanded(true)} 
        selectedSong={selectedSong} 
        isSongLoading={isSongLoading} 
      />
      <ExpandedPlayer 
        isExpanded={isExpanded} 
        onClose={() => setIsExpanded(false)} 
        selectedSong={selectedSong}
        isSongLoading={isSongLoading}
      />
    </>
  );
};

export default Player;
