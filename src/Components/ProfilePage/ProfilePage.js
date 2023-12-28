import React from "react";
import "../ProfilePage/ProfilePage.css";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const params = useParams();
  return (
    <div>
      <h1>ProfilePage</h1>
      <h3>{params.userId}</h3>
    </div>
  );
};

export default ProfilePage;
