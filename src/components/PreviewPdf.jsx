/* eslint-disable react/prop-types */
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import PDFDocument from "./PDFDocument";

const PreviewPdf = ({ selectedFileSource, url }) => {
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
