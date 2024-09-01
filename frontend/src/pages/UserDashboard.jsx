import { useState, useEffect, useRef } from "react";
import UserRecommendationCard from "../components/UserRecommendationCard";

const UserDashboard = ({ userUsername, userPassword }) => {
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userLoc, setUserLoc] = useState("");
  const [userSpotify, setUserSpotify] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const getUserProfile = async (e) => {
    e.preventDefault();
    try {
      let payload = { username: userUsername, password: userPassword };
      console.log(payload);
      await fetch("http://127.0.0.1:5000/userdashboard", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json", // Add this header
        },
      })
        .then((prom) => prom.json())
        .then((data) => {
          document.getElementById("form-user-img").value =
            data["profile"]["img"];
          document.getElementById("form-user-loc").value =
            data["profile"]["location"];
          document.getElementById("user-spotify-profile").value =
            data["profile"]["spotify"];
          document.getElementById("user-description").value =
            data["profile"]["description"];
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onUserEdit = async (e) => {
    e.preventDefault();

    const userProfile = {
      img: userProfileImg,
      username: userUsername,
      loc: userLoc,
      description: userDescription,
      spotify: userSpotify,
    };

    try {
      await fetch("http://127.0.0.1:5000/edituser", {
        method: "POST",
        body: JSON.stringify(userProfile),
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

  const onUserDelete = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://127.0.0.1:5000/deleteuser", {
        method: "POST",
        body: JSON.stringify({ username: userUsername }),
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
          <div className="user-signup">
            <form className="user-signup-form" id="user-signup-form">
              <h2>User?</h2>
              <div className="form-separator"></div>
              <p>
                Edit your profile! Click the button below to fetch current
                profile info
              </p>
              <button className="dashboard-fetch" onClick={getUserProfile}>
                Fetch past profile info!
              </button>
              <div className="form-separator"></div>

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
                <button className="edit" onClick={onUserEdit}>
                  Edit User
                </button>
                <button className="delete" onClick={onUserDelete}>
                  Delete User
                </button>
              </div>
              <div className="form-separator"></div>
            </form>
          </div>
          <UserRecommendationCard userUsername={userUsername} userPassword={userPassword}/>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
