import React, { useEffect, useState } from "react";
import "../PostList/PostList.css";
import Popup from "../Popup/Popup";

const PostList = ({ userId }) => {
  const [postList, setPostList] = useState([]);
  const [isPostClick, setIsPostClick] = useState(false);
  const [post, setPost] = useState();

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    fetch(url)
      .then((response) => response.json())
      .then((list) => setPostList(list))
      .catch((error) => console.log(error));
  }, [userId]);

  const handlePostClick = (post) => {
    console.log("click");
    setIsPostClick(true);
    setPost(post);
  };

  const handleClose = () => {
    console.log("close");
    setIsPostClick(false);
  };

  return (
    <>
      <div className="postlist-container">
        {postList.map((post) => {
          return (
            <div
              key={post?.id}
              className="post-container"
              onClick={() => handlePostClick(post)}
            >
              <h4 className="post-title">{post?.title}</h4>
              <div className="post-body">{post?.body}</div>
            </div>
          );
        })}
      </div>
      {isPostClick && (
        <Popup handleClose={handleClose}>
          <div className="post-container">
            <h4 className="post-title">{post?.title}</h4>
            <div className="post-body">{post?.body}</div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default PostList;
