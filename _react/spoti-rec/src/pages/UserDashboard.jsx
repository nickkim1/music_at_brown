import { useState, useEffect, useRef } from "react";

const UserDashboard = ({userUsername, userPassword}) => {

    const [userProfileImg, setUserProfileImg] = useState("");
    const [userLoc, setUserLoc] = useState("");
    const [userSpotify, setUserSpotify] = useState("");
    const [userDescription, setUserDescription] = useState("");

    const getUserProfile = async (e) => {
        try {
        let payload = { userUsername: userUsername, userPassword: userPassword };
        await fetch("http://127.0.0.1:5000/dashboard", {
            method: "GET",
            body: JSON.stringify(payload),
        })
            .then((prom) => prom.json())
            .then((data) => console.log(data));
        } catch (error) {
        console.log("ERROR");
        }
    };

    const onUserEdit = async(e) => {
        e.preventDefault();
        
        const userProfile = {
            "img": artistProfileImg,
            "username": artistUsername,
            "name": artistName,
            "loc": artistLoc,
            "description": artistDescription,
            "spotify": artistSpotify,
            "twitter": artistTwitter,
            "facebook": artistFacebook,
            "insta": artistInsta,
            "booking": bookingEmail
        }

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
        } catch(error){
            console.log(error)
        };
    };

    const onUserDelete = (e) => {
        e.preventDefault();
    };

    return (
      <>
        <section>
          <div className="form-wrapper">
            <div className="user-signup">
              <form
                className="user-signup-form"
                id="user-signup-form"
                onSubmit={onUserEdit}
              >
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
                <div className="dashboard-buttons">
                  <button className="edit" type="submit">
                    Edit Artist
                  </button>
                  <button className="delete" type="submit">
                    Delete Artist
                  </button>
                </div>
                <div className="form-separator"></div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
};

export default UserDashboard;
