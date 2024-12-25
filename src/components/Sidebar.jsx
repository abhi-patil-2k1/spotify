import { Nav } from 'react-bootstrap';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { BsMusicNoteList, BsHeart, BsClock, BsPersonCircle, BsStars } from 'react-icons/bs';
import spotify from "../assets/spotify.png"
const Sidebar = ({ show, onHide }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${show ? 'show' : ''}`}>
      <div className="logo">
        <img src={spotify} alt="Spotify" width={40} height={40}/>
        <h3>Spotify</h3>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <BsStars />
            <span>For You</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/top-tracks" className={`nav-link ${location.pathname === '/top-tracks' ? 'active' : ''}`}>
            <BsMusicNoteList />
            <span>Top Tracks</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}>
            <BsHeart />
            <span>Favourites</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/recently-played" className={`nav-link ${location.pathname === '/recently-played' ? 'active' : ''}`}>
            <BsClock />
            <span>Recently Played</span>
          </Link>
        </Nav.Item>
      </Nav>
      <div className="profile-section">
        <div className="profile-image">
          <BsPersonCircle />
        </div>
        <div className="profile-info">
          <h4>Abhishek Patil</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
