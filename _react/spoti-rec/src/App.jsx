import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage";
import ArtistsPage from "./pages/ArtistsPage";
import ArtistPage, { artistLoader } from "./pages/ArtistPage";
import Login from "./pages/Login";
import Signup from './pages/Signup'

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route
          path="/artists/:index"
          element={<ArtistPage />}
          loader={artistLoader}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;