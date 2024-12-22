import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: null,
  }
 
  
  export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload
        state.loading = false
        state.error = null
      },
      setLoading: (state, action) => {
        state.loading = action.payload
      },
      
      
    },
  })
  
  export const { setUser, setLoading, } = userSlice.actions
  
  export default userSlice