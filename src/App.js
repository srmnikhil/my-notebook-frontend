import "./App.css";
import { useCallback, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound";
import NoteState from "./context/notes/NoteState";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Toast from './Components/Toast';
import Dashboard from "./pages/Dashboard";
import Footer from "./Components/Footer"
import Forgot from "./pages/Forgot";
import UserDets from "./pages/UserDets";
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const showToast = useCallback((message, type) => {
    setVisible(
      { msg: message, type }
    )
    setTimeout(() => {
      setVisible("");
    }, 3000);
  }, []);
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserDetails(data.user);
        setLoading(false);
        showToast("User fetched successfully", "success")
      } else {
        showToast("Failed to fetch user details", "danger")
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      showToast("Internal server error.", "danger");
    };
  }
  return (
    <>
      <NoteState>
        <Toast visible={visible} />
        <Router>
          <div className="app-container">
            <Navbar showToast={showToast} fetchUser={fetchUser}/>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard loading={loading} setLoading={setLoading} showToast={showToast} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login loading={loading} setLoading={setLoading} showToast={showToast} />} />
                <Route path="/register" element={<Register loading={loading} setLoading={setLoading} showToast={showToast} />} />
                <Route path="/forgotpassword" element={<Forgot loading={loading} setLoading={setLoading} showToast={showToast} />} />
                <Route path="/user" element={<UserDets loading={loading} userDetails={userDetails} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
        <SpeedInsights />
      </NoteState>
    </>
  )
}

export default App;