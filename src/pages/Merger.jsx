import React from "react";

const Merger = ({ handleMerge, handleDownloadMerged,handleBasicMergeChecks }) => {
  return (
    <div>
      Merger
      <div>
      <button onClick={handleBasicMergeChecks}>Basic checks</button>
        <button onClick={handleMerge}>Merge</button>
        <button onClick={handleDownloadMerged}>Download</button>
      </div>
    </div>
  );
};

export default Merger;
