import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";
import VenueCard from "../components/VenueCard";
import { artists } from "../../mocks/artists.json";

const ArtistPage = () => {
  const [artist, index]  = useLoaderData(); // See below

  return (
    <section className="artist" id="artist-listing">
      <main>
        <ArtistCard index={index} artist={artist} isArtistPage={true}/>
      </main>
      <aside>
        <div className="sidebar">
          <div className="sidebar-heading">
            <h3>Management Info</h3>
          </div>
          <div className="sidebar-booking-info">
            <h4>Booking Information</h4>
            <p>{artist.booking} </p>
          </div>
          <div className="separator"></div>
          <div className="sidebar-description">
            <h4>Upcoming Concerts</h4>
            <div className="sidebar-venues">
              {artist["venues"].map((venue, index) => (
                <VenueCard key={index} venue={venue} />
              ))}
            </div>
          </div>
        </div>
        {/* Ignore the below, old code for editing or whatnot that didn't come with concern for auth */}
        {/* <div className="sidebar">
          <div className="sidebar-heading">
            <h3>Manage Profile</h3>
          </div>
          <div className="sidebar-edit-artist">
            <a className="edit-artist-but" href="edit-artist.html">
              Edit Artist
            </a>
            <button className="delete-artist-but">Delete Job</button>
          </div>
        </div> */}
      </aside>
    </section>
  );
};

// Needed for fetching of single data
const artistLoader = ({ params }) => {
  return [artists[parseInt(params.index)], params.index];
};

export { ArtistPage as default, artistLoader };
