/* eslint-disable react/prop-types */
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import PDFDocument from "./PDFDocument";

const PreviewPdf = ({ selectedFileTitle, selectedFileSource, files, url }) => {
  // const url = files.filter((file) => file.name.includes(selectedFileTitle))[0];
  const label = selectedFileSource !== "label" ? true : false;
  return (
    <div className="previewPdf">
      {label && (
        <ErrorBoundary>
          <PDFDocument url={url} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default PreviewPdf;
