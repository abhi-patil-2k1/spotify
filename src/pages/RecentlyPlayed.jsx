import { useState, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { songs } from '../data/songs';

const TopTracks = ({ setCurrentSong }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAllSongs(songs);
  }, []);

  const handleFavorite = (song) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some(fav => fav.id === song.id);

    if (isFavorite) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter(fav => fav.id !== song.id))
      );
    } else {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, song])
      );
    }
  };

  const handlePlay = (song) => {
    setCurrentSong(song);
    const recentlyPlayed = JSON.parse(sessionStorage.getItem('recentlyPlayed') || '[]');
    const updatedRecent = [
      song,
      ...recentlyPlayed.filter(track => track.id !== song.id)
    ].slice(0, 10);
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
  };

  const filteredSongs = allSongs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recently-played">
      <h2>Recently Played</h2>
      <div className="songs-list">
        {filteredSongs.map(song => (
          <div key={song.id} className="song-item" onClick={() => handlePlay(song)}>
            <img src={song.cover} alt={song.title} className="cover" />
            <div className="details">
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
            <span className="duration">{song.duration}</span>
            <button 
              className="more-options"
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(song);
              }}
            >
              <BsThreeDotsVertical />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;
