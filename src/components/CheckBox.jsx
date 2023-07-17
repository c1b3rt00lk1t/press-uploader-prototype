import React from "react";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineCheckSquare,
  AiOutlineBorder,
} from "react-icons/ai";

const CheckBox = ({
  path,
  input,
  handleSelectItems,
  selectedItems,
  handleUnfoldedItems,
  unfolded,
  unfoldable,
  searched,
}) => {
  const checked = selectedItems.indexOf(input) > -1;

  const avoid = input === "zones" || input === "sectors" || input === "tags";
  const checkItem = () => {
    if (!avoid) {
      handleSelectItems(path);
    }
  };

  const unfoldItem = () => {
    handleUnfoldedItems(path, path);
  };
  console.log('searched',searched);
  console.log('input', input)
  console.log('check', searched.includes(input))
  return (
    <div className="check-box" data-testid="unfoldCheck">
      {!unfolded && unfoldable && (
        <AiOutlinePlusSquare  onClick={unfoldItem} style={{ color: "grey" }} />
      )}
      {unfolded && unfoldable && (
        <AiOutlineMinusSquare onClick={unfoldItem} style={{ color: "grey" }} />
      )}
      {!checked && <AiOutlineBorder onClick={checkItem} />}
      {checked && (
        <AiOutlineCheckSquare onClick={checkItem} style={{ color: "blue"}} />
      )}


      <div style={{ color: checked ? "blue" 
                                   : searched.includes(input) ? "crimson"
                                   : "inherited" }}>{input}</div>

    </div>
  );
};

export default CheckBox;
