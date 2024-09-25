import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar({ showToast, fetchUser }) {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        showToast("You have logged out.", "success");
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
        }, 1000);
    }
    return (
        <div className="header">
            <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">myNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" || location.pathname === "/dashboard" ? "active" : ""}`} aria-current="page" to={localStorage.getItem("token") ? "/dashboard" : "/"}>{localStorage.getItem("token") ? "Dashboard" : "Home"}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" >About Us</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") ? <div className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/register" role="button" >Register</Link>
                            <Link className="btn btn-primary mx-1" to="/login" role="button" >Login</Link>
                        </div> :
                                <div>
                                <Link className="btn btn-primary mx-1" to="/user" role="button" onClick={fetchUser}>User Detail</Link>
                                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                                </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
