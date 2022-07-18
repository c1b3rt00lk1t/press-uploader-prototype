import React from "react";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlinePlus,
  AiOutlineCheckSquare,
  AiOutlineBorder,
} from "react-icons/ai";

const CheckBox = ({
  path,
  input,
  handleSelectItems,
  selectedItems,
  handleUnfoldedZones,
  unfolded,
  unfoldable
}) => {
  const checked = selectedItems.indexOf(input) > -1;

  const checkItem = () => {
    handleSelectItems(input);
  };

  const unfoldItem = () => {
    handleUnfoldedZones(input);
  }

  return (
    <div className="check-box">
      {!unfolded && unfoldable && <AiOutlinePlusSquare onClick={unfoldItem} style={{color:'grey'}}/>}
      {unfolded && unfoldable && <AiOutlineMinusSquare onClick={unfoldItem} style={{color:'grey'}}/>}
      {!checked && <AiOutlineBorder onClick={checkItem} />}
      {checked && <AiOutlineCheckSquare onClick={checkItem} style={{color:'blue'}}/>}
    
      <div style={{ color: checked ? 'blue': 'inherited'}}>{input}</div>
      <AiOutlinePlus className="add-tag"/>
    </div>
  );
};

export default CheckBox;