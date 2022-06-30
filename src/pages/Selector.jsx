import React from 'react'
import Card from '../shared/Card'
import CardDisplay from '../shared/CardDisplay'


const Selector = ({clickSelector, handleSelectFolder, basicFolderChecks, prepareTaggedFiles, basicSelectorChecks,selectorSelectCard}) => {
  
  return (
      <div id="selector">
        <CardDisplay>
        <Card status={selectorSelectCard.status} msg={selectorSelectCard.msg}>
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
        </Card>
        <Card status={undefined} msg={[]}>
        <button onClick={basicFolderChecks}>Basic checks</button>
        </Card>
        <Card status={undefined} msg={[]}>
        <button onClick={prepareTaggedFiles} disabled={!basicSelectorChecks}>Prepare tagger</button>
        </Card>

        </CardDisplay>
      </div>

  )
}

export default Selector