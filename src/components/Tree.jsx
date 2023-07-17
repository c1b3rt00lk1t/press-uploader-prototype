import React from "react";
import { v4 as uuidv4 } from "uuid";
import TreeBlock from "./TreeBlock";

const Tree = ({
  inputs,
  currentIteration = 0,
  path,
  handleSelectItems,
  selectedItems,
  handleUnfoldedItems,
  unfoldedItems,
  maxDepth = 6,
}) => {
  return currentIteration === maxDepth ? null : (
    <div className="tree">
      {Object.keys(inputs)
        .sort()
        .map((input) => (
          <TreeBlock
            key={uuidv4()}
            path={path}
            inputs={inputs}
            input={input}
            handleSelectItems={handleSelectItems}
            selectedItems={selectedItems}
            handleUnfoldedItems={handleUnfoldedItems}
            unfoldedItems={unfoldedItems}
            currentIteration={currentIteration}
          />
        ))}
    </div>
  );
};

export default Tree;
