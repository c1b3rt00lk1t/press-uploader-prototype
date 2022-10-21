import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import { useNavigate } from "react-router-dom";

const Selector = () => {
  const {
    clickSelector,
    handleSelectFolder,
    basicFolderChecks,
    prepareTaggedFiles,
    basicSelectorChecks,
    selectorSelectCard,
    selectorBasicChecksCard,
    selectorPrepareTaggerCard,
  } = useContext(PressUploaderContext);

  const navigate = useNavigate();
  const handleClickPrepareTagger = () => {
    prepareTaggedFiles();
    navigate("/tagger");
  };

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
        <Card
          status={selectorBasicChecksCard.status}
          msg={selectorBasicChecksCard.msg}
        >
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              selectorBasicChecksCard.msg.join("\n")
            )}`}
            download={"BasicChecks.txt"}
          >
            <button
              onClick={basicFolderChecks}
              disabled={!selectorSelectCard.status}
            >
              Basic checks
            </button>
          </a>
        </Card>
        <Card status={undefined} msg={[]}>
          <button onClick={() => {}} disabled={true}>
            Edit order
          </button>
        </Card>
        <Card
          status={selectorPrepareTaggerCard.status}
          msg={[selectorPrepareTaggerCard.msg]}
        >
          <button
            onClick={handleClickPrepareTagger}
            disabled={!basicSelectorChecks}
          >
            Prepare tagger
          </button>
        </Card>
      </CardDisplay>
    </div>
  );
};

export default Selector;
