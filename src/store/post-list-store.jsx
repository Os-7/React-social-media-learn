import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostist = currPostList;
  if (action.type === "DELETE_POST") {
    newPostist = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }else if(action.type==="ADD_POST"){
    newPostist= [action.payload, ...currPostList];
  }
  return newPostist;
};

const PostListProvider = ({ children }) => {
  const [postList, DispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reaction, tags) => {
    DispatchPostList({
      type: 'ADD_POST',
      payload:{
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reaction: reaction,
        userID: userId,
        tags: tags,
      }
    })
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
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to mumbai for my vacation. Hope to enjoy a lot. Peace out.",
    reaction: 2,
    userID: "user-9",
    tags: ["vaccation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass ho bhai",
    body: "4 saal ki masti ke baad bhi hogye pass. Hard to believe.",
    reaction: 15,
    userID: "user-12",
    tags: ["Graduating", "Unbelievable"],
  },
];

export default PostListProvider;
