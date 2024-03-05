import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
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
  }else if(action.type === "ADD_INITIAL_POST"){
    newPostist = action.payload.posts
  }
  return newPostist;
};

const PostListProvider = ({ children }) => {
  const [postList, DispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, postBody, reaction, tags) => {
    DispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reaction: reaction,
        userID: userId,
        tags: tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    DispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts: posts
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

  return (
    <PostList.Provider value={{ postList, addPost, addInitialPosts, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
