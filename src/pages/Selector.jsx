import React from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Selector = ({
  clickSelector,
  handleSelectFolder,
  basicFolderChecks,
  prepareTaggedFiles,
  basicSelectorChecks,
  selectorSelectCard,
  selectorBasicChecksCard,
  selectorPrepareTaggerCard
}) => {
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
        <Card status={selectorBasicChecksCard.status} msg={[selectorBasicChecksCard.msg]}>
          <button onClick={basicFolderChecks} disabled={!selectorSelectCard.status}>Basic checks</button>
        </Card>
        <Card status={undefined} msg={[]}>
          <button onClick={() =>{}} disabled={true}>Edit order</button>
        </Card>
        <Card status={selectorPrepareTaggerCard.status} msg={[selectorPrepareTaggerCard.msg]}>
          <button onClick={prepareTaggedFiles} disabled={!basicSelectorChecks}>
            Prepare tagger
          </button>
        </Card>
        </CardDisplay>
    </div>
  );
};

export default Selector;
