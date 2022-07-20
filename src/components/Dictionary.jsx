import React, { useContext, useState, useEffect } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Tree from "./Tree";
import { ErrorBoundary } from "./ErrorBoundary";
import DictionarySelection from "./DictionarySelection";
import DictionaryEdition from "./DictionaryEdition";


const Dictionary = ({
  embed,
  selectedFile,
  handleZonesChangeDictionary,
  handleSectorsChangeDictionary,
  handleTagsChangeDictionary,
  handleResetDictionary,
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

  const [pathOfSelected, setPathOfSelected] = useState([]);

  useEffect(() => {
    embed && setSelectedZones(selectedFile.zones);
  }, [selectedFile.zones, embed]);

  useEffect(() => {
    embed && setSelectedSectors(selectedFile.sectors);
  }, [selectedFile.sectors, embed]);

  useEffect(() => {
    embed && setSelectedTags(selectedFile.tags);
  }, [embed, selectedFile.tags]);

  const setAllSelectEmpty = () => {
    setSelectedZones([]);
    setSelectedSectors([]);
    setSelectedTags([]);
  };

  const setAllUnfoldedEmpty = () => {
    setUnfoldedZones([]);
    setUnfoldedSectors([]);
    setUnfoldedTags([]);
  }

  const handleSelect = (selected, setter, embed, handler) => (input, path) => {
    const type = input[input.length-1]
    const index = selected.indexOf(type);
    if (index > -1) {
      embed && setter(selected.filter((a) => a !== type && a !== ""));
      embed && handler && handler(selected.filter((a) => a !== type && a !== ""));

      !embed && !path && setAllSelectEmpty();
      !embed && path && setter(selected.filter((a) => a !== type && a !== ""));
    } else {
      embed && setter(selected.concat(type));
      embed && handler && handler(selected.concat(type));

      !embed && !path && setAllSelectEmpty();
      !embed && !path && setPathOfSelected(input);
      !embed && path && setAllUnfoldedEmpty();
      !embed && setter(path || [type]);
    }
  };



  const handleSelectZones = handleSelect(
    selectedZones,
    setSelectedZones,
    embed,
    handleZonesChangeDictionary
  );
  const handleUnfoldedZones = handleSelect(
    unfoldedZones,
    setUnfoldedZones,
    embed
  );
  const handleSelectSectors = handleSelect(
    selectedSectors,
    setSelectedSectors,
    embed,
    handleSectorsChangeDictionary
  );
  const handleUnfoldedSectors = handleSelect(
    unfoldedSectors,
    setUnfoldedSectors,
    embed
  );
  const handleSelectTags = handleSelect(
    selectedTags,
    setSelectedTags,
    embed,
    handleTagsChangeDictionary
  );
  const handleUnfoldedTags = handleSelect(unfoldedTags, setUnfoldedTags, embed);

  return (
    <>
      {/* <button onClick={handleGetDictionaryFromDB}>Get dictionary</button> */}
      {/* <button onClick={handleDictionary("america", true, true)}>
        Set dictionary
      </button>
      <button onClick={handleUploadDictionary}>Send dictionary</button> */}

      <div className={`dictionary-container-vertical`}>
        {embed && <button
          className="dictionary-reset"
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
        </button>}
        <div className="dictionary-container">
          <div className={`dictionary-subcontainer ${embed ? '' : 'dictionary-subcontainer-smaller'}`}>
            <ErrorBoundary>
              {!!dictionary && (
                <Tree
                  inputs={{ zones: dictionary.zones }}
                  path={[]}
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
                  path={[]}
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
                  path={[]}
                  handleSelectItems={handleSelectTags}
                  selectedItems={selectedTags}
                  handleUnfoldedZones={handleUnfoldedTags}
                  unfoldedZones={unfoldedTags}
                />
              )}
            </ErrorBoundary>
          </div>
        </div>
        {embed && <DictionarySelection selectedZones={selectedZones} selectedSectors={selectedSectors} selectedTags={selectedTags} />}
        {!embed && <DictionaryEdition selected={selectedZones[0] || selectedSectors[0] || selectedTags[0]} pathOfSelected={pathOfSelected}/>}
      </div>
    </>
  );
};

export default Dictionary;
