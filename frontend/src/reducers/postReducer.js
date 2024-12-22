import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  search:"",
};
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPostLoading: (state, action) => {
      state.loading = action.payload;
    },
   
    resetPostErrorLoading: (state) => {
      state.loading = false;
      state.error = null;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    setSearchTerm: (state, action) => {
      state.search = action.payload;
     
    },
    
  },
});

export default postSlice;
export const { setPosts, setPostLoading, resetPostErrorLoading ,deletePost,setSearchTerm} =
  postSlice.actions;
