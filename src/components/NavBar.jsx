import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
    <Link to="/">
        Selector
      </Link>
      <Link  to="/tagger">
        Tagger
      </Link>
      <Link to="/uploader">
        Uploader
      </Link>

    </div>
  )
}

export default NavBar