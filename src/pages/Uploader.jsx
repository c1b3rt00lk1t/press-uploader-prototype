import React from 'react'
import { Link } from "react-router-dom";

const Uploader = ({files, urls, relativePath, handleUploadFiles, handleGetFileURL}) => {
  return (
    <div>
      Press Uploader
      <div id="uploader">
        <button onClick={handleUploadFiles}>Upload files</button>
        <button onClick={handleGetFileURL}> Get URLs</button>
        {!!files.length && !!urls.length && (
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(urls)
            )}`}
            download={`urls_${relativePath}_${new Date().getFullYear()}${(
              new Date().getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}${new Date().getDate()}_${new Date()
              .getHours()
              .toString()
              .padStart(2, "0")}${new Date().getMinutes()}.json`}
          >
            <button>{`Download JSON`}</button>
          </a>
        )}
      </div>
      <Link to="/">
        Selector
      </Link>
    </div>
  )
}

export default Uploader