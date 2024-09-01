import { artists } from '../../mocks/artists.json'; 
import ArtistCard from './ArtistCard';

const ArtistListings = () => {

    return (
      <section className="browser">
        <div className="browser-banner">
          <h2>Recent Artists</h2>
        </div>
        <div className="browser-artist-listings">
          {artists.map((artist, index) => (
            <ArtistCard key={index} index={index} artist={artist} isArtistPage={false}/>
          ))}
        </div>
      </section>
    );
}

export default ArtistListings;