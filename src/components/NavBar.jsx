import React from 'react'
import { Link } from "react-router-dom";

const NavBar = ({readyToTagger,basicSelectorChecks}) => {

  const enableTagger = !readyToTagger;
  const enableUploader = !basicSelectorChecks;
  const enableMerger = enableTagger && enableUploader;

  return (
    <div className="navbar">
    <Link to="/">
        Selector
      </Link>
      <Link to="/order">
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

    </div>
  )
}

export default NavBar