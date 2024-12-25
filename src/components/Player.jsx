import { useRef, useEffect, useState } from 'react';
import { 
  BsPlayFill, 
  BsPauseFill, 
  BsSkipBackwardFill, 
  BsSkipForwardFill, 
  BsThreeDotsVertical, 
  BsVolumeUp,
  BsChevronLeft,
  BsList
} from 'react-icons/bs';
import { getImageColors } from '../utils/colorUtils';

const Player = ({ song, isPlaying, setIsPlaying, onToggleSidebar, playNext, playPrevious }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleAddToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isAlreadyFavorite = storedFavorites.some(fav => fav.id === song.id);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...storedFavorites, song];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert(`${song.title} has been added to your favorites.`);
    } else {
      alert(`${song.title} is already in your favorites.`);
    }
  };

  useEffect(() => {
    if (song?.cover) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = song.cover;
      img.onload = () => {
        getImageColors(img).then(colors => {
          document.documentElement.style.setProperty('--color-primary', colors.primary);
          document.documentElement.style.setProperty('--color-vibrant', colors.vibrant);
          document.documentElement.style.setProperty('--color-muted', colors.muted);
        });
      };
    }
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(duration);
    setProgress((current / duration) * 100);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.offsetLeft) / progressBar.offsetWidth;
    const newTime = clickPosition * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
<div className="player">
      <div className="player-header-main">
        <div className="player-header">
          <button className="back-button" onClick={onToggleSidebar}>
            <BsChevronLeft />
          </button>
          <div className="song-title">
            <h1>{song.title}</h1>
            <p>{song.artist}</p>
          </div>
          <button className="menu-button" onClick={onToggleSidebar}>
            <BsList />
          </button>
        </div>
      </div>
      <div className="player-content">
        <div className="cover-art">
          <img src={song.cover} alt={song.title} />
        </div>
      </div>

      <div className="player-controls">
        <div className="progress-container">
          <div className="time-info">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="controls">
          <button className="control-btn more" onClick={handleAddToFavorites}>
            <BsThreeDotsVertical />
          </button>
          <div className="controls-center">
            <button className="control-btn" onClick={playPrevious}>
              <BsSkipBackwardFill />
            </button>
            <button className="control-btn play" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
            </button>
            <button className="control-btn" onClick={playNext}>
              <BsSkipForwardFill />
            </button>
          </div>
          <button className="control-btn volume" onClick={playNext}>
            <BsVolumeUp />
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;
