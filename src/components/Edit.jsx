/* eslint-disable react/prop-types */
import React from "react";

import { FiTrash2, 
    // FiEdit2 
} from "react-icons/fi";

const Edit = ({handleDelete, editId}) => {
  const editStyle = {
    fontSize: "12px",
    border: "solid",
    borderRadius: "5px",
    borderWidth: "1px",
    marginRight: "5px",
    paddingLeft: "3px",
    paddingRight: "3px",
    textAlign: "center",
    lineHeight: "20px",
    height: "20px",
  };

  return (
    <span style={editStyle}>
      {/* <FiEdit2 />  */}
      <FiTrash2 onClick={() => handleDelete(editId) }/>
    </span>
  );
};

export default Edit;
