import { useState, useEffect, useRef } from "react";
import FormCard from "../components/FormCard";
import ArtistRecommendationCard from "../components/ArtistRecommendationCard";

const ArtistDashboard = ({ artistUsername, artistPassword }) => {
  const [numVenueForms, setNumVenueForms] = useState([]);
  const [venueLink, setVenueLink] = useState("");
  const [venueLoc, setVenueLoc] = useState("");
  const [venueDate, setVenueDate] = useState("");
  const [venueTime, setVenueTime] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistProfileImg, setArtistProfileImg] = useState("");
  const [artistLoc, setArtistLoc] = useState("");
  const [artistSpotify, setArtistSpotify] = useState("");
  const [artistTwitter, setArtistTwitter] = useState("");
  const [artistFacebook, setArtistFacebook] = useState("");
  const [artistInsta, setArtistInsta] = useState("");
  const [artistDescription, setArtistDescription] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");

  const addVenueForm = (e) => {
    e.preventDefault();
    setNumVenueForms((numVenueForms) => [...numVenueForms, []]);
  };

  const deleteVenueForm = (e) => {
    e.preventDefault();
    setNumVenueForms((numVenueForms) => numVenueForms.slice(0, -1));
  };

  // This is so hacky
  const getArtistProfile = async (e) => {
    e.preventDefault();
    try {
      let payload = { username: artistUsername, password: artistPassword };
      await fetch("http://127.0.0.1:5000/artistdashboard", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json", // Add this header
        },
      })
        .then((prom) => prom.json())
        .then((data) => {
          document.getElementById("form-artist-img").value =
            data["profile"]["img"];
          document.getElementById("form-artist-name").value =
            data["profile"]["name"];
          document.getElementById("form-artist-loc").value =
            data["profile"]["location"];
          document.getElementById("form-handle-link-spotify").value =
            data["profile"]["spotify"];
          document.getElementById("form-handle-link-twitter").value =
            data["profile"]["twitter"];
          document.getElementById("form-handle-link-facebook").value =
            data["profile"]["facebook"];
          document.getElementById("form-handle-link-insta").value =
            data["profile"]["insta"];
          document.getElementById("artist-description").value =
            data["profile"]["description"];
          document.getElementById("artist-booking-info").value =
            data["profile"]["booking"];

          setNumVenueForms(data["profile"]["venues"]);
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const onArtistEdit = async (e) => {
    e.preventDefault();

    // Fetch all the relevant venues
    const locs = document.querySelectorAll("#artist-signup-form input");

    const venueData = {};
    locs.forEach((input) => {
      let venueParts = input.id.split("-");
      if (venueParts[0] == "venue") {
        const venueNo = venueParts[venueParts.length - 1];
        const fieldType = venueParts.slice(0, -1).join("-");
        venueData[venueNo] = !venueData[venueNo] ? {} : venueData[venueNo]; // venue-loc, venue-date, etc.
        venueData[venueNo][fieldType] = input.value;
      }
    });

    const artistProfile = {
      img: artistProfileImg,
      username: artistUsername,
      name: artistName,
      loc: artistLoc,
      description: artistDescription,
      spotify: artistSpotify,
      twitter: artistTwitter,
      facebook: artistFacebook,
      insta: artistInsta,
      booking: bookingEmail,
      venues: venueData,
    };

    try {
      await fetch("http://127.0.0.1:5000/editartist", {
        method: "POST",
        body: JSON.stringify(artistProfile),
        headers: {
          "Content-Type": "application/json", // Add this header
        },
      })
        .then((prom) => prom.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onArtistDelete = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://127.0.0.1:5000/deleteartist", {
        method: "POST",
        body: JSON.stringify({ username: artistUsername }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((prom) => prom.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className="form-wrapper">
          <div className="artist-signup">
            <form className="artist-signup-form" id="artist-signup-form">
              <h2>Artist?</h2>
              <div className="form-separator"></div>
              <p>
                Edit your profile! Click the button below to fetch current
                profile info
              </p>
              <button className="dashboard-fetch" onClick={getArtistProfile}>
                Fetch past profile info!
              </button>
              <div className="form-separator"></div>
              <div className="form-input">
                <label htmlFor="form-artist-name">Name</label>
                <input
                  id="form-artist-name"
                  name="form-artist-name"
                  type="text"
                  placeholder={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="form-artist-img">Profile Picture Link</label>
                <input
                  id="form-artist-img"
                  name="form-artist-img"
                  type="text"
                  placeholder={artistProfileImg}
                  onChange={(e) => setArtistProfileImg(e.target.value)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="form-artist-loc">Location</label>
                <input
                  id="form-artist-loc"
                  name="form-artist-loc"
                  type="text"
                  placeholder={artistLoc}
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
                        placeholder={artistSpotify}
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
                        placeholder={artistTwitter}
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
                        placeholder={artistFacebook}
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
                        placeholder={artistInsta}
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
                <label htmlFor="artist-booking-info">Booking Information</label>
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
                      packet={venueInfo}
                    />
                  ))}
                </ul>
              </div>
              <button id="venue-submit" onClick={addVenueForm}>
                +
              </button>
              <div className="form-separator"></div>
              <div className="dashboard-buttons">
                <button className="edit" onClick={onArtistEdit}>
                  Edit Artist
                </button>
                <button className="delete" onClick={onArtistDelete}>
                  Delete Artist
                </button>
              </div>
              <div className="form-separator"></div>
            </form>
          </div>
          <ArtistRecommendationCard artistUsername={artistUsername} artistPassword={artistPassword}/>
        </div>
      </section>
    </>
  );
};

export default ArtistDashboard;
