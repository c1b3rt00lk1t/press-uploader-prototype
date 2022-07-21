import React from "react";

import { AiOutlineFileAdd, AiOutlineDelete } from "react-icons/ai";

const DictionaryEdition = ({
  selected,
  pathOfSelected
}) => {

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
