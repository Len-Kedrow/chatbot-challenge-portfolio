import "./App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { confirmUser, setUserInfo } from "./utilities/user_auth";

import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/irish-grover";
import "@fontsource/indie-flower";

function App() {
  const [user, setUser] = useState(useLoaderData());
  const [avatar, setAvatar] = useState(user?.profile_picture)
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {/* <Navbar user={user} setUser={setUser} /> */}
      <div className="container">
        <Outlet context={{ user, setUser, avatar, setAvatar, loggedIn, setLoggedIn }} />
      </div>
    </>
  );
}

export default App;
