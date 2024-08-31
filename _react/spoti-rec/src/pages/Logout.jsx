import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const [artistUsername, setArtistUsername] = useState("");
  const [artistPassword, setArtistPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const submitArtistForm = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        username: artistUsername,
        password: artistPassword,
      };

      console.log(formData);

      await fetch("http://127.0.0.1:5000/artistlogout", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((prom) => prom.json())
        .then((data) => {
          console.log(data);
          if (data["status"]=="Success") {
            setIsLoggedIn(false)
            navigate("/login")
          } else {
            setIsLoggedIn(true);
          }
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const submitUserForm = () => {};

  // I got very lazy and just applied the same styles as Login hence the classNames being the same
  return (
    <section>
      <div className="form-wrapper">
        <div className="artist-signup">
          <form className="artist-signup-form" onSubmit={submitArtistForm}>
            <h2>Artist?</h2>
            <div className="form-separator"></div>
            <p>If you're an artist, please login here.</p>
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
            <div className="form-separator"></div>
            <div className="form-input">
              <button type="login-artist-button">Logout Artist</button>
            </div>
            {invalidLogin ? <p>INVALID LOGIN</p> : <></>}
          </form>
        </div>
        <div className="user-signup">
          <form>
            <h2>User?</h2>
            <div className="form-separator"></div>
            <p>If you're not an artist, login here.</p>
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
            <div className="form-separator"></div>
            <div className="form-input">
              <button type="login-user-button">Logout User</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Logout;
