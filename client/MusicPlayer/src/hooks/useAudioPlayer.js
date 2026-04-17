import { useState, useRef, useEffect } from "react";
import AuthService from "../services/AuthService";

export const useAudioPlayer = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  
  const audioRef = useRef(new Audio());
  const stateRef = useRef({ playlist: [], selectedSong: null });

  // Keep state sync for stale closures
  useEffect(() => {
    stateRef.current = { playlist, selectedSong };
  }, [playlist, selectedSong]);

  const playSong = async (song, newPlaylist = null) => {
    if (!song) {
      console.warn("Invalid song payload");
      return;
    }

    if (newPlaylist && Array.isArray(newPlaylist)) {
      setPlaylist(newPlaylist);
    }

    try {
      setIsSongLoading(true);
      
      if (isPlaying) {
        audioRef.current.pause();
      }

      setSelectedSong(song);

      // Keep user's custom API string
      audioRef.current.src = `http://localhost:3000/api/musicPlayer/playSong/${encodeURIComponent(song.fileName)}`;
      
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio stream:", error);
      setIsPlaying(false);
    } finally {
      setIsSongLoading(false);
    }
  };

  const handleNext = async () => {
    const { playlist: currentPlaylist, selectedSong: currentSong } = stateRef.current;
    if (!currentPlaylist.length || !currentSong) return;
    
    const currentIndex = currentPlaylist.findIndex(s => s.id === currentSong.id);
    if (currentIndex !== -1 && currentIndex < currentPlaylist.length - 1) {
      await playSong(currentPlaylist[currentIndex + 1]);
    } else {
      setIsPlaying(false); // Stop if at the end of the playlist
    }
  };

  const handlePrev = async () => {
    const { playlist: currentPlaylist, selectedSong: currentSong } = stateRef.current;
    if (!currentPlaylist.length || !currentSong) return;
    
    const currentIndex = currentPlaylist.findIndex(s => s.id === currentSong.id);
    if (currentIndex > 0) {
      await playSong(currentPlaylist[currentIndex - 1]);
    }
  };

  const togglePlay = async () => {
    if (!selectedSong) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
       console.error("Error toggling audio state:", error);
    }
  };

  // Determine availability of previous/next skips based on current payload scope natively
  const currentIndex = playlist.findIndex(s => s && selectedSong && s.id === selectedSong.id);
  const hasNext = Boolean(playlist.length && currentIndex !== -1 && currentIndex < playlist.length - 1);
  const hasPrev = Boolean(playlist.length && currentIndex > 0);

  const seek = (percent) => {
    if (!audioRef.current || !duration) return;
    const newTime = (percent / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const setVolume = (value) => {
    if (value < 0 || value > 1) return;
    audioRef.current.volume = value;
    setVolumeState(value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume; // initialize

    const handleEnded = () => {
      setIsPlaying(false);
      handleNext();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => setIsSongLoading(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleError = (e) => {
        console.error("Audio playback error:", e);
        setIsSongLoading(false);
        setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
    };
  }, []); // Empty deps because we bind once

  return {
    selectedSong,
    isPlaying,
    isSongLoading,
    playlist,
    currentTime,
    duration,
    volume,
    playSong,
    togglePlay,
    handleNext,
    handlePrev,
    seek,
    setVolume,
    hasNext,
    hasPrev
  };
};
