import React, { useContext, useState } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Tree from "../components/Tree";
import { ErrorBoundary } from "../components/ErrorBoundary";

const Dictionary = () => {
  const {
    handleUploadDictionary,
    handleGetDictionaryFromDB,
    handleDictionary,
    dictionary,
  } = useContext(PressUploaderContext);

  const [selectedZones, setSelectedZones] = useState([]);
  const [unfoldedZones, setUnfoldedZones] = useState([]);

  const [selectedSectors, setSelectedSectors] = useState([]);
  const [unfoldedSectors, setUnfoldedSectors] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [unfoldedTags, setUnfoldedTags] = useState([]);

  const handleSelect = (selected, setter) => (type) => {
    const index = selected.indexOf(type);
    if (index > -1) {
      setter(selected.filter((a) => a !== type && a !== ""));
    } else {
      setter(selected.concat(type));
    }
  };
  const handleSelectZones = handleSelect(selectedZones, setSelectedZones);
  const handleUnfoldedZones = handleSelect(unfoldedZones, setUnfoldedZones);
  const handleSelectSectors = handleSelect(selectedSectors, setSelectedSectors);
  const handleUnfoldedSectors = handleSelect(
    unfoldedSectors,
    setUnfoldedSectors
  );
  const handleSelectTags = handleSelect(selectedTags, setSelectedTags);
  const handleUnfoldedTags = handleSelect(
    unfoldedTags, setUnfoldedTags
  );

  return (
    <>
      <h1>Dictionary</h1>
      <div className="dictionary-container">
        <div className="dictionary-subcontainer">
          <ErrorBoundary>
            {!!dictionary && (
              <Tree
                inputs={{ zones: dictionary.zones }}
                path={["zones"]}
                handleSelectItems={handleSelectZones}
                selectedItems={selectedZones}
                handleUnfoldedZones={handleUnfoldedZones}
                unfoldedZones={unfoldedZones}
              />
            )}
          </ErrorBoundary>
          <ErrorBoundary>
            {!!dictionary && (
              <Tree
                inputs={{ sectors: dictionary.sectors }}
                path={["sectors"]}
                handleSelectItems={handleSelectSectors}
                selectedItems={selectedSectors}
                handleUnfoldedZones={handleUnfoldedSectors}
                unfoldedZones={unfoldedSectors}
              />
            )}
          </ErrorBoundary>
          <ErrorBoundary>
            {!!dictionary && (
              <Tree
                inputs={{ tags: dictionary.tags }}
                path={["tags"]}
                handleSelectItems={handleSelectTags}
                selectedItems={selectedTags}
                handleUnfoldedZones={handleUnfoldedTags}
                unfoldedZones={unfoldedTags}
              />
            )}
          </ErrorBoundary>
        </div>
        <div>
          <div className="dictionary-selection">{selectedZones.join(",")}</div>
          <div className="dictionary-selection">
            {selectedSectors.join(",")}
          </div>
          <div className="dictionary-selection">
            {selectedTags.join(",")}
          </div>
        </div>
      </div>
      <button onClick={handleGetDictionaryFromDB}>Get dictionary</button>
      <button onClick={handleDictionary("america", true, true)}>
        Set dictionary
      </button>
      <button onClick={handleUploadDictionary}>Send dictionary</button>
    </>
  );
};

export default Dictionary;
