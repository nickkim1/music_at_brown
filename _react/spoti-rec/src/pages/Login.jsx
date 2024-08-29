import { useState } from "react";
 
const Login = () => {

    const [artistUsername, setArtistUsername] = useState("");
    const [artistPassword, setArtistPassword] = useState("");
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState(""); 

    const submitArtistForm = () => {

    }; 

    const submitUserForm = () => {

    }; 


    // Add in basic error handling-artist and user fields shouldn't both be filled in

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
                <label for="form-artist-username">Username</label>
                <input
                  id="form-artist-username"
                  name="form-artist-username"
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setArtistUsername(e.target.value)}
                />
              </div>
              <div className="form-input">
                <label for="form-artist-password">Password</label>
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
                <button type="login-artist-button">Login Artist</button>
              </div>
            </form>
          </div>
          <div className="user-signup">
            <form>
              <h2>User?</h2>
              <div className="form-separator"></div>
              <p>If you're not an artist, login here.</p>
              <div className="form-separator"></div>
              <div className="form-input">
                <label for="user-name">Username</label>
                <input
                  type="text"
                  id="user-name"
                  name="user-name"
                  placeholder="Name..."
                  onChange={(e) => setUserUsername(e.target.value)}
                />
              </div>
              <div className="form-input">
                <label for="form-user-password">Password</label>
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
                <button type="login-user-button">Login User</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
}

export default Login;