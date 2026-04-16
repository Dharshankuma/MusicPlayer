import React, { useState, useEffect } from "react";
import { Clock, Search as SearchIcon } from "lucide-react";
import "./Home.css";
import AuthService from "../../services/AuthService";

const DUMMY_SONGS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Song Title ${i + 1}`,
  artist: `Artist Name ${i + 1}`,
  album: `Album Name ${i + 1}`,
  dateAdded: `${Math.floor(Math.random() * 28) + 1} days ago`,
  duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 50) + 10}`,
  image: `https://picsum.photos/seed/${i + 100}/50/50`,
}));

const Home = ({ activeTab, onSongSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const getSongList = async () => {
    try {
      setIsLoading(true);
      console.log(searchQuery)
      const response = await AuthService.GetServiceCall(`fetchSongs?search=${searchQuery}`)
      console.log(response);
      if (response && response.success && response.data != null) {
        setSongs(response.data.data);
      }
    }
    catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getSongList();
    }, 500); // wait 500ms

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, activeTab]);

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };


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
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {songs.map((song, index) => {
              const isActive = activeTab === "home";
              return (
                <div
                  key={song.id}
                  className={`song-row d-grid px-3 py-3 rounded mb-1`}
                  onClick={() => onSongSelect && onSongSelect(song)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={`col-index fw-medium text-secondary`}>
                    {index + 1}
                  </div>
                  <div className="col-title d-flex align-items-center">
                    <img
                      src={song.coverImage || `https://picsum.photos/seed/${100}/50/50`}
                      alt={song.title}
                      className="song-img rounded"
                      referrerPolicy="no-referrer"
                    />
                    <div className="ms-3 overflow-hidden">
                      <div className={`fw-medium text-truncate text-white `}>
                        {truncateText(song.title)}
                      </div>
                      <div className="text-secondary small text-truncate">
                        {truncateText(song.artist, 40)}
                      </div>
                    </div>
                  </div>
                  <div className="col-album text-secondary d-none d-md-block text-truncate">
                    {truncateText(song.album) || "No Album"}
                  </div>
                  <div className="col-date text-secondary d-none d-lg-block">
                    {song.createdAt}
                  </div>
                  <div className="col-duration text-secondary text-end">
                    {song.duration}
                  </div>
                </div>
              );
            })}
            {songs.length === 0 && activeTab === "search" && (
              <div className="text-center text-secondary py-5">
                <h5>No songs found for "{searchQuery}"</h5>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
