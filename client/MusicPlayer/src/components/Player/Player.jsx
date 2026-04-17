import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  ChevronDown
} from "lucide-react";
import "./Player.css";
import ExpandedPlayer from "../ReusableComponents/ExpandPlayer"

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const PlayerBar = ({ 
  onExpand, 
  selectedSong, 
  isSongLoading, 
  isPlaying, 
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
}) => {
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
          <button className="btn-icon text-secondary" disabled={!selectedSong || isSongLoading || !hasPrev} onClick={handlePrev}>
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button className="btn-play" disabled={!selectedSong || isSongLoading} onClick={togglePlay}>
            {isSongLoading ? (
               <div className="spinner-border spinner-border-sm text-dark" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
            ) : isPlaying ? (
               <Pause size={20} fill="black" />
            ) : (
               <Play size={20} fill="black" />
            )}
          </button>
          <button className="btn-icon text-secondary" disabled={!selectedSong || isSongLoading || !hasNext} onClick={handleNext}>
            <SkipForward size={20} fill="currentColor" />
          </button>
          {/* <button className="btn-icon text-secondary">
            <Repeat size={18} />
          </button> */}
        </div>
        <div className="progress-container d-flex align-items-center gap-2 w-100">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div 
             className="progress-bar-custom flex-grow-1" 
             onClick={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const percent = ((e.clientX - rect.left) / rect.width) * 100;
               seek(percent);
             }}
          >
            <div className="progress-fill" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div
        className="extras-section d-none d-md-flex align-items-center justify-content-end gap-3"
        onClick={handleControlClick}
      >
        <div className="volume-bar d-flex align-items-center gap-2 w-100 justify-content-end">
          <Volume2 size={16} className="text-secondary" />
          <div 
             className="progress-bar-custom volume-slider"
             onClick={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const val = (e.clientX - rect.left) / rect.width;
               setVolume(Math.max(0, Math.min(1, val)));
             }}
          >
            <div className="progress-fill" style={{ width: `${volume * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Mobile Mini Play Button */}
      <div className="d-md-none d-flex align-items-center" onClick={handleControlClick}>
        <button className="btn-icon text-white" disabled={!selectedSong || isSongLoading} onClick={togglePlay}>
          {isSongLoading ? (
            <div className="spinner-border spinner-border-sm text-light" role="status"></div>
          ) : isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
};



const Player = ({ 
  selectedSong, 
  isSongLoading, 
  isPlaying, 
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
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <PlayerBar 
        onExpand={() => setIsExpanded(true)} 
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
      <ExpandedPlayer 
        isExpanded={isExpanded} 
        onClose={() => setIsExpanded(false)} 
        selectedSong={selectedSong}
        isSongLoading={isSongLoading}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        handleNext={handleNext}
        handlePrev={handlePrev}
        currentTime={currentTime}
        duration={duration}
        seek={seek}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </>
  );
};

export default Player;
