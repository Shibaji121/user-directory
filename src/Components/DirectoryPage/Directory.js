import React, { useEffect, useState } from "react";
import "../DirectoryPage/Directory.css";
import { Link } from "react-router-dom";

const Directory = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => response.json())
      .then((users) => setUserList(users))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="homepage">
      <h1 className="header">Directory</h1>
      <div className="user-list">
        {userList.map((user) => {
          return <UserDetail key={user?.id} user={user} />;
        })}
      </div>
    </div>
  );
};

const UserDetail = ({ user }) => {
  const [postCount, setPostCount] = useState();

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
    fetch(url)
      .then((response) => response.json())
      .then((posts) => setPostCount(posts.length))
      .catch((error) => console.log(error));
  }, [user]);
  return (
    <>
      <Link to={`/profile/${user.id}`} className="user-item">
        <div>Name: {user?.name}</div>
        <div>Posts: {postCount}</div>
      </Link>
    </>
  );
};

export default Directory;
