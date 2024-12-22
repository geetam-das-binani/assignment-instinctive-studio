import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  search:"",
  page:1
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
      state.page = 1;
     
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    
  },
});

export default postSlice;
export const { setPosts, setPostLoading, resetPostErrorLoading ,deletePost,setSearchTerm,setPage} =
  postSlice.actions;
