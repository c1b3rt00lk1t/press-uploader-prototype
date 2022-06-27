import React from 'react'

const Uploader = ({files, urls, relativePath, clickSelector, handleSelectFolder, handleUploadFiles, handleGetFileURL}) => {
  return (
    <div>
      Press Uploader
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
    </div>
  )
}

export default Uploader