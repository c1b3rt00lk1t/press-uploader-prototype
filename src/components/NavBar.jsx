import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PressUploaderContext from "../contexts/PressUploaderContext";

const NavBar = () => {
  const {
    readyToTagger, basicSelectorChecks, readyToOrder
  } = useContext(PressUploaderContext);
  const enableOrder = !readyToOrder;
  const enableTagger = !readyToTagger;
  const enableUploader = !basicSelectorChecks;
  // const enableMerger = enableTagger && enableUploader;
  const enableMerger = false;

  return (
    <div className="navbar">
      <Link to="/">Start</Link>
      <Link to="/server">Server</Link>
      <Link to="/selector">Folder</Link>
      <Link disabled={enableOrder} to="/order">
        Order
      </Link>
      <Link disabled={false} to="/dictionary">
        Dictionary
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
  );
};

export default NavBar;
