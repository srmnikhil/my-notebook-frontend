import "./App.css";
import { useCallback, useState } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Toast from './Components/Toast';
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer"
import Forgot from "./Components/Forgot";
import UserDets from "./Components/UserDets";

function App() {
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
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserDetails(data.user);
        showToast("User fetched successfully", "success")
      } else{
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
            <Navbar showToast={showToast} fetchUser={fetchUser} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard showToast={showToast} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login showToast={showToast} />} />
                <Route path="/register" element={<Register showToast={showToast} />} />
                <Route path="/forgotpassword" element={<Forgot showToast={showToast} />} />
                <Route path="/user" element={<UserDets userDetails={userDetails}/>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App;