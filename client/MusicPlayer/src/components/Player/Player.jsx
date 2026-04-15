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

const PlayerBar = ({ onExpand }) => {
  const handleControlClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="player-container px-4 h-100 d-flex flex-column flex-md-row align-items-center justify-content-between"
      onClick={onExpand}
    >
      {/* Song Info */}
      <div className="d-flex align-items-center song-info-section">
        <img
          src="https://picsum.photos/seed/current/60/60"
          alt="Current Song"
          className="rounded shadow"
          referrerPolicy="no-referrer"
        />
        <div className="ms-3 overflow-hidden">
          <div className="text-white fw-bold text-truncate">Midnight City</div>
          <div className="text-secondary small text-truncate">M83</div>
        </div>
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
          <button className="btn-icon text-secondary">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button className="btn-play">
            <Play size={20} fill="black" />
          </button>
          <button className="btn-icon text-secondary">
            <SkipForward size={20} fill="currentColor" />
          </button>
          {/* <button className="btn-icon text-secondary">
            <Repeat size={18} />
          </button> */}
        </div>
        <div className="progress-container d-flex align-items-center gap-2 w-100">
          <span className="time-text">1:24</span>
          <div className="progress-bar-custom flex-grow-1">
            <div className="progress-fill" style={{ width: "35%" }}></div>
          </div>
          <span className="time-text">4:03</span>
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
        <button className="btn-icon text-white">
          <Play size={24} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};



const Player = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <PlayerBar onExpand={() => setIsExpanded(true)} />
      <ExpandedPlayer isExpanded={isExpanded} onClose={() => setIsExpanded(false)} />
    </>
  );
};

export default Player;
