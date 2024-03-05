import { useContext } from "react";
import Post from "./Post";
import { PostList as postListData } from "../store/post-list-store";
import WelcomMessage from "./WelcomeMessage";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(postListData);
  const handleGetPostsClicked = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
      });
  };
  return (
    <>
      {postList.length === 0 && (
        <WelcomMessage onGetPostsClick={handleGetPostsClicked} />
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
