import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPostPage from "./pages/EditPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddPostPage from "./pages/AddPostPage";
import ProfilePage from "./pages/ProfilePage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoading, setUser } from "./reducers/userReducer";
import ProtectedRoute from "./protected/ProtectedRoute";
import { baseUrl } from "./constants/constant";


const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${baseUrl}/api/v1/me`, {
        withCredentials: true,
      });
      const { data: response } = res;

      if (response.success) {
        dispatch(setUser(response.user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, [user]);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditPostPage showAddButton={false} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-post"
        element={
          <ProtectedRoute>
            <AddPostPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <p>
            <h1>404 Page Not Found</h1>
          </p>
        }
      />
    </Routes>
  );
};

export default App;
