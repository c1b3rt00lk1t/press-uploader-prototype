import React from "react";

const SelectableMessageBox = ({ msg, handleSelection }) => {
  
  return (
    <ul className="message-box selectable">
      {msg.map((item, i) => (
        <li
          key={i}
          onClick={(ev) => {
            handleSelection(ev);
            ev.target.parentNode.childNodes.forEach(a => a.style.color = "inherit");
            ev.target.style.color = "blue";
          }}
          className="message-item"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SelectableMessageBox;
