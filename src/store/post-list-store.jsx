import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostist = currPostList;
  if (action.type === "DELETE_POST") {
    newPostist = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostist = [action.payload, ...currPostList];
  } else if (action.type === "ADD_INITIAL_POST") {
    newPostist = action.payload.posts;
  }
  return newPostist;
};

const PostListProvider = ({ children }) => {
  const [postList, DispatchPostList] = useReducer(postListReducer, []);
  
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    DispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    DispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts: posts,
      },
    });
  };

  const deletePost = (postId) => {
    DispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

      return () => {
        controller.abort();
      }
  },[]);

  return (
    <PostList.Provider
      value={{ postList, fetching, addPost, deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
