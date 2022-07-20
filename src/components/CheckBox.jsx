import React from "react";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  //   AiOutlinePlus,
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
  unfoldable,
}) => {
  const checked = selectedItems.indexOf(input) > -1;

  const avoid = input === "zones" || input === "sectors" || input === "tags";
  const checkItem = () => {
    if (!avoid) {
      handleSelectItems(input);
    }
  };

  const unfoldItem = () => {
    handleUnfoldedZones(input, path);
  };

  return (
    <div className="check-box">
      {!unfolded && unfoldable && (
        <AiOutlinePlusSquare onClick={unfoldItem} style={{ color: "grey" }} />
      )}
      {unfolded && unfoldable && (
        <AiOutlineMinusSquare onClick={unfoldItem} style={{ color: "grey" }} />
      )}
      {!checked && <AiOutlineBorder onClick={checkItem} />}
      {checked && (
        <AiOutlineCheckSquare onClick={checkItem} style={{ color: "blue"}} />
      )}

      <div style={{ color: checked ? "blue" : "inherited" }}>{input}</div>

    </div>
  );
};

export default CheckBox;
