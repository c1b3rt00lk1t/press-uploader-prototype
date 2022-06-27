import React from 'react'
import { Link } from "react-router-dom";

const Selector = ({clickSelector, handleSelectFolder}) => {
  return (
    <div>
      Press Selector
      <div id="selector">
        <button onClick={clickSelector} id="display-selector">
          Select folder
        </button>
        <span id="selection-result" className="contador"></span>
        <input
          onChange={handleSelectFolder}
          type="file"
          id="file-selector"
          name="fileList"
          style={{ display: "none" }}
          webkitdirectory="true"
        />
        <button disabled>Basic checks</button>
        {/* checks if there is an order file (an only one), if the folder already exists in target, if there is internet connection, if there are rare characters */}
      </div>
      <Link to="/uploader">
        Uploader
      </Link>
    </div>
  )
}

export default Selector