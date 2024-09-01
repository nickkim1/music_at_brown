import { useNavigate } from "react-router-dom";

const Hero = ({ isLoggedIn, isArtist }) => {

  const navigate = useNavigate();

  const onArtistSubmit = () => {
    isLoggedIn & isArtist ? navigate("/dashboard") : navigate("/signup");
  };

  const onUserSubmit = () => {
    isLoggedIn & !isArtist ? navigate("/dashboard") : navigate("/signup");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-banner">
          <h1>Looking for music [at] brown?</h1>
          <p>Look no further!</p>
        </div>
      </section>
      <section className="users-artists">
        <div className="users">
          <h2>For Users</h2>
          <p>Find your perfect artist</p>
          <button className="dash-button" onClick={onUserSubmit}>
            Explore!
          </button>
        </div>
        <div className="artists">
          <h2>For Artists</h2>
          <p>List yourself to get the perfect match</p>
          <button className="dash-button" onClick={onArtistSubmit}>
            Explore!
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
