/* eslint-disable react/prop-types */
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
  searchString,
  setLastSelectedItem,
}) => {
  const checked = selectedItems.indexOf(input) > -1;

  const avoid = input === "zones" || input === "sectors" || input === "tags";
  const checkItem = () => {
    if (!avoid) {
      // The "path" is an array of string with each step of the path, including the chosen item
      handleSelectItems(path);
      setLastSelectedItem(path);
    }
  };

  const unfoldItem = () => {
    handleUnfoldedItems(path, path);
  };

  return (
    <div
      className="check-box"
      data-testid="unfoldCheck"
      style={{
        backgroundColor:
          searched.length === 1 && searched.includes(input)
            ? "rgba(60, 114, 60, 0.1)"
            : searchString === input
            ? "rgba(255, 183, 0, 0.1)"
            : "inherited",
      }}
    >
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
        className={
          checked
            ? "dictionary-checked"
            : searchString === input
            ? "dictionary-searched dictionary-matches"
            : searched.includes(input)
            ? "dictionary-searched"
            : "dictionary-name"
        }
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
