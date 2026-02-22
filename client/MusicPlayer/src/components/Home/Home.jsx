import React from "react";
import { Clock } from "lucide-react";
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

const Home = () => {
  return (
    <div className="home-container p-4">
      <h2 className="mb-4 fw-bold">Good morning</h2>

      {/*
      <div className="row g-3 mb-5">
        {DUMMY_SONGS.slice(0, 6).map((song) => (
          <div key={song.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card song-card-hero border-0 h-100">
              <div className="card-body p-0 d-flex align-items-center">
                <img
                  src={song.image}
                  alt={song.title}
                  className="hero-img"
                  referrerPolicy="no-referrer"
                />
                <span className="ms-3 fw-bold">{song.title}</span>
              </div>
            </div>
          </div>
        ))}
          </div>
         */}
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
        {DUMMY_SONGS.map((song, index) => (
          <div key={song.id} className="song-row d-grid px-3 py-2 rounded">
            <div className="col-index text-secondary">{index + 1}</div>
            <div className="col-title d-flex align-items-center">
              <img
                src={song.image}
                alt={song.title}
                className="song-img rounded"
                referrerPolicy="no-referrer"
              />
              <div className="ms-3 overflow-hidden">
                <div className="text-white fw-medium text-truncate">
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
        ))}
      </div>
    </div>
  );
};

export default Home;
