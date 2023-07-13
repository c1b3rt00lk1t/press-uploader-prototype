import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PressUploaderContext from "../contexts/PressUploaderContext";

const NavBar = () => {
  const {
    authenticated,readyToTagger, basicSelectorChecks, readyToOrder, origin
  } = useContext(PressUploaderContext);
  const enableOrder = !readyToOrder;
  const enableTagger = !readyToTagger;
  const enableUploader = !basicSelectorChecks;
  // const enableMerger = enableTagger && enableUploader;
  const enableMerger = false;

  return (
    <div className="navbar">
      <Link to="/start">Start</Link>
      <Link disabled={!authenticated || origin !== "server"} to="/server">Server</Link>
      <Link disabled={origin !== "folder"} to="/selector">Folder</Link>
      <Link disabled={enableOrder} to="/order">
        Order
      </Link>
      <Link disabled={!authenticated} to="/dictionary">
        Dictionary
      </Link>
      <Link disabled={enableTagger} to="/tagger">
        Tagger
      </Link>
      <Link disabled={!authenticated && enableUploader} to="/uploader">
        Uploader
      </Link>
      <Link disabled={!authenticated && enableMerger} to="/merger">
        Merger
      </Link>
      <Link disabled={!authenticated} to="/checkout">
        Checkout
      </Link>
      <Link disabled={true} to="/">
        Settings
      </Link>
      <Link to="/">
        Log in
      </Link>
    </div>
  );
};

export default NavBar;
