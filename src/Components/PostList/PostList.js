import React, { useEffect, useState } from "react";
import "../PostList/PostList.css";
import Popup from "../Popup/Popup";
import Skeleton from "react-loading-skeleton";

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
    setIsPostClick(true);
    setPost(post);
  };

  const handleClose = () => {
    setIsPostClick(false);
  };

  return (
    <>
      <div className="postlist-container">
        {postList.length === 0 ? (
          <>
            {[...Array(10)].map((value, index) => {
              return (
                <Skeleton
                  key={index}
                  height={200}
                  baseColor="#afafaf"
                  highlightColor="#7a7979"
                />
              );
            })}
          </>
        ) : (
          <>
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
          </>
        )}
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
