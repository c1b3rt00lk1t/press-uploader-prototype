import React, { useContext, useState } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Tree from "../components/Tree";

const Dictionary = () => {
  const {
    handleUploadDictionary,
    handleGetDictionaryFromDB,
    handleDictionary,
    dictionary,
  } = useContext(PressUploaderContext);

  const [selectedZones, setSelectedZones] = useState([]);
  const [unfoldedZones, setUnfoldedZones] = useState([]);



  const handleSelect =  (setter, selected) => (type) => {
    const index = selected.indexOf(type);
    if (index > -1) {
      setter(selected.filter((a) => a !== type && a !== ""));
    } else {
      setter(selected.concat(type));
    }
  }
  const handleSelectZones = handleSelect(setSelectedZones, selectedZones);
  const handleUnfoldedZones = handleSelect(setUnfoldedZones, unfoldedZones);


  return (
    <>
      <h1>Dictionary</h1>
      <div className="dictionary-container">
        <div>
          {!!dictionary && (
            <Tree
              inputs={{zones: dictionary.zones}}
              path={["zones"]}
              handleSelectItems={handleSelectZones}
              selectedItems={selectedZones}
              handleUnfoldedZones={handleUnfoldedZones}
              unfoldedZones={unfoldedZones}
            />
          )}
        </div>
        <div className="dictionary-selection">{selectedZones.join(",")}</div>
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
