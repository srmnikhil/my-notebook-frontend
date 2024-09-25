import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <Link to="/" className='logo'>myNotebook</Link> 
        <p>This tool is developed by Mr. Nikhil Sharma <br /> You can reach me out at <a href="https://github.com/srmnikhil" target='_blank' rel='noreferrer'><img className="github-logo" src="/github-mark-white.png" alt="" /></a></p>
        <p>Copyright @ 2024</p>
    </div>
  )
}
