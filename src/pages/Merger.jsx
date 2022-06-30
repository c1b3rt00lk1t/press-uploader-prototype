import React from "react";

const Merger = ({ handleMerge, handleDownloadMerged }) => {
  return (
    <div>
      Merger
      <div>
        <button onClick={handleMerge}>Merge</button>
        <button onClick={handleDownloadMerged}>Download</button>
      </div>
    </div>
  );
};

export default Merger;
