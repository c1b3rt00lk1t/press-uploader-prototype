import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Merger = () => {

  const {
    handleMerge,
    handleBasicMergeChecks,
    handleUploadMerged,
    mergerBasicChecksCard,
    mergerMergeCard,
    mergerSendToServer
  } = useContext(PressUploaderContext);

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
