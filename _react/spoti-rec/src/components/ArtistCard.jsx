import { Link } from "react-router-dom";

const ArtistCard = ({ index, artist, isArtistPage}) => {

  return (
    <div id={`artist-listing-no-${index}`}>
      <div className="artist-listing-header">
        <div className="artist-listing-img">
          <img src={`/${artist.img}`}></img>
        </div>
        <div className="artist-listing-banner">
          <h1 className="artist-listing-name">{artist.name}</h1>
          <div className="artist-listing-handle">
            <a href={artist.spotify}>
              <i className="fab fa-spotify"></i>
            </a>
            <a href={artist.twitter}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href={artist.insta}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href={artist.facebook}>
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="artist-listing-desc">{artist.description}</div>
      <div className="separator"></div>
      <div className="artist-listing-misc">
        <div className="artist-listing-loc">
          <i className="fa-solid fa-location-dot text-lg"></i>
          {" " + artist.location}
        </div>
        {isArtistPage ? <></> : <Link to={`/artists/${index}`} className="artist-listing-but">
          Read More
        </Link>}
      </div> 
    </div>
  );
};

export default ArtistCard;
