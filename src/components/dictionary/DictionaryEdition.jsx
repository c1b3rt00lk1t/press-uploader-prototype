/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import PressUploaderContext from "../../contexts/PressUploaderContext";

import { AiOutlineFileAdd, AiOutlineDelete } from "react-icons/ai";

const DictionaryEdition = ({ selected, pathOfSelected }) => {
  const {
    // handleUploadDictionary,
    // handleGetDictionaryFromDB,
    // handleDictionary,
    handleAddToDictionary,
  } = useContext(PressUploaderContext);

  const [newItem, setNewItem] = useState("");

  const node = "/" + pathOfSelected.join("/");

  return (
    <div className="dictionary-selection dictionary-edit">
      <div className="dictionary-edit-row">
        <AiOutlineFileAdd
          onClick={() => {
            const obj = {};
            obj[newItem] = true;
            handleAddToDictionary(obj, node);
          }}
          className="dictionary-edit-icons"
        />
        <input
          onChange={(ev) => setNewItem(ev.target.value)}
          type="text"
          placeholder={node}
          className="dictionary-edit-input"
        />
      </div>
      <div className="dictionary-edit-row" style={{ display: "none" }}>
        <AiOutlineDelete onClick={() => {}} className="dictionary-edit-icons" />
        <input
          type="text"
          placeholder={selected}
          className="dictionary-edit-input"
        />
      </div>
    </div>
  );
};

export default DictionaryEdition;
