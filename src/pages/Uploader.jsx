import React from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Uploader = ({
  files,
  urls,
  relativePath,
  handleUploadFiles,
  handleGetFileURL,
  uploaderUpload,
  uploaderGetURLs
}) => {
  return (
    <div id="uploader">
      <CardDisplay>
        <Card status={uploaderUpload.status} msg={[uploaderUpload.msg]}>
          <button onClick={handleUploadFiles}>Upload files</button>
        </Card>
        <Card status={uploaderGetURLs.status} msg={[uploaderGetURLs.msg]}>
          <button onClick={handleGetFileURL}> Get URLs</button>
        </Card>

        {/* {!!files.length && !!urls.length && (
          <Card status={undefined} msg={[]}>
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(urls)
              )}`}
              download={`urls_${relativePath}_${new Date().getFullYear()}${(
                new Date().getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}${new Date().getDate()}_${new Date()
                .getHours()
                .toString()
                .padStart(2, "0")}${new Date().getMinutes()}.json`}
            >
              <button>{`Download JSON`}</button>
            </a></Card>
          )} */}
      </CardDisplay>
    </div>
  );
};

export default Uploader;
