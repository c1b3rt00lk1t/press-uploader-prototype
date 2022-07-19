import React, { useContext, useState, useEffect } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Tree from "./Tree";
import { ErrorBoundary } from "./ErrorBoundary";

const Dictionary = ({
  embed,
  selectedFile,
  handleZonesChangeDictionary,
  handleSectorsChangeDictionary,
  handleTagsChangeDictionary,
  handleResetDictionary
}) => {
  const {
    // handleUploadDictionary,
    // handleGetDictionaryFromDB,
    // handleDictionary,
    dictionary,
  } = useContext(PressUploaderContext);


  const [selectedZones, setSelectedZones] = useState([]);
  const [unfoldedZones, setUnfoldedZones] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState(
    embed ? selectedFile.sectors : []
  );
  const [unfoldedSectors, setUnfoldedSectors] = useState([]);
  const [selectedTags, setSelectedTags] = useState(
    embed ? selectedFile.tags : []
  );
  const [unfoldedTags, setUnfoldedTags] = useState([]);

  useEffect(() => {
    setSelectedZones(selectedFile.zones);
  }, [selectedFile.zones]);

  useEffect(() => {
    setSelectedSectors(selectedFile.sectors);
  }, [selectedFile.sectors]);

  useEffect(() => {
    setSelectedTags(selectedFile.tags);
  }, [selectedFile.tags]);

  const handleSelect = (selected, setter, embed, handler) => (type) => {
    const index = selected.indexOf(type);
    if (index > -1) {
      setter(selected.filter((a) => a !== type && a !== ""));
      embed && handler(selected.filter((a) => a !== type && a !== ""));
    } else {
      setter(selected.concat(type));
      embed && handler(selected.concat(type));
    }
  };
  const handleSelectZones = handleSelect(
    selectedZones,
    setSelectedZones,
    embed,
    handleZonesChangeDictionary
  );
  const handleUnfoldedZones = handleSelect(unfoldedZones, setUnfoldedZones);
  const handleSelectSectors = handleSelect(
    selectedSectors,
    setSelectedSectors,
    embed,
    handleSectorsChangeDictionary
  );
  const handleUnfoldedSectors = handleSelect(
    unfoldedSectors,
    setUnfoldedSectors
  );
  const handleSelectTags = handleSelect(
    selectedTags,
    setSelectedTags,
    embed,
    handleTagsChangeDictionary
  );
  const handleUnfoldedTags = handleSelect(unfoldedTags, setUnfoldedTags);

  return (
    <>
      {/* <button onClick={handleGetDictionaryFromDB}>Get dictionary</button> */}
      {/* <button onClick={handleDictionary("america", true, true)}>
        Set dictionary
      </button>
      <button onClick={handleUploadDictionary}>Send dictionary</button> */}
      
      <div className="dictionary-container-vertical">
      <button className="dictionary-reset"
        onClick={() => {
           setSelectedZones([]);
          // setUnfoldedZones([]);
          setSelectedSectors([]);
          // setUnfoldedSectors([]);
          setSelectedTags([]);
          // setUnfoldedTags([]);
          handleResetDictionary();
        }}
      >
        {" "}
        Reset
      </button>
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
        </div>
        <div className="dictionary-selection">
              <div >
                <b>zones: </b>
                {selectedZones.join(", ")}
              </div>
              <div >
                <b>sectors: </b>
                {selectedSectors.join(", ")}
              </div>
              <div >
                <b>tags: </b>
                {selectedTags.join(", ")}
              </div>
            </div>
      </div>
    </>
  );
};

export default Dictionary;
