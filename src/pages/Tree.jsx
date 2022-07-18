import React from "react";

const Tree = ({ inputs, currentIteration = 0, maxDepth = 5 }) => {

const checkNextInput = (input) => {
    if (input === true || input === "B" ||input === false){
        return true;
    } else {
        return false;
    }
}

  return currentIteration === maxDepth ? null : (
    <>
      {Object.keys(inputs).sort().map((input) => (
        <div key={input} style={{ marginLeft: "2vw" }}>
            {input} {currentIteration}
           {checkNextInput(inputs[input]) ? null : <Tree inputs={inputs[input]} currentIteration={++currentIteration} />}
        </div>
      ))}
    </>
  );
};

export default Tree;
