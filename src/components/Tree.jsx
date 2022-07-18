import React from "react";
import { v4 as uuidv4 } from "uuid";
import TreeBlock from "./TreeBlock";

const Tree = ({
  inputs,
  currentIteration = 0,
  path,
  handleSelectItems,
  selectedItems,
  handleUnfoldedZones,
  unfoldedZones,
  maxDepth = 5,
}) => {
  return currentIteration === maxDepth ? null : (
    <>
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
            handleUnfoldedZones={handleUnfoldedZones}
            unfoldedZones={unfoldedZones}
            currentIteration={currentIteration}
          />
        ))}
    </>
  );
};

export default Tree;
