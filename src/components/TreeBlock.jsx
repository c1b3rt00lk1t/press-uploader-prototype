import React from "react";
import CheckBox from "./CheckBox";
import Tree from "./Tree";
import { v4 as uuidv4 } from "uuid";

const TreeBlock = ({
  path,
  inputs,
  input,
  handleSelectItems,
  selectedItems,
  handleUnfoldedItems,
  unfoldedItems,
  currentIteration,
}) => {


  const checkNextInput = (input) => {
    if (input === true || input === "B" || input === false) {
      return true;
    } else {
      return false;
    }
  };

  const next = !checkNextInput(inputs[input]);
  const unfolded = unfoldedItems.indexOf(input) > -1;

  return (
    <div key={uuidv4()} style={{ marginLeft: "2em" }}>
      <CheckBox
        handleSelectItems={handleSelectItems}
        path={path.concat(input)}
        input={input}
        selectedItems={selectedItems}
        handleUnfoldedItems={handleUnfoldedItems}
        unfolded={unfolded}
        unfoldable={next}
      />

      {!unfolded || !next
        ? null
        :  (
            <Tree
              inputs={inputs[input]}
              path={path.concat(input)}
              currentIteration={++currentIteration}
              handleSelectItems={handleSelectItems}
              selectedItems={selectedItems}
              handleUnfoldedItems={handleUnfoldedItems}
              unfoldedItems={unfoldedItems}
            />
          )}
    </div>
  );
};

export default TreeBlock;
