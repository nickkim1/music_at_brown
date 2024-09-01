import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = ( {isLoggedIn} ) => {

  const [isOpen, setIsOpen] = useState(false);

  // Toggle to opposite
  const toggleMenuBars = () => {
    setIsOpen(!isOpen);
  };

  //Set window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Query the backend to see if the user or artist is logged in yet
  const toggleLoggedIn = async(e) => {
    e.preventDefault();
    try{ 
      await fetch("http://127.0.0.1:5000/login", {
        method: "GET"
      }).then((prom) => prom.json()).then((data) => console.log(data));
    } catch(error) {
      console.log("Error", error);
    }
  }


  return (
    <>
      <nav className="navbar">
        <div className="nav-toggle" onClick={toggleMenuBars}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="navbar-wrapper">
          <div className="logo-sidebar">
            <NavLink to="/">Music@Brown</NavLink>
          </div>
          <div className="navbar-sidebar">
            <NavLink to="/" className="navbar-option">
              Home
            </NavLink>
            <NavLink to="/artists" className="navbar-option">
              Artists
            </NavLink>
            {isLoggedIn ? (
              <NavLink to="/dashboard" className="navbar-option">
                Dashboard
              </NavLink>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <NavLink to="/logout" className="navbar-option">
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login" className="navbar-option">
                Login
              </NavLink>
            )}
            {isLoggedIn ? (
              <></>
            ) : (
              <NavLink to="/signup" className="navbar-option">
                Signup
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Conditional rendering of a navigation menu upon 'too small' - media query triggered when <768px */}
      <ul className={`nav-menu-${isOpen ? "open" : "hidden"}`}>
        <li>
          <NavLink to="/" className="navbar-option">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/artists" className="navbar-option">
            Artists
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to="/dashboard" className="navbar-option">
              Dashboard
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <li>
            <NavLink to="/logout" className="navbar-option">
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login" className="navbar-option">
              Login
            </NavLink>
          </li>
        )}
        {isLoggedIn ? (
          <></>
        ) : (
          <li>
            <NavLink to="/signup" className="navbar-option">
              Signup
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavBar;
