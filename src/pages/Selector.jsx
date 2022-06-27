import React from 'react'


const Selector = ({clickSelector, handleSelectFolder, basicFolderChecks, prepareTaggedFiles}) => {
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
        <button onClick={basicFolderChecks}>Basic checks</button>
        {/* checks if there is an order file (an only one), if the folder already exists in target, if there is internet connection, if there are rare characters */}
        <button onClick={prepareTaggedFiles}>Prepare tagger</button>
      </div>

    </div>
  )
}

export default Selector