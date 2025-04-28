import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

//pdfjs.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + '/pdf.worker.min.mjs';

// const PdfViewer = ({ filePath = "/251391026100.pdf" }) => {
const PdfViewer = ({ filePath =  "251391026100.pdf" }) => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const zoomIn = () => setScale(prev => prev + 0.2);
  const zoomOut = () => setScale(prev => Math.max(0.5, prev - 0.2));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(numPages, prev + 1));

  // Slightly zoom out on first load
  useEffect(() => {
    if (numPages !== null) {
      setScale(0.8); // Adjusted from 0.8 to 0.9 for better visibility
    }
  }, [numPages]);

  return (
    <div style={{ padding: 0, maxHeight: '740px' }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={zoomOut}>➖ Zoom Out</button>
        <button onClick={zoomIn} style={{ marginLeft: 10 }}>➕ Zoom In</button>
      </div>

      <Document
        file={filePath}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setCurrentPage(1);
        }}
        onLoadError={err => console.error("Failed to load PDF:", err.message)}
      >
        <Page
          pageNumber={currentPage}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      <div style={{ marginTop: 10 }}>
        <button onClick={goToPrevPage} disabled={currentPage <= 1}>⬅️ Previous</button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {numPages || '--'}
        </span>
        <button onClick={goToNextPage} disabled={currentPage >= numPages}>Next ➡️</button>
      </div>
    </div>
  );
};

export default PdfViewer;
