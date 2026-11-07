import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { confirmUser } from "./utilities/user_auth.jsx";
import Homepage from "./pages/Homepage";

import Signup from "./pages/user_auth/Signup";
import Login from "./pages/user_auth/Login";

import Profile from "./pages/profile/Profile.jsx";
import Character from "./pages/profile/Character.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";
import Environment from "./pages/Environment.jsx";
import Game from "./pages/game/Game";
import Map from "./pages/Map.jsx";
import CharacterStats from "./components/game/CharacterStats.jsx";
import CreateAChar from "./pages/game/CreateAChar.jsx";
import Temp from "./pages/Temp.jsx";
import ChatPage from "./pages/game/ChatPage.jsx";

// Import the CharacterCreationBox component


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: confirmUser,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "character",
        element: <CharacterPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/:id",
        element: <Character />,
      },
      {
        path: "player",
        element: <PlayerPage />,
      },
      {
        path: "environment",
        element: <Environment />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "game/character-creation",
        element: <CreateAChar />
      },
      // {
      //   path: "game/character-creation",
      //   element: <CharacterCreationBox />
      // },
      {
        path: "game/character-stats",
        element: <CharacterStats />
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "temp",
        element: <Temp />
      },
      {
        path: "chat-window",
        element: <ChatPage />
      }

      
    ],
    // errorElement: <Error />
  },
]);

export default router;
