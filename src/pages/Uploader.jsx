import React from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Uploader = ({
  files,
  urls,
  relativePath,
  handleUploadFiles,
  handleGetFileURL,
}) => {
  return (
    <div id="uploader">
      <CardDisplay>
        <Card status={undefined} msg={[]}>
          <button onClick={handleUploadFiles}>Upload files</button>
        </Card>
        <Card status={undefined} msg={[]}>
          <button onClick={handleGetFileURL}> Get URLs</button>
          {!!files.length && !!urls.length && (
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
            </a>
          )}
        </Card>
      </CardDisplay>
    </div>
  );
};

export default Uploader;
