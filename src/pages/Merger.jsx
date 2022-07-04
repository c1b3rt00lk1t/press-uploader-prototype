import React from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Merger = ({
  handleMerge,
  handleDownloadMerged,
  handleBasicMergeChecks,
  handleUploadMerged,
  mergerBasicChecksCard,
  mergerMergeCard,
  mergerSendToServer
}) => {
  return (
    <div>
      <CardDisplay>
        <Card status={mergerBasicChecksCard.status} msg={mergerBasicChecksCard.msg}>
          <button onClick={handleBasicMergeChecks}>Basic checks</button>
        </Card>
        <Card status={mergerMergeCard.status} msg={[mergerMergeCard.msg]}>
          <button onClick={handleMerge}>Merge</button>
        </Card>
        {/* <Card status={undefined} msg={[]}>
          <button onClick={handleDownloadMerged}>Download</button>
        </Card> */}
        <Card status={mergerSendToServer.status} msg={[mergerSendToServer.msg]}>
        <button onClick={handleUploadMerged}>Send to server</button>
        </Card>
      </CardDisplay>
    </div>
  );
};

export default Merger;
