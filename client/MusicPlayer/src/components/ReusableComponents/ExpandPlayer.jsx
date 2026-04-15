import {
    Play,
    SkipBack,
    SkipForward,
    Repeat,
    Shuffle,
    Volume2,
    ChevronDown
} from "lucide-react";




const ExpandedPlayer = ({ isExpanded, onClose }) => {
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
                <img
                    src="https://picsum.photos/seed/current/400/400"
                    alt="Album Cover"
                    className="expanded-cover shadow-lg rounded mb-5"
                    referrerPolicy="no-referrer"
                />

                <div className="d-flex flex-column align-items-center text-center mb-4 w-100" style={{ maxWidth: "400px" }}>
                    <h2 className="text-white fw-bold mb-1">Midnight City</h2>
                    <h5 className="text-secondary mb-0">M83</h5>
                </div>

                <div className="w-100 mb-5" style={{ maxWidth: "400px" }}>
                    <div className="progress-container d-flex align-items-center gap-2 w-100">
                        <span className="time-text text-secondary">1:24</span>
                        <div className="progress-bar-custom flex-grow-1">
                            <div className="progress-fill" style={{ width: "35%" }}></div>
                        </div>
                        <span className="time-text text-secondary">4:03</span>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between w-100 mb-5 px-3" style={{ maxWidth: "400px" }}>
                    <button className="btn-icon text-secondary"><Shuffle size={24} /></button>
                    <button className="btn-icon text-white"><SkipBack size={32} fill="currentColor" /></button>
                    <button className="btn-play-large shadow-lg d-flex align-items-center justify-content-center rounded-circle bg-white text-dark">
                        <Play size={28} fill="black" className="ms-1" />
                    </button>
                    <button className="btn-icon text-white"><SkipForward size={32} fill="currentColor" /></button>
                    <button className="btn-icon text-secondary"><Repeat size={24} /></button>
                </div>
            </div>
        </div>
    );
};


export default ExpandedPlayer;