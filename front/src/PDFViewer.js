import React from "react";

const PDFViewer = ({ pdfUrl }) => {
  return (
    <iframe
      src={pdfUrl}
      width="600"
      height="400"
      title="PDF Viewer"
      style={{ border: "none" }}
    />
  );
};

export default PDFViewer;
