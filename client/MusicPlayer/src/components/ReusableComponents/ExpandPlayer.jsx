import {
    Play,
    SkipBack,
    SkipForward,
    Repeat,
    Shuffle,
    Volume2,
    ChevronDown
} from "lucide-react";




const ExpandedPlayer = ({ isExpanded, onClose, selectedSong, isSongLoading }) => {
    return (
        <div className={`expanded-player-overlay d-flex flex-column ${isExpanded ? "show" : ""}`}>
            {/* Header */}
            <div className="p-4 d-flex justify-content-between align-items-center">
                <button className="btn-icon text-white" onClick={onClose}>
                    <ChevronDown size={32} />
                </button>
                <span className="text-white fw-bold small text-uppercase tracking-wider">Now Playing</span>
                <div style={{ width: 32 }}></div> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-4 w-100">
                {isSongLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center mb-5" style={{ height: "400px", width: "400px" }}>
                        <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : selectedSong ? (
                    <img
                        src={selectedSong.coverImage || `https://picsum.photos/seed/${selectedSong.id || 'current'}/400/400`}
                        alt="Album Cover"
                        className="expanded-cover shadow-lg rounded mb-5"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="expanded-cover shadow-lg rounded mb-5 bg-secondary d-flex align-items-center justify-content-center" style={{ width: "400px", height: "400px" }}>
                        <span className="text-dark">No Song Active</span>
                    </div>
                )}

                <div className="d-flex flex-column align-items-center text-center mb-4 w-100" style={{ maxWidth: "400px" }}>
                    <h2 className="text-white fw-bold mb-1">
                        {isSongLoading ? "Loading..." : selectedSong ? selectedSong.title : "Select a song"}
                    </h2>
                    <h5 className="text-secondary mb-0">
                        {isSongLoading ? "Loading..." : selectedSong ? selectedSong.artist : ""}
                    </h5>
                </div>

                <div className="w-100 mb-5" style={{ maxWidth: "400px" }}>
                    <div className="progress-container d-flex align-items-center gap-2 w-100">
                        <span className="time-text text-secondary">0:00</span>
                        <div className="progress-bar-custom flex-grow-1">
                            <div className="progress-fill" style={{ width: "0%" }}></div>
                        </div>
                        <span className="time-text text-secondary">{selectedSong ? selectedSong.duration || "0:00" : "0:00"}</span>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between w-100 mb-5 px-3" style={{ maxWidth: "400px" }}>
                    <button className="btn-icon text-secondary" disabled={!selectedSong}><Shuffle size={24} /></button>
                    <button className="btn-icon text-white" disabled={!selectedSong}><SkipBack size={32} fill="currentColor" /></button>
                    <button className="btn-play-large shadow-lg d-flex align-items-center justify-content-center rounded-circle bg-white text-dark" disabled={!selectedSong || isSongLoading}>
                        {isSongLoading ? (
                            <div className="spinner-border spinner-border-sm text-dark ms-1" role="status"></div>
                        ) : (
                            <Play size={28} fill="black" className="ms-1" />
                        )}
                    </button>
                    <button className="btn-icon text-white" disabled={!selectedSong}><SkipForward size={32} fill="currentColor" /></button>
                    <button className="btn-icon text-secondary" disabled={!selectedSong}><Repeat size={24} /></button>
                </div>
            </div>
        </div>
    );
};


export default ExpandedPlayer;