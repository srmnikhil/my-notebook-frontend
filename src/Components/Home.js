import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container my-2">
      <div className="row">
      <h2 className='text-center'>Welcome to myNotebook</h2>
        <div className="col-md-6">
          <img
            src="/Logo.jpg"
            alt="Home Us"
            className="img-fluid rounded"
           style={{height: "30rem"}}/>
        </div>
        <div className="col-md-6">
          <p>
            myNotebook is a user-friendly platform where individuals can
            register, log in, and manage their personal notes securely on our
            cloud network. Whether you're organizing your thoughts, jotting down
            important reminders, or keeping track of tasks, myNotebook provides
            a seamless experience across all your devices.
          </p>
          <h4>Features:</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Register:</strong> Sign up with your email and create an
              account easily.
            </li>
            <li className="list-group-item">
              <strong>Login:</strong> Securely log in using your credentials to
              access your saved notes.
            </li>
            <li className="list-group-item">
              <strong>Save Notes:</strong> Store your notes on our cloud network
              and access them from anywhere at any time, ensuring your data is safe and always accessible.
            </li>
            <li className="list-group-item">
              <strong>Access Anywhere:</strong> Use your credentials to log in
              from any device and view or edit your notes.
            </li>
          </ul>
          <p className="my-1">
            Your notes, your control. Register today and start managing your
            notes effortlessly.
          </p>
          <div className='d-flex justify-content-center'>
          {localStorage.getItem("token") ? <Link to="/dashboard" className="btn btn-primary">
            Dashboard
          </Link> : <Link to="/register" className="btn btn-primary">
            Register Now
          </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
