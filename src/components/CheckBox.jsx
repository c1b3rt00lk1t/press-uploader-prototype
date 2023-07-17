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

  return (
    <div className="check-box" data-testid="unfoldCheck">
      {!unfolded && unfoldable && (
        <AiOutlinePlusSquare onClick={unfoldItem} style={{ color: "grey" }} />
      )}
      {unfolded && unfoldable && (
        <AiOutlineMinusSquare onClick={unfoldItem} style={{ color: "grey" }} />
      )}
      {!checked && (
        <AiOutlineBorder
          onClick={checkItem}
          style={{
            color:
              searched.length === 1 && searched.includes(input)
                ? "green"
                : searched.includes(input)
                ? "crimson"
                : "inherited",
          }}
        />
      )}
      {checked && (
        <AiOutlineCheckSquare onClick={checkItem} style={{ color: "blue" }} />
      )}

      <div
        className={searched.includes(input) ? "dictionary-searched" : ""}
        style={{
          color: checked
            ? "blue"
            : searched.length === 1 && searched.includes(input)
            ? "green"
            : searched.includes(input)
            ? "crimson"
            : "inherited",          
        }}
      >
        {input}
      </div>
    </div>
  );
};

export default CheckBox;
