import React, { useEffect, useState } from "react";
import "../ProfilePage/ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import StopClock from "../StopClock/StopClock";
import PostList from "../PostList/PostList";

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("Asia/Kolkata");

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users/${params.userId}`;
    fetch(url)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => console.log(error));
  }, [params]);

  useEffect(() => {
    const url = "http://worldtimeapi.org/api/timezone";
    fetch(url)
      .then((response) => response.json())
      .then((list) => setCountryList(list))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="back-btn">
          <button type="submit" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
        <div className="header-right">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countryList.map((country, index) => {
              return <option key={index}>{country}</option>;
            })}
          </select>
          <StopClock country={country} />
        </div>
      </div>
      <h1 className="profile-heading">Profile Page</h1>
      <div className="profile-details">
        <div className="details-left">
          <h3>{user?.name}</h3>
          <div className="ct-phrase">
            {user?.username} | {user?.company?.catchPhrase}
          </div>
        </div>
        <div className="details-right">
          <div className="addr">
            {user?.address?.street},{user?.address?.suite},{user?.address?.city}
          </div>
          <div className="email">
            {user?.email} | {user?.phone}
          </div>
        </div>
      </div>
      <hr />
      <PostList userId={params.userId} />
    </div>
  );
};

export default ProfilePage;
