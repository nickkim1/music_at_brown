import NavBar from '../components/NavBar'
import { Outlet } from "react-router-dom";

const MainLayout = ({isLoggedIn}) => {
    return (
      <>
        <NavBar isLoggedIn={isLoggedIn}/>
        <Outlet />
      </>
    );
}

export default MainLayout;