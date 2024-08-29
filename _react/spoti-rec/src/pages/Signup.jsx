import { useState, useEffect, useRef} from "react";
import FormCard from "../components/FormCard";

const Signup = () => {

    const [numVenueForms, setNumVenueForms] = useState([]);
    const [venueLink, setVenueLink] = useState("");
    const [venueLoc, setVenueLoc] = useState("");
    const [venueDate, setVenueDate] = useState("");
    const [venueTime, setVenueTime] = useState("");

    const addVenueForm = (e) => {
        e.preventDefault();
        // Just arbitrary placement to increase number of forms
        setNumVenueForms((numVenueForms) => [...numVenueForms, []]);
    }

    const deleteVenueForm = (e) => {
        e.preventDefault();
        // Just arbitrary placemeent to decrease number of forms
        setNumVenueForms((numVenueForms) => numVenueForms.slice(0, -1));
        console.log(numVenueForms.length);
    }

    const [artistUsername, setArtistUsername] = useState("");
    const [artistPassword, setArtistPassword] = useState("");
    const [artistName, setArtistName] = useState("");
    const [artistProfileImg, setArtistProfileImg] = useState("");
    const [artistLoc, setArtistLoc] = useState(""); 
    const [artistSpotify, setArtistSpotify] = useState("");
    const [artistTwitter, setArtistTwitter] = useState(""); 
    const [artistFacebook, setArtistFacebook] = useState("");
    const [artistInsta, setArtistInsta] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [bookingEmail, setBookingEmail] = useState("");
    
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userProfileImg, setUserProfileImg] = useState("");
    const [userLoc, setUserLoc] = useState("");
    const [userSpotify, setUserSpotify] = useState("");
    const [userDescription, setUserDescription] = useState("");


    const onArtistSubmit = (e) => {
        e.preventDefault();

        // This is so crappy workaround for getting venue data 
        const locs = document.querySelectorAll("#artist-signup-form input");
        console.log(locs);
        
        const venueData = {}
        locs.forEach(input => { 
          let venueParts = input.id.split("-"); 
          if (venueParts[0] == "venue") {
            const venueNo = venueParts[venueParts.length - 1];
            const fieldType = venueParts.slice(0, -1).join("-");
            venueData[venueNo] = !venueData[venueNo] ? {} : venueData[venueNo]; // venue-loc, venue-date, etc.
            venueData[venueNo][fieldType] = input.value;
          }
        });

        console.log(venueData);

        //todo: create artist profile from above states & also the venue dat

    };


    const onUserSubmit = (e) => {
      e.preventDefault();

      // no reason to iterate thru the form fields, can just use the exact states
    };

    return (
      <>
        <section>
          <div className="form-wrapper">
            <div className="artist-signup">
              <form className="artist-signup-form" id="artist-signup-form" onSubmit={onArtistSubmit}>
                <h2>Artist?</h2>
                <div className="form-separator"></div>
                <p>
                  If you're an artist, please add general information for your
                  profile.
                </p>
                <div className="form-separator"></div>
                <div className="form-input">
                  <label htmlFor="form-artist-username">Username</label>
                  <input
                    id="form-artist-username"
                    name="form-artist-username"
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => setArtistUsername(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="form-artist-password">Password</label>
                  <input
                    id="form-artist-password"
                    name="form-artist-password"
                    type="text"
                    placeholder="Enter password"
                    onChange={(e) => setArtistPassword(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="form-artist-name">Name</label>
                  <input
                    id="form-artist-name"
                    name="form-artist-name"
                    type="text"
                    placeholder="Enter artist name"
                    onChange={(e) => setArtistName(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="form-artist-img">Profile Picture Link</label>
                  <input
                    id="form-artist-img"
                    name="form-artist-name"
                    type="text"
                    placeholder="http: or https: starting..."
                    onChange={(e) => setArtistProfileImg(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="form-artist-loc">Location</label>
                  <input
                    id="form-artist-loc"
                    name="form-artist-loc"
                    type="text"
                    placeholder="Insert location"
                    onChange={(e) => setArtistLoc(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <div className="form-artist-handles-link">
                    <ul>
                      <li>
                        <label htmlFor="form-handle-link-spotify">
                          Spotify Handle
                        </label>
                        <input
                          id="form-handle-link-spotify"
                          name="form-handle-link-spotify"
                          type="text"
                          placeholder="Social link..."
                          onChange={(e) => setArtistSpotify(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="form-handle-link-twitter">
                          Twitter Handle
                        </label>
                        <input
                          id="form-handle-link-twitter"
                          name="form-handle-link-twitter"
                          type="text"
                          placeholder="Social link..."
                          onChange={(e) => setArtistTwitter(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="form-handle-link-facebook">
                          Facebook Handle
                        </label>
                        <input
                          id="form-handle-link-facebook"
                          name="form-handle-link-facebook"
                          type="text"
                          placeholder="Social link..."
                          onChange={(e) => setArtistFacebook(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="form-handle-link-insta">
                          Instagram Handle
                        </label>
                        <input
                          id="form-handle-link-insta"
                          name="form-handle-link-insta"
                          type="text"
                          placeholder="Social link..."
                          onChange={(e) => setArtistInsta(e.target.value)}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="form-input">
                  <label htmlFor="artist-description">Description</label>
                  <textarea
                    id="artist-description"
                    name="artist-description"
                    rows="4"
                    cols="50"
                    wrap="physical"
                    onChange={(e) => setArtistDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-input">
                  <label htmlFor="artist-booking-info">
                    Booking Information
                  </label>
                  <input
                    type="email"
                    id="artist-booking-info"
                    name="artist-booking-info"
                    placeholder="Input booking/management email..."
                    onChange={(e) => setBookingEmail(e.target.value)}
                  />
                </div>
                <p>Please add venue information for your profile!</p>
                <div className="venue-info">
                  <ul id="venues">
                    {numVenueForms.map((venueInfo, index) => (
                      <FormCard
                        key={index}
                        index={index}
                        deleteVenueForm={deleteVenueForm}
                        setVenueLink={setVenueLink}
                        setVenueLoc={setVenueLoc}
                        setVenueDate={setVenueDate}
                        setVenueTime={setVenueTime}
                      />
                    ))}
                  </ul>
                </div>
                <button id="venue-submit" onClick={addVenueForm}>
                  +
                </button>
                <div className="form-separator"></div>
                <div className="form-input">
                  <button type="add-artist-button">Add Artist</button>
                </div>
                <div className="form-separator"></div>
              </form>
            </div>
            <div className="user-signup">
              <form className="user-signup-form" id="user-signup-form" onSubmit={onUserSubmit}>
                <h2>User?</h2>
                <div className="form-separator"></div>
                <p>
                  If you're not an artist, please fill out some general
                  information for your profile.
                </p>
                <div className="form-separator"></div>

                <div className="form-input">
                  <label htmlFor="user-name">Username</label>
                  <input
                    type="text"
                    id="user-name"
                    name="user-name"
                    placeholder="Name..."
                    onChange={(e) => setUserUsername(e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="form-user-password">Password</label>
                  <input
                    id="form-user-password"
                    name="form-user-password"
                    type="text"
                    placeholder="Enter password"
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="form-user-img">Profile Picture Link</label>
                  <input
                    id="form-user-img"
                    name="form-user-name"
                    type="text"
                    placeholder="http: or https: starting..."
                    onChange={(e) => setUserProfileImg(e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="form-user-loc">Location</label>
                  <input
                    id="form-user-loc"
                    name="form-user-loc"
                    type="text"
                    placeholder="Insert location"
                    onChange={(e) => setUserLoc(e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="user-spotify-profile">
                    Spotify Profile Link
                  </label>
                  <input
                    type="text"
                    id="user-spotify-profile"
                    name="user-spotify-profile"
                    placeholder="Spotify profile..."
                    onChange={(e) => setUserSpotify(e.target.value)}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="user-description">Description</label>
                  <textarea
                    id="user-description"
                    name="user-description"
                    rows="4"
                    cols="50"
                    wrap="physical"
                    onChange={(e) => setUserDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-separator"></div>
                <div className="form-input">
                  <button type="add-user-button">Add User</button>
                </div>
                <div className="form-separator"></div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
}

export default Signup;