import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const Login = ( {artistUsername, 
                setArtistUsername, 
                artistPassword, 
                setArtistPassword, 
                userUsername, 
                userPassword, 
                setUserUsername, 
                setUserPassword,
                setIsLoggedIn, 
                isArtist,
                setIsArtist} ) => {

    const [invalidLogin, setInvalidLogin] = useState(false);

    const navigate = useNavigate();

    const submitArtistForm = async (e) => {
      e.preventDefault();

      try {

        const formData = {
          username: artistUsername,
          password: artistPassword,
          isArtist: true
        };

        await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((prom) => prom.json())
          .then((data) => { 
            console.log(data); 
            data['status']=='Invalid' ? setInvalidLogin(true) : setInvalidLogin(false); 
            if (data['status']=='Success') {
              setIsLoggedIn(true);
              navigate("/");
              setIsArtist(true);
            } else {
              setIsLoggedIn(false); 
            }
          });

      } catch (error) {
        console.log("Error", error);
      }
    }; 

    const submitUserForm = async(e) => {
      e.preventDefault();

      try {

        const formData = {
          username: userUsername,
          password: userPassword,
          isArtist: false
        };

        await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((prom) => prom.json())
          .then((data) => { 
            console.log(data); 
            data['status']=='Invalid' ? setInvalidLogin(true) : setInvalidLogin(false); 
            if (data['status']=='Success') {
              setIsLoggedIn(true);
              navigate("/");
              setIsArtist(false);
            } else {
              setIsLoggedIn(false); 
            }
          });
      } catch (error) {
        console.log("Error", error);
      }
    }; 


    // Add in basic error handling-artist and user fields shouldn't both be filled in

    return (
      <section>
        <div className="form-wrapper">
          <div className="artist-signup">
            <form className="artist-signup-form" onSubmit={submitArtistForm}>
              <h2>Artist?</h2>
              <div className="form-separator"></div>
              <p>
                If you're an artist, please login here.
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
              <div className="form-separator"></div>
              <div className="form-input">
                <button type="login-artist-button">Login Artist</button>
              </div>
              {isArtist & invalidLogin ? <p>INVALID LOGIN</p> : <></>}
            </form>
          </div>
          <div className="user-signup">
            <form className="user-signup-form" onSubmit={submitUserForm}>
              <h2>User?</h2>
              <div className="form-separator"></div>
              <p>
                If you're not an artist, please login here. Authorize Spotify to
                fetch your data.
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
              <div className="form-separator"></div>
              <div className="form-input">
                <button type="login-user-button">Login User</button>
              </div>
              {!isArtist & invalidLogin ? <p>INVALID LOGIN</p> : <></>}
            </form>
          </div>
        </div>
      </section>
    );
}

export default Login;

// Relevant docs: 
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask