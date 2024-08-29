import { Link } from 'react-router-dom'

const Hero = () => {
    return (
      <>
        <section className="hero">
          <div className="hero-banner">
            <h1>Spotify isn't doing it for you?</h1>
            <p>Check us out!</p>
          </div>
        </section>
        <section className="users-artists">
          <div className="users">
            <h2>For Users</h2>
            <p>Find your perfect artist</p>
            <a className="dash-button" href="artists.html">
              Browse Artists
            </a>
          </div>
          <div className="artists">
            <h2>For Artists</h2>
            <p>List yourself to get the perfect match</p>
            <a className="dash-button">Add Artist</a>
          </div>
        </section>
      </>
    );
}

export default Hero;