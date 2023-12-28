import React, { useEffect, useState } from "react";
import "../PostList/PostList.css";

const PostList = ({ userId }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    fetch(url)
      .then((response) => response.json())
      .then((list) => setPostList(list))
      .catch((error) => console.log(error));
  }, [userId]);
  return (
    <div className="postlist-container">
      {postList.map((post) => {
        return (
          <div key={post?.id} className="post-container">
            <h4 className="post-title">{post?.title}</h4>
            <div className="post-body">{post?.body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
