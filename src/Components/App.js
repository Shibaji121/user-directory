import React from "react";
import Directory from "./DirectoryPage/Directory";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./ProfilePage/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Directory />,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
