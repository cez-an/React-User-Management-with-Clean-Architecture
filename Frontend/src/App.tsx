import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Signup from "./Components/Pages/Signup/SignUp";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import ProfileEdit from "./Components/Pages/Profile edit/ProfileEdit";
import AdminLogin from "./Components/Pages/AdminLogin/AdminLogin";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";
import AdminDashboard from "./Components/Pages/AdminHome/AdminDashboard";
import PublicAdminProtectedRoute from "./Routes/PublicAdminProtectedRoute";
// import { useEffect } from "react";
// import { useAppDispatch } from "./hooks";
// import { fetchCurrentUser } from "./features/auth/authSlice";

function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);

  return (
    <>
      <Routes>

        <Route path="/signup" element={ <PublicRoute> <Signup /> </PublicRoute> } />

        <Route path="/login" element={ <PublicRoute> <Login /> </PublicRoute>   } />

        <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />

        <Route path="/profile/edit" element={ <ProtectedRoute> <ProfileEdit /> </ProtectedRoute> } />

        <Route path="/admin/login" element={ <PublicAdminProtectedRoute> <AdminLogin /> </PublicAdminProtectedRoute> } />

        <Route path="/admin/dashboard" element={ <AdminProtectedRoute> <AdminDashboard /> </AdminProtectedRoute> } />
        
      </Routes>
    </>
  );
}

export default App;
