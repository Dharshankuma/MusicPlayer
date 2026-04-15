import React, { useState } from "react";
import { Clock, Search as SearchIcon } from "lucide-react";
import "./Home.css";

const DUMMY_SONGS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Song Title ${i + 1}`,
  artist: `Artist Name ${i + 1}`,
  album: `Album Name ${i + 1}`,
  dateAdded: `${Math.floor(Math.random() * 28) + 1} days ago`,
  duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 50) + 10}`,
  image: `https://picsum.photos/seed/${i + 100}/50/50`,
}));

const Home = ({ activeTab }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = DUMMY_SONGS.filter((song) => {
    if (activeTab !== "search") return true;
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
  });

  return (
    <div className="home-container p-4">
      {activeTab === "home" && <h2 className="mb-4 fw-bold">Good morning</h2>}
      {
        <div className="search-box-container mb-4 position-relative">
          <SearchIcon className="position-absolute search-icon" size={20} />
          <input
            type="text"
            className="form-control rounded-pill search-input shadow-none"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      }

      <div className="song-list-header d-none d-md-grid mb-2 px-3">
        <div className="col-index">#</div>
        <div className="col-title">Title</div>
        <div className="col-album">Album</div>
        <div className="col-date">Date Added</div>
        <div className="col-duration text-end">
          <Clock size={16} />
        </div>
      </div>

      <hr className="border-secondary opacity-25 mb-3" />

      <div className="song-list">
        {filteredSongs.map((song, index) => {
          const isActive = activeTab === "home" && index === 0;
          return (
            <div
              key={song.id}
              className={`song-row d-grid px-3 py-3 rounded mb-1 ${isActive ? "active-song" : ""
                }`}
            >
              <div className={`col-index fw-medium ${isActive ? "text-success" : "text-secondary"}`}>
                {index + 1}
              </div>
              <div className="col-title d-flex align-items-center">
                <img
                  src={song.image}
                  alt={song.title}
                  className="song-img rounded"
                  referrerPolicy="no-referrer"
                />
                <div className="ms-3 overflow-hidden">
                  <div className={`fw-medium text-truncate ${isActive ? "text-success" : "text-white"}`}>
                    {song.title}
                  </div>
                  <div className="text-secondary small text-truncate">
                    {song.artist}
                  </div>
                </div>
              </div>
              <div className="col-album text-secondary d-none d-md-block text-truncate">
                {song.album}
              </div>
              <div className="col-date text-secondary d-none d-lg-block">
                {song.dateAdded}
              </div>
              <div className="col-duration text-secondary text-end">
                {song.duration}
              </div>
            </div>
          );
        })}
        {filteredSongs.length === 0 && activeTab === "search" && (
          <div className="text-center text-secondary py-5">
            <h5>No songs found for "{searchQuery}"</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
