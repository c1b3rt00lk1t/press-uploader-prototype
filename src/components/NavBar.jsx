import React from 'react'
import { Link } from "react-router-dom";

const NavBar = ({readyToTagger,basicSelectorChecks, readyToOrder}) => {

  const enableOrder = !readyToOrder;
  const enableTagger = !readyToTagger;
  const enableUploader = !basicSelectorChecks;
  // const enableMerger = enableTagger && enableUploader;
  const enableMerger = false;


  return (
    <div className="navbar">
      <Link disabled={true} to="/">
        Start
      </Link>
    <Link to="/">
        Folder
      </Link>
      <Link disabled={enableOrder} to="/order">
        Order
      </Link>
      <Link disabled={enableTagger} to="/tagger">
        Tagger
      </Link>
      <Link disabled={enableUploader} to="/uploader">
        Uploader
      </Link>
      <Link disabled={enableMerger} to="/merger">
        Merger
      </Link>
      <Link disabled={true} to="/">
        Settings
      </Link>
      <Link disabled={true} to="/">
        Log in
      </Link>

    </div>
  )
}

export default NavBar