import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Uploader = () => {
  const {
    handleUploadFiles,
    handleGetFileURL,
    uploaderUpload,
    uploaderGetURLs,
    handleUploadFilesToBackUp,
    handleGetFileURLFromBackUp,
    uploaderUploadToBackUp,
    uploaderGetURLsFromBackUp
  } = useContext(PressUploaderContext);

  return (
    <div id="uploader">
      <CardDisplay>
        <Card status={uploaderUpload.status} msg={[uploaderUpload.msg]}>
          <button onClick={handleUploadFiles}>Upload files</button>
        </Card>
        <Card status={uploaderGetURLs.status} msg={[uploaderGetURLs.msg]}>
          <button onClick={handleGetFileURL}> Get URLs</button>
        </Card>

        <Card status={uploaderUploadToBackUp.status} msg={[uploaderUploadToBackUp.msg]}>
          <button onClick={handleUploadFilesToBackUp}>Upload files (backup)</button>
        </Card>
        <Card status={uploaderGetURLsFromBackUp.status} msg={[uploaderGetURLsFromBackUp.msg]}>
          <button onClick={handleGetFileURLFromBackUp}> Get URLs (backup)</button>
        </Card>


      </CardDisplay>
    </div>
  );
};

export default Uploader;
