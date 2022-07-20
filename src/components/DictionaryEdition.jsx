import React from "react";

import { AiOutlineFileAdd, AiOutlineDelete } from "react-icons/ai";

const DictionaryEdition = ({
  selectedZones,
  selectedSectors,
  selectedTags,
  unfoldedZones,
  unfoldedSectors,
  unfoldedTags,
  pathOfSelected
}) => {

  const selected = selectedZones[0] || selectedSectors[0] || selectedTags[0];
  const node = '/'+ pathOfSelected.join('/');

  return (
    <div className="dictionary-selection dictionary-edit">
      <div className="dictionary-edit-row">
        <AiOutlineFileAdd
          onClick={() => {}}
          className="dictionary-edit-icons"
        />
        <input type="text" placeholder={node} className="dictionary-edit-input"/>
      </div>
      <div className="dictionary-edit-row">
        <AiOutlineDelete onClick={() => {}} className="dictionary-edit-icons" />
        <input type='text' placeholder={selected} className="dictionary-edit-input"/>
      </div>
    </div>
  );
};

export default DictionaryEdition;
