import React from "react";
import PDFDocument from "./PDFDocument";

const PreviewPdf = ({ selectedFileTitle, selectedFileSource, files }) => {
  const url = files.filter((file) => file.name.includes(selectedFileTitle))[0]
  const label = selectedFileSource !== 'label' ? true : false;
  return (
    <div className="previewPdf">
       {label && <PDFDocument url={url}/>}
        


    </div>
  );
};

export default PreviewPdf;
